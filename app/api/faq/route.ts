import { asc, eq } from "drizzle-orm";
import { faq } from "@/drizzle/schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const pool = mysql.createPool(process.env.DATABASE_URL!);
const db = drizzle({ connection: pool });

export const runtime = "nodejs";
export async function GET() {
  console.log("DB URL:", process.env.DATABASE_URL);

  const db = drizzle({ connection: { uri: process.env.DATABASE_URL } });

  const response = await db
    .select()
    .from(faq)
    .where(eq(faq.visible, 1))
    .orderBy(asc(faq.id));

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
