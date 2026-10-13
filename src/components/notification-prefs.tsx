"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

// Préférences de notifications du salarié (Mon espace) + activation sur l'appareil.
type Prefs = { cart: boolean; promos: boolean; news: boolean; asked: boolean };

const ROWS: { key: keyof Prefs; title: string; desc: string }[] = [
  { key: "promos", title: "Jeudi Promo", desc: "Les offres de la semaine, chaque jeudi." },
  { key: "news", title: "Nouveautés", desc: "Nouveaux séjours, colonies et services." },
  { key: "cart", title: "Rappel de panier", desc: "Un rappel si vous laissez un séjour dans votre panier." },
];

const b64 = (s: string) => {
  const r = atob((s + "=".repeat((4 - (s.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(r, (c) => c.charCodeAt(0));
};

export function NotificationPrefs() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [vapid, setVapid] = useState("");
  const [devices, setDevices] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/plateforme?action=prefs")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setPrefs(d.prefs);
        setVapid(d.vapid);
        setDevices(d.devices);
      })
      .catch(() => {});
  }, []);

  const save = async (key: keyof Prefs, value: boolean) => {
    if (!prefs) return;
    setPrefs({ ...prefs, [key]: value });
    await fetch("/api/plateforme", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: "prefs", [key]: value, asked: true }),
    });
  };

  const enableDevice = async () => {
    setMsg("");
    try {
      if (!("serviceWorker" in navigator) || !("PushManager" in window) || !vapid) {
        setMsg("Ce navigateur ne permet pas les notifications. Sur iPhone : ajoutez la plateforme à l'écran d'accueil (Partager → « Sur l'écran d'accueil »), puis réessayez depuis l'icône.");
        return;
      }
      if ((await Notification.requestPermission()) !== "granted") {
        setMsg("Notifications refusées. Vous pouvez les autoriser dans les réglages du navigateur.");
        return;
      }
      const reg = await navigator.serviceWorker.register("/plateforme/sw.js", { scope: "/plateforme/" });
      await navigator.serviceWorker.ready;
      const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(vapid) }));
      const r = await fetch("/api/plateforme", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: "push-sub", sub: sub.toJSON() }),
      });
      if (r.ok) {
        setDevices((n) => Math.max(n, 1));
        setMsg("Notifications activées sur cet appareil.");
      } else setMsg("Activation impossible pour le moment.");
    } catch {
      setMsg("Activation impossible sur ce navigateur.");
    }
  };

  if (!prefs) return null;
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-white mb-2 flex items-center gap-3">
        <Bell size={18} className="text-primary" /> Mes notifications
      </h2>
      <p className="text-sm text-white/40 mb-6">Par email et sur votre téléphone. Modifiable à tout moment.</p>
      <div className="space-y-3">
        {ROWS.map((r) => (
          <label key={r.key} className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.015] px-5 py-4 hover:border-primary/25">
            <span>
              <span className="block text-white">{r.title}</span>
              <span className="block text-xs text-white/40">{r.desc}</span>
            </span>
            <input type="checkbox" className="h-5 w-5 accent-[#c5a059]" checked={!!prefs[r.key]} onChange={(e) => save(r.key, e.target.checked)} />
          </label>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" onClick={enableDevice} className="border border-primary/40 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-black transition">
          Activer sur cet appareil
        </button>
        <span className="text-xs text-white/40">{devices ? `${devices} appareil${devices > 1 ? "s" : ""} activé${devices > 1 ? "s" : ""}` : "Aucun appareil activé"}</span>
      </div>
      {msg && <p className="mt-3 text-sm text-white/60">{msg}</p>}
    </div>
  );
}
