import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sendRequestNotification } from "@/lib/email";
import {
  REQUEST_STATUSES,
  addPhoto,
  addPushSub,
  addRequest,
  addVisit,
  getMembers,
  getOverrides,
  getPendingCarts,
  getPrefs,
  getPushSubs,
  getStats,
  removePushSub,
  saveCart,
  saveOverrides,
  setPrefs,
  setRequestStatus,
} from "@/lib/platform-store";
import { catalogue, promoContent, sendCartReminder, sendNews, sendPromo, vapidPublicKey } from "@/lib/notify";

// Services de notification push des navigateurs (Chrome/Android, Safari/iPhone, Firefox, Edge).
const PUSH_HOSTS = [/^fcm\.googleapis\.com$/, /(^|\.)push\.apple\.com$/, /(^|\.)push\.services\.mozilla\.com$/, /(^|\.)notify\.windows\.com$/];

// Remplace le script Google Apps Script de la plateforme (même protocole que sync.js) :
// GET ?action=ping|overrides|stats|users, POST {action: visit|request|save|status}.
// Session obligatoire ; actions de gestion réservées au rôle admin, vérifié ici.

export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
const str = (v: unknown, max = 300) => String(v ?? "").slice(0, max);

// Photos importées : formats image courants uniquement, reconnus à leur signature (pas au nom du fichier).
const PHOTO_MAX = 1_400_000;
function photoType(buf: Buffer): string | null {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.length > 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  return null;
}

async function currentSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function GET(req: Request) {
  const session = await currentSession();
  if (!session) return json({ error: "auth" }, 401);
  const action = new URL(req.url).searchParams.get("action");
  if (action === "ping") return json({ ok: true, time: new Date().toISOString() });
  if (action === "overrides") return json(await getOverrides());
  if (action === "prefs") {
    const devices = await getPushSubs(session.user.id);
    return json({ prefs: await getPrefs(session.user.id), vapid: vapidPublicKey, devices: devices.length });
  }
  if (session.user.role !== "admin") return json({ error: "auth" }, 403);
  if (action === "stats") {
    const [stats, carts, members, subs] = await Promise.all([getStats(), getPendingCarts(), getMembers(), getPushSubs()]);
    const byId = new Map(members.map((m) => [m.id, m]));
    return json({
      ...stats,
      carts: carts.map((c) => {
        const m = byId.get(c.userId);
        return { name: m?.name || "", email: m?.email || "", company: m?.company || "", items: c.items, updated: c.updated, reminded: c.reminded };
      }),
      audience: {
        members: members.filter((m) => m.verified && !m.banned).length,
        promos: members.filter((m) => m.prefs.promos).length,
        news: members.filter((m) => m.prefs.news).length,
        devices: new Set(subs.map((x) => x.userId)).size,
      },
    });
  }
  // Les comptes se gèrent dans /admin/utilisateurs.
  if (action === "users") return json([]);
  return json({ error: "action" }, 400);
}

