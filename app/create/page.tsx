"use client";

import { useState } from "react";

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
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
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
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.media_formats.gif.url}
            alt={gif.content_description}
            style={{ width: "100%", borderRadius: 8 }}
          />
        ))}
      </div>
    </div>
  );
}
