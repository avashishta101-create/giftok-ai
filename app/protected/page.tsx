import Link from "next/link";

export default function ProtectedHome() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
        Giftok AI Dashboard
      </h1>

      <p style={{ marginTop: 12 }}>
        You are signed in. Start creating viral Giftoks below.
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
