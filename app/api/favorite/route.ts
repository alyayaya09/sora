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

function dbNotReady() {
  return NextResponse.json(
    { error: "Database belum dikonfigurasi. Isi DATABASE_URL di .env.local" },
    { status: 503 }
  );
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

  const mapped = items.map((f) => ({
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

  // Upsert — jika sudah ada abaikan
  try {
    await db.insert(favorite).values({
      userId: user.id,
      itemType,
      itemRef,
      title: title ?? null,
      imageUrl: imageUrl ?? null,
      creator: creator ?? null,
      sourceUrl: sourceUrl ?? null,
      license: license ?? null,
    }).onConflictDoNothing();
  } catch {
    // Unique violation — already favorited, ignore
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!db) return dbNotReady();
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const itemType = body.itemType || body.item_type;
  const itemRef = body.itemRef || body.item_ref;

  if (!itemType || !itemRef) {
    return NextResponse.json({ error: "itemType dan itemRef wajib diisi" }, { status: 400 });
  }

  await db
    .delete(favorite)
    .where(
      and(
        eq(favorite.userId, user.id),
        eq(favorite.itemType, itemType),
        eq(favorite.itemRef, itemRef)
      )
    );

  return NextResponse.json({ success: true });
}

