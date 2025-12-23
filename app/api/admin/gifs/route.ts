import { NextResponse } from "next/server";
import { saveCuratedGif } from "@/app/db";

export async function POST(req: Request) {
  try {
    const { url, theme } = await req.json();

    if (!url || !theme) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await saveCuratedGif(url, theme);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
