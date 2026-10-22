/**
 * app/api/favorite/route.ts
 * GET  /api/favorite        — ambil daftar favorit user yang sedang login
 * POST /api/favorite        — tambah favorit
 * DELETE /api/favorite      — hapus favorit (body: { itemType, itemRef })
 */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { favorite } from "../../../lib/schema";
import { eq, and, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { checkRateLimitWithInfo } from "@/lib/gemini";

function dbNotReady() {
  return NextResponse.json(
    { error: "Database belum dikonfigurasi. Isi DATABASE_URL di .env.local" },
    { status: 503 }
  );
}

function checkFavRateLimit(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";
  return checkRateLimitWithInfo(`fav_${ip}`, 60, 60_000);
}

async function getUser(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function GET(req: NextRequest) {
  if (!db) return dbNotReady();
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await db
    .select()
    .from(favorite)
    .where(eq(favorite.userId, user.id))
    .orderBy(desc(favorite.createdAt));

  // Deduplikasi agar jika ada duplikat di database, hanya 1 yang dikembalikan ke client
  const uniqueItems: typeof items = [];
  const seenKeys = new Set<string>();

  for (const f of items) {
    const typeKey = f.itemType || "";
    const refKey = (f.itemRef || "").trim().toLowerCase();
    const titleKey = (f.title || "").trim().toLowerCase();
    const imgKey = (f.imageUrl || "").trim();

    const uniqueId =
      typeKey === "image"
        ? `${typeKey}::${refKey || titleKey || f.id}`
        : `${typeKey}::${refKey || f.id}`;

    if (!seenKeys.has(uniqueId)) {
      seenKeys.add(uniqueId);
      uniqueItems.push(f);
    }
  }

  const mapped = uniqueItems.map((f) => ({
    id: f.id,
    userId: f.userId,
    user_id: f.userId,
    itemType: f.itemType,
    item_type: f.itemType,
    itemRef: f.itemRef,
    item_ref: f.itemRef,
    title: f.title,
    imageUrl: f.imageUrl,
    image_url: f.imageUrl,
    creator: f.creator,
    sourceUrl: f.sourceUrl,
    source_url: f.sourceUrl,
    license: f.license,
    createdAt: f.createdAt ? f.createdAt.toISOString() : new Date().toISOString(),
    created_at: f.createdAt ? f.createdAt.toISOString() : new Date().toISOString(),
  }));

  return NextResponse.json({ favorites: mapped });
}

export async function POST(req: NextRequest) {
  const rl = checkFavRateLimit(req);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Terlalu banyak aktivitas. Silakan coba sebentar lagi." },
      { status: 429, headers: { "Retry-After": String(rl.resetSeconds) } }
    );
  }

  if (!db) return dbNotReady();
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const itemType = body.itemType || body.item_type;
  const itemRef = body.itemRef || body.item_ref;
  const title = body.title;
  const imageUrl = body.imageUrl || body.image_url;
  const creator = body.creator;
  const sourceUrl = body.sourceUrl || body.source_url;
  const license = body.license;

  if (!itemType || !itemRef) {
    return NextResponse.json({ error: "itemType dan itemRef wajib diisi" }, { status: 400 });
  }

  // Cek apakah item sudah ada di database untuk user ini (mencegah duplikat ganda)
  try {
    const existingItems = await db
      .select()
      .from(favorite)
      .where(
        and(
          eq(favorite.userId, user.id),
          eq(favorite.itemType, itemType)
        )
      );

    const normNewRef = itemRef.trim().toLowerCase();
    const normNewTitle = (title || "").trim().toLowerCase();
    const normNewImg = (imageUrl || "").trim();

    const isDuplicate = existingItems.some((f) => {
      const fRef = (f.itemRef || "").trim().toLowerCase();
      const fTitle = (f.title || "").trim().toLowerCase();
      const fImg = (f.imageUrl || "").trim();

      // Cocok berdasarkan itemRef
      if (fRef && normNewRef && fRef === normNewRef) return true;

      // Untuk tipe image / pencarian, cek jika topik penjelasan atau judul sama
      if (itemType === "image") {
        if (fTitle && normNewTitle && fTitle === normNewTitle) return true;
        if (fRef && normNewTitle && fRef === normNewTitle) return true;
        if (fTitle && normNewRef && fTitle === normNewRef) return true;
      }
      return false;
    });

    if (isDuplicate) {
      return NextResponse.json({ success: true, message: "Already favorited" });
    }

    await db.insert(favorite).values({
      userId: user.id,
      itemType,
      itemRef,
      title: title ?? null,
      imageUrl: imageUrl ?? null,
      creator: creator ?? null,
      sourceUrl: sourceUrl ?? null,
      license: license ?? null,
    });
  } catch (err) {
    console.warn("Favorite POST error:", err);
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const rl = checkFavRateLimit(req);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Terlalu banyak aktivitas. Silakan coba sebentar lagi." },
      { status: 429, headers: { "Retry-After": String(rl.resetSeconds) } }
    );
  }

  if (!db) return dbNotReady();
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const itemType = body.itemType || body.item_type;
  const itemRef = body.itemRef || body.item_ref;
  const title = body.title;
  const imageUrl = body.imageUrl || body.image_url;

  if (!itemType || (!itemRef && !title && !imageUrl)) {
    return NextResponse.json({ error: "itemType dan identifier wajib diisi" }, { status: 400 });
  }

  try {
    const existing = await db
      .select()
      .from(favorite)
      .where(
        and(
          eq(favorite.userId, user.id),
          eq(favorite.itemType, itemType)
        )
      );

    const normTargetRef = (itemRef || "").trim().toLowerCase();
    const normTargetTitle = (title || "").trim().toLowerCase();
    const normTargetImg = (imageUrl || "").trim();

    const idsToDelete = existing
      .filter((f) => {
        const fRef = (f.itemRef || "").trim().toLowerCase();
        const fTitle = (f.title || "").trim().toLowerCase();
        const fImg = (f.imageUrl || "").trim();

        if (normTargetRef && fRef === normTargetRef) return true;
        if (normTargetTitle && fTitle === normTargetTitle) return true;
        if (normTargetRef && fTitle === normTargetRef) return true;
        if (normTargetTitle && fRef === normTargetTitle) return true;
        return false;
      })
      .map((f) => f.id);

    for (const id of idsToDelete) {
      await db.delete(favorite).where(eq(favorite.id, id));
    }
  } catch (err) {
    console.warn("Favorite DELETE error:", err);
  }

  return NextResponse.json({ success: true });
}

