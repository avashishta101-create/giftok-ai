"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const [selectedGif, setSelectedGif] = useState<string | null>(null);
const [video, setVideo] = useState<string | null>(null);
const [generating, setGenerating] = useState(false);

 async function generateVideo() {
    if (!selectedGif) return;
    setGenerating(true);

    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gifUrl: selectedGif,
        caption,
      }),
    });

    const data = await res.json();
    setVideo(data.video);
    setGenerating(false);
  }

  return (
    ...
  );
}

async function handleSignOut() {
  console.log("Signing out...");
  await signOut({ redirect: false }); // clears the cookie/session
  window.location.replace("/login"); // force fresh request
}

export default function CreatePage() {
  const [caption, setCaption] = useState("");
  const [gifs, setGifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchGifs() {
    setLoading(true);
    const res = await fetch(`/api/gifs?q=${encodeURIComponent(caption)}`);
    const data = await res.json();
    setGifs(data.results || []);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/">← Back</Link>
        <button
  onClick={handleSignOut}
  style={{
    background: "transparent",
    border: "1px solid #ccc",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  }}
>
  Sign out
</button>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: "bold", marginTop: 20 }}>
        Create a Giftok
      </h1>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Enter a relatable caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />
        <button
          onClick={searchGifs}
          disabled={!caption || loading}
          style={{
            marginTop: 12,
            padding: "10px 16px",
            background: "black",
            color: "white",
            borderRadius: 6,
          }}
        >
          {loading ? "Searching..." : "Find GIFs"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 12,
          marginTop: 30,
        }}
      >

        {selectedGif && (
  <button
    onClick={generateVideo}
    disabled={generating}
    style={{
      marginTop: 20,
      padding: "12px 18px",
      background: "black",
      color: "white",
      borderRadius: 6,
    }}
  >
    {generating ? "Generating..." : "Generate Video"}
  </button>
)}

 <div className="grid">
  {gifs.map(...)}
</div>

{selectedGif && ( /* Generate button */ )}

{video && (
  <div style={{ marginTop: 30 }}>
    <h3>Preview</h3>
    <video
      src={video}
      controls
      style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
    />
    <a href={video} download="giftok.mp4">
      Download MP4
    </a>
  </div>
)}
       
        {gifs.map((gif) => {
  const url = gif.media_formats.gif.url;
  return (
    <img
      key={gif.id}
      src={url}
      alt=""
      onClick={() => setSelectedGif(url)}
      style={{
        width: "100%",
        borderRadius: 8,
        cursor: "pointer",
        border: selectedGif === url ? "3px solid black" : "2px solid transparent",
      }}
    />
  );
})}
      </div>
    </div>
  );
}
