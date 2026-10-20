import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  generateGeminiSummary,
  fetchWikipediaImage,
  generateLocalFallback,
  findLocalMatch,
  SearchResult,
  geminiDebugLogs,
} from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const allowed = checkRateLimit(ip, 30, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba sebentar lagi." },
        { status: 429 }
      );
    }

    const localMatch = findLocalMatch(query);

    // ── Attempt 1: Gemini summary ─────────────────────────────────────────────
    let geminiResult = (await generateGeminiSummary(query, localMatch)) as
      | (SearchResult & {
          _wikiTitleId?: string;
          _wikiTitleEn?: string;
          _imageSearchQuery?: string;
        })
      | null;

    // ── Attempt 2: Retry once after short delay if overloaded ─────────────────
    if (!geminiResult) {
      await new Promise((r) => setTimeout(r, 1500));
      geminiResult = (await generateGeminiSummary(query, localMatch)) as
        | (SearchResult & {
            _wikiTitleId?: string;
            _wikiTitleEn?: string;
            _imageSearchQuery?: string;
          })
        | null;
    }

    // ── Fallback: local content only ─────────────────────────────────────────
    const result: SearchResult & {
      _wikiTitleId?: string;
      _wikiTitleEn?: string;
      _imageSearchQuery?: string;
    } = geminiResult || generateLocalFallback(query);

    // ── Fetch real image from Wikipedia / Wikimedia ───────────────────────────
    if (result.status !== "no_result") {
      const wikiTitleId =
        result._wikiTitleId || result.card1.title || query;
      const wikiTitleEn = result._wikiTitleEn;
      const imageSearchQuery = result._imageSearchQuery || result.card1.title;

      // Always try to get a real web image from Wikipedia / Wikimedia Commons
      const alreadyHasExternalImage =
        result.card1.image &&
        result.card1.image.startsWith("http") &&
        !result.card1.image.startsWith("/images/");

      if (!alreadyHasExternalImage) {
        const wikiImg = await fetchWikipediaImage(wikiTitleId, wikiTitleEn, imageSearchQuery);
        if (wikiImg) {
          result.card1 = { ...result.card1, image: wikiImg };
        }
      }
    }

    // Remove internal helper fields before sending to client
    const { _wikiTitleId, _wikiTitleEn, _imageSearchQuery, ...cleanResult } = result;

    return NextResponse.json(cleanResult);
  } catch (error: any) {
    console.error("Search API route error:", error);
    return NextResponse.json(
      {
        error: "Terjadi kesalahan internal pada server",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
