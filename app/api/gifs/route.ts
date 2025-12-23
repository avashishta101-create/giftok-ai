import { NextResponse } from "next/server";
import { detectTheme } from "@/lib/theme";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const caption = searchParams.get("q");

  if (!caption) {
    return NextResponse.json({ results: [] });
  }

  const theme = detectTheme(caption);
  const apiKey = process.env.TENOR_API_KEY;

  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
    theme
  )}&key=${apiKey}&limit=12&media_filter=gif`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
