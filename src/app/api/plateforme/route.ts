import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sendRequestNotification } from "@/lib/email";
import { REQUEST_STATUSES, addRequest, addVisit, getOverrides, getStats, saveOverrides, setRequestStatus } from "@/lib/platform-store";

// Remplace le script Google Apps Script de la plateforme (même protocole que sync.js) :
// GET ?action=ping|overrides|stats|users, POST {action: visit|request|save|status}.
// Session obligatoire ; actions de gestion réservées au rôle admin, vérifié ici.

export const dynamic = "force-dynamic";

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
const str = (v: unknown, max = 300) => String(v ?? "").slice(0, max);

async function currentSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function GET(req: Request) {
  const session = await currentSession();
  if (!session) return json({ error: "auth" }, 401);
  const action = new URL(req.url).searchParams.get("action");
  if (action === "ping") return json({ ok: true, time: new Date().toISOString() });
  if (action === "overrides") return json(await getOverrides());
  if (session.user.role !== "admin") return json({ error: "auth" }, 403);
  if (action === "stats") return json(await getStats());
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

  if (session.user.role !== "admin") return json({ error: "auth" }, 403);

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
