import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.TENOR_API_KEY;
  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
    q
  )}&key=${apiKey}&limit=12&media_filter=gif`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
