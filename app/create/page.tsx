"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function CreatePage() {
  const [caption, setCaption] = useState("");
  const [gifs, setGifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  async function searchGifs() {
    setLoading(true);
    const res = await fetch(`/api/gifs?q=${encodeURIComponent(caption)}`);
    const data = await res.json();
    setGifs(data.results || []);
    setLoading(false);
  }

  async function generateVideo() {
    if (!selectedGif) return;
    setGenerating(true);

    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gifUrl: selectedGif, caption }),
    });

    const data = await res.json();
    setVideo(data.video);
    setGenerating(false);
  }

  async function handleSignOut() {
    await signOut({ redirect: false });
    window.location.replace("/login");
  }

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/">← Back</Link>
        <button onClick={handleSignOut}>Sign out</button>
      </div>

      <h1 style={{ marginTop: 20 }}>Create a Giftok</h1>

      <input
  type="text"
  placeholder="Enter caption..."
  value={caption}
  onChange={(e) => setCaption(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && caption) {
      searchGifs();
    }
  }}
  style={{
    width: "100%",
    padding: 12,
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 6,
    marginTop: 20,
  }}
/>


      <button
        onClick={searchGifs}
        disabled={!caption || loading}
        style={{ marginTop: 10 }}
      >
        {loading ? "Searching..." : "Find GIFs"}
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 12,
          marginTop: 30,
        }}
      >
        {gifs.map((gif) => {
          const url = gif.media_formats.gif.url;
          return (
            <img
              key={gif.id}
              src={url}
              onClick={() => setSelectedGif(url)}
              style={{
                width: "100%",
                cursor: "pointer",
                border:
                  selectedGif === url
                    ? "3px solid black"
                    : "2px solid transparent",
              }}
            />
          );
        })}
      </div>

      {selectedGif && (
        <button onClick={generateVideo} style={{ marginTop: 20 }}>
          {generating ? "Generating..." : "Generate Video"}
        </button>
      )}

      {video && (
        <video
          src={video}
          controls
          style={{ width: "100%", marginTop: 20 }}
        />
      )}
    </div>
  );
}
