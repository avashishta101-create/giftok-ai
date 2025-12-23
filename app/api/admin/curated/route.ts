import { NextResponse } from "next/server";
import { db, curatedGifs } from "@/app/db";
import { eq } from "drizzle-orm";

export async function GET() {
  const gifs = await db.select().from(curatedGifs);
  return NextResponse.json({ gifs });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await db.delete(curatedGifs).where(eq(curatedGifs.id, id));
  return NextResponse.json({ success: true });
}
