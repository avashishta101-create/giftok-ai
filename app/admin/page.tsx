"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("panic");
  const [gifs, setGifs] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function saveGif(url: string) {
    await fetch("/api/admin/gifs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, theme }),
    });
    await loadSaved();
    alert("Saved!");
  }

  async function deleteGif(id: number) {
    await fetch("/api/admin/curated", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadSaved();
  }

  async function loadSaved() {
    const res = await fetch("/api/admin/curated");
    const data = await res.json();
    setSaved(data.gifs || []);
  }

  async function search() {
    if (!query) return;
    setLoading(true);
    const res = await fetch(`/api/gifs?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setGifs(data.results || []);
    setLoading(false);
  }

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin GIF Curator</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Search Tenor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query) search();
          }}
          style={{ padding: 10, width: 300 }}
        />

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ marginLeft: 10, padding: 10 }}
        >
          <option value="panic">panic</option>
          <option value="happy">happy</option>
          <option value="sad">sad</option>
          <option value="angry">angry</option>
          <option value="shocked">shocked</option>
          <option value="confused">confused</option>
          <option value="neutral">neutral</option>
        </select>

        <button
          onClick={search}
          style={{ marginLeft: 10, padding: "10px 16px" }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Tenor search results */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginTop: 30,
        }}
      >
        {gifs.map((gif) => {
          const url = gif.media_formats.gif.url;
          return (
            <div key={gif.id}>
              <img
                src={url}
                alt=""
                style={{ width: "100%", borderRadius: 6 }}
              />
              <button
                onClick={() => saveGif(url)}
                style={{ width: "100%", marginTop: 6 }}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>

      {/* Saved curated GIFs */}
      <h2 style={{ marginTop: 50 }}>Saved GIFs</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginTop: 20,
        }}
      >
        {saved.map((gif) => (
          <div key={gif.id}>
            <img
              src={gif.url}
              alt=""
              style={{ width: "100%", borderRadius: 6 }}
            />
            <div style={{ fontSize: 12, marginTop: 4 }}>
              Theme: {gif.theme}
            </div>
            <button
              onClick={() => deleteGif(gif.id)}
              style={{
                width: "100%",
                marginTop: 6,
                background: "crimson",
                color: "white",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
