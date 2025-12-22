"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
          Giftok AI Dashboard
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
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

      <p style={{ marginTop: 12 }}>
        You are signed in.
      </p>

      <div style={{ marginTop: 24 }}>
        <Link
          href="/create"
          style={{
            padding: "10px 16px",
            background: "black",
            color: "white",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          ➕ Create a Giftok
        </Link>
      </div>
    </div>
  );
}
