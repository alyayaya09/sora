import { NextRequest, NextResponse } from "next/server";
import { checkRateLimitWithInfo } from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    const rateLimit = checkRateLimitWithInfo(`tts_${ip}`, 15, 60_000); // 15 requests per minute

    const rateLimitHeaders = {
      "X-RateLimit-Limit": String(rateLimit.limit),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(rateLimit.resetSeconds),
    };

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          available: false,
          error: "Terlalu banyak permintaan suara. Silakan coba sebentar lagi.",
          message: "audio belum tersedia",
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

    const body = await request.json().catch(() => ({}));
    const text = body?.text?.trim() || "";

    if (!text) {
      return NextResponse.json(
        { available: false, error: "Teks tidak boleh kosong" },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful return per PRD F3 & F14
      return NextResponse.json({
        available: false,
        message: "audio belum tersedia",
        reason: "GEMINI_API_KEY belum dikonfigurasi di environment server",
      });
    }

    // Call Gemini with audio response modality (with timeout safeguard)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Bacakan narasi budaya berikut dengan artikulasi bahasa Indonesia yang jelas dan berwibawa:\n\n${text.slice(0, 350)}`,
                  },
                ],
              },
            ],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Aoede",
                  },
                },
              },
            },
          }),
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0];
        const audioPart = candidate?.content?.parts?.find(
          (part: any) => part.inlineData && part.inlineData.mimeType?.startsWith("audio/")
        );

        if (audioPart) {
          return NextResponse.json({
            available: true,
            mimeType: audioPart.inlineData.mimeType,
            audioBase64: audioPart.inlineData.data,
          });
        }
      }
    } catch (apiError) {
      console.warn("Gemini TTS fetch encountered error:", apiError);
    }

    // Per PRD: Tampilkan pesan "audio belum tersedia" jika gagal
    return NextResponse.json({
      available: false,
      message: "audio belum tersedia",
    });
  } catch (error: any) {
    console.error("TTS API error:", error);
    return NextResponse.json({
      available: false,
      message: "audio belum tersedia",
    });
  }
}