export async function POST(req: Request) {
  // Requêtes du site uniquement (protection CSRF en plus du cookie SameSite).
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return json({ error: "origin" }, 403);
  const session = await currentSession();
  if (!session) return json({ error: "auth" }, 401);

  const raw = await req.text();
  if (raw.length > 2_000_000) return json({ error: "size" }, 413);
  let b: Record<string, unknown>;
  try {
    b = JSON.parse(raw);
  } catch {
    return json({ error: "json" }, 400);
  }
  const userId = session.user.id;

  if (b.action === "visit") {
    // Les consultations de l'équipe Wander ne faussent pas les statistiques.
    if (session.user.role === "admin") return json({ ok: true });
    await addVisit(str(b.page, 120), str(b.offer, 120), userId);
    return json({ ok: true });
  }

  if (b.action === "request") {
    const fields = ["fn", "ln", "em", "co", "ph", "product", "variant", "date", "end", "nights", "rooms", "adults", "children", "babies", "total"];
    const data: Record<string, string> = Object.fromEntries(fields.map((k) => [k, str(b[k])]));
    data.account = session.user.email;
    await addRequest(data, userId);
    await sendRequestNotification(data).catch((e) => console.error("[plateforme] notification demande :", e));
    return json({ ok: true });
  }

  if (b.action === "cart") {
    const items = Array.isArray(b.items) ? b.items.slice(0, 20) : [];
    await saveCart(
      userId,
      items.map((i: Record<string, unknown>) => ({
        offerId: str(i.offerId, 120),
        title: str(i.title, 200),
        variant: str(i.variant, 200),
        date: str(i.date, 40),
        end: str(i.end, 40),
        total: Number(i.total) || 0,
      })),
    );
    return json({ ok: true });
  }

  if (b.action === "prefs") {
    const p: Record<string, boolean> = {};
    for (const k of ["cart", "promos", "news", "asked"]) if (typeof b[k] === "boolean") p[k] = b[k] as boolean;
    return json({ ok: true, prefs: await setPrefs(userId, p) });
  }

  if (b.action === "push-sub") {
    const sub = (b.sub || {}) as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
    let host = "";
    try {
      const u = new URL(String(sub.endpoint));
      if (u.protocol === "https:") host = u.hostname;
    } catch {}
    if (!host || !PUSH_HOSTS.some((r) => r.test(host)) || !sub.keys?.p256dh || !sub.keys?.auth) return json({ error: "sub" }, 400);
    await addPushSub(userId, String(sub.endpoint).slice(0, 1000), str(sub.keys.p256dh, 200), str(sub.keys.auth, 100));
    return json({ ok: true });
  }

  if (b.action === "push-unsub") {
    await removePushSub(str(b.endpoint, 1000), userId);
    return json({ ok: true });
  }

  if (session.user.role !== "admin") return json({ error: "auth" }, 403);

  // Aperçu des notifications envoyé uniquement à l'admin connecté.
  if (b.action === "notify-test") {
    const me = (await getMembers()).find((m) => m.id === userId);
    if (!me) return json({ error: "user" }, 400);
    if (b.kind === "cart") {
      await sendCartReminder(me, [{ title: "Palm Plaza Marrakech", variant: "Chambre double", date: "2026-11-12", end: "2026-11-15", total: 3600 }], 1);
    } else if (b.kind === "promo") {
      const promos = await promoContent();
      if (!promos.length) return json({ error: "Aucune offre cochée « Promo du jeudi »." }, 400);
      await sendPromo(me, promos);
    } else if (b.kind === "news") {
      const { offers } = await catalogue();
      if (!offers.length) return json({ error: "Catalogue vide." }, 400);
      await sendNews(me, offers.slice(-1));
    } else return json({ error: "kind" }, 400);
    return json({ ok: true });
  }

  if (b.action === "photo") {
    const buf = Buffer.from(str(b.data, 2_000_000), "base64");
    const mime = photoType(buf);
    if (!mime) return json({ error: "Format non pris en charge (JPEG, PNG ou WebP)." }, 400);
    if (buf.length > PHOTO_MAX) return json({ error: "Photo trop lourde." }, 413);
    const id = randomBytes(12).toString("hex");
    await addPhoto(id, mime, buf, userId);
    return json({ ok: true, url: `/api/plateforme/photo/${id}` });
  }

  if (b.action === "save") {
    const ov = b.overrides;
    if (!ov || typeof ov !== "object" || Array.isArray(ov)) return json({ error: "overrides" }, 400);
    await saveOverrides(ov);
    return json({ ok: true });
  }
  if (b.action === "status") {
    const id = Number(b.row);
    const status = str(b.status, 40);
    if (!Number.isInteger(id) || !REQUEST_STATUSES.includes(status)) return json({ error: "status" }, 400);
    await setRequestStatus(id, status);
    return json({ ok: true });
  }
  return json({ error: "action" }, 400);
}
