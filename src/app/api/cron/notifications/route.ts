import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { runCartReminders, runNewOffers, runThursdayPromo } from "@/lib/notify";

// Robot quotidien (Vercel Cron, 10 h au Maroc) : relances panier, Jeudi Promo, nouveautés.
// Appelable aussi par n8n avec le même secret : Authorization: Bearer <CRON_SECRET>.

export const dynamic = "force-dynamic";
export const maxDuration = 300;

function authorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const a = Buffer.from(req.headers.get("authorization") || "");
  const b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "auth" }, { status: 401 });
  const url = new URL(req.url);
  const task = url.searchParams.get("task") || "all";
  const out: Record<string, unknown> = {};
  if (task === "all" || task === "cart") out.cart = await runCartReminders();
  if (task === "all" || task === "promo") out.promo = await runThursdayPromo(Date.now(), url.searchParams.get("force") === "1");
  if (task === "all" || task === "new") out.news = await runNewOffers();
  console.info("[cron] notifications", JSON.stringify(out));
  return NextResponse.json({ ok: true, ...out });
}
