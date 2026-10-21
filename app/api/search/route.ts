import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimitWithInfo,
  generateGeminiSummary,
  fetchWikipediaImage,
  fetchSmartImage,
  generateLocalFallback,
  findLocalMatch,
  resolveContextualImage,
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
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const rateLimit = checkRateLimitWithInfo(`search_${ip}`, 30, 60_000);

    const rateLimitHeaders = {
      "X-RateLimit-Limit": String(rateLimit.limit),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(rateLimit.resetSeconds),
    };

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Terlalu banyak permintaan pencarian. Silakan coba sebentar lagi.",
          retryAfter: rateLimit.resetSeconds,
        },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            "Retry-After": String(rateLimit.resetSeconds),
          },
        }
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

    // ── Fetch real image from References first, then other sources ───────────
    if (result.status !== "no_result") {
      const wikiTitleId =
        result._wikiTitleId || result.card1.title || query;
      const wikiTitleEn = result._wikiTitleEn;
      const imageSearchQuery = result._imageSearchQuery || result.card1.title;

      let smartImg: string | null = null;
      // Ambil foto dari web/Wikipedia jika belum ada foto spesifik lokal
      if (!result.card1.image || result.card1.image === "/images/ampera_hero.jpg") {
        smartImg = await fetchSmartImage(
          result.card2?.sources || [],
          wikiTitleId,
          wikiTitleEn,
          imageSearchQuery,
          query
        );
      }

      // Pastikan SELALU ada foto yang sesuai konteks pertanyaan (tidak pernah kosong)
      const finalImage = resolveContextualImage(
        query,
        result.card1?.title,
        result.card3?.themeSlug,
        smartImg || result.card1?.image
      );
      result.card1 = { ...result.card1, image: finalImage };
    }

    // Remove internal helper fields before sending to client
    const { _wikiTitleId, _wikiTitleEn, _imageSearchQuery, ...cleanResult } = result;

    return NextResponse.json(cleanResult, { headers: rateLimitHeaders });
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
