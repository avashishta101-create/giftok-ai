import { drizzle } from "drizzle-orm/postgres-js";
import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";

const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
export const db = drizzle(client);

/* ---------------- USERS TABLE ---------------- */

export const users = pgTable("User", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 64 }),
  password: varchar("password", { length: 64 }),
});

async function ensureUsersTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );
  `;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64)
      );
    `;
  }
}

/* ---------------- CURATED GIFS TABLE ---------------- */

export const curatedGifs = pgTable("curated_gifs", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  theme: text("theme").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

async function ensureCuratedGifsTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'curated_gifs'
    );
  `;

  if (!result[0].exists) {
    await client`
      CREATE TABLE curated_gifs (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        theme TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now()
      );
    `;
  }
}

/* ---------------- USER HELPERS ---------------- */

export async function getUser(email: string) {
  await ensureUsersTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  await ensureUsersTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash });
}

/* ---------------- GIF HELPERS ---------------- */

export async function saveCuratedGif(url: string, theme: string) {
  await ensureCuratedGifsTableExists();
  return await db.insert(curatedGifs).values({ url, theme });
}
