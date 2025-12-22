import { NextResponse } from "next/server";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export async function POST(req: Request) {
  const { gifUrl, caption } = await req.json();

  if (!gifUrl || !caption) {
    return NextResponse.json(
      { error: "Missing gifUrl or caption" },
      { status: 400 }
    );
  }

  const ffmpeg = new FFmpeg();

  await ffmpeg.load({
    coreURL: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/ffmpeg-core.js",
  });

  const gifData = await fetchFile(gifUrl);
  await ffmpeg.writeFile("input.gif", gifData);

  const safeCaption = caption
    .replace(/:/g, "\\:")
    .replace(/'/g, "\\'");

  await ffmpeg.exec([
    "-i", "input.gif",
    "-vf",
    `drawtext=text='${safeCaption}':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=h-80:box=1:boxcolor=black@0.5`,
    "-movflags", "faststart",
    "-pix_fmt", "yuv420p",
    "output.mp4",
  ]);

  const mp4Data = await ffmpeg.readFile("output.mp4");

  const base64 = Buffer.from(mp4Data as Uint8Array).toString("base64");
  const dataUrl = `data:video/mp4;base64,${base64}`;

  return NextResponse.json({ video: dataUrl });
}
