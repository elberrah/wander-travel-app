import "server-only";
import nodemailer from "nodemailer";

// Emails transactionnels (confirmation d'adresse, réinitialisation du mot de passe).
// Les identifiants SMTP restent côté serveur (variables d'environnement).
const smtpConfigured = Boolean(process.env.SMTP_HOST);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE ?? "true") !== "false",
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    })
  : null;

const FROM = process.env.MAIL_FROM || "Wander Travel & Event <contact@wandertravel-event.com>";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout({ title, intro, cta, url, outro }: { title: string; intro: string; cta: string; url: string; outro: string }) {
  const safeUrl = escapeHtml(url);
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#050505;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;color:#fcfcfc">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0a0a0a;border:1px solid #262626;border-radius:18px">
<tr><td style="padding:36px 36px 8px;text-align:center">
<div style="font-family:Georgia,serif;font-size:26px;letter-spacing:6px;font-weight:bold;color:#fcfcfc">WANDER</div>
<div style="font-size:10px;letter-spacing:5px;color:#c5a059;text-transform:uppercase;margin-top:6px">Travel &amp; Event</div>
</td></tr>
<tr><td style="padding:24px 36px 8px">
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:22px;color:#c5a059;margin:0 0 16px">${title}</h1>
<p style="font-size:15px;line-height:1.6;color:#d4d4d4;margin:0 0 28px">${intro}</p>
<p style="text-align:center;margin:0 0 28px"><a href="${safeUrl}" style="display:inline-block;background:#c5a059;color:#050505;text-decoration:none;font-weight:bold;font-size:12px;letter-spacing:3px;text-transform:uppercase;padding:16px 32px;border-radius:999px">${cta}</a></p>
<p style="font-size:12px;line-height:1.6;color:#a3a3a3;margin:0 0 8px">${outro}</p>
<p style="font-size:11px;line-height:1.6;color:#737373;word-break:break-all;margin:0 0 24px">Si le bouton ne fonctionne pas, copiez ce lien : ${safeUrl}</p>
</td></tr>
<tr><td style="padding:20px 36px 32px;border-top:1px solid #262626;font-size:11px;color:#737373;text-align:center">
Wander Travel &amp; Event · Casablanca, Maroc<br>contact@wandertravel-event.com · +212 702 093 107
</td></tr></table></td></tr></table></body></html>`;
}

async function send(to: string, subject: string, html: string, text: string) {
  if (!transporter) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[email] SMTP non configuré : email « ${subject} » non envoyé à ${to}.`);
      return;
    }
    // Développement : le lien s'affiche dans le terminal.
    console.info(`\n[email] À : ${to}\n[email] Objet : ${subject}\n[email] ${text}\n`);
    return;
  }
  await transporter.sendMail({ from: FROM, to, subject, html, text });
}

export async function sendVerificationEmail(to: string, name: string, url: string) {
  const hello = name ? `Bonjour ${escapeHtml(name)},` : "Bonjour,";
  await send(
    to,
    "Confirmez votre adresse email — Wander",
    layout({
      title: "Confirmez votre adresse email",
      intro: `${hello} merci d'avoir créé votre compte Wander. Confirmez votre adresse pour accéder à la plateforme.`,
      cta: "Confirmer mon email",
      url,
      outro: "Ce lien est valable 24 heures. Si vous n'êtes pas à l'origine de cette inscription, ignorez cet email.",
    }),
    `Confirmez votre adresse email : ${url}`,
  );
}

export async function sendResetPasswordEmail(to: string, name: string, url: string) {
  const hello = name ? `Bonjour ${escapeHtml(name)},` : "Bonjour,";
  await send(
    to,
    "Réinitialisation de votre mot de passe — Wander",
    layout({
      title: "Nouveau mot de passe",
      intro: `${hello} une demande de réinitialisation du mot de passe a été faite pour votre compte Wander.`,
      cta: "Choisir un nouveau mot de passe",
      url,
      outro: "Ce lien est valable 1 heure et ne sert qu'une fois. Si vous n'avez rien demandé, ignorez cet email : votre mot de passe reste inchangé.",
    }),
    `Réinitialisez votre mot de passe : ${url}`,
  );
}

// Nouvelle demande de réservation sur la plateforme : alerte à l'équipe Wander.
export async function sendRequestNotification(d: Record<string, string>) {
  const to = process.env.NOTIFY_EMAIL || "contact@wandertravel-event.com";
  const lines = [
    `${d.fn} ${d.ln} — ${d.co || "entreprise non précisée"}`,
    `${d.em} · ${d.ph}${d.account && d.account !== d.em ? ` (compte : ${d.account})` : ""}`,
    "",
    `${d.product} — ${d.variant}`,
    `Du ${d.date} au ${d.end}${d.nights ? ` · ${d.nights} nuit(s) · ${d.rooms} chambre(s)` : ""}`,
    `Adultes : ${d.adults} · Enfants -12 ans : ${d.children} · Bébés : ${d.babies}`,
    `Estimation : ${d.total} (sous réserve de confirmation)`,
  ];
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#241a1c">${lines
    .map((l) => escapeHtml(l))
    .join("<br>")}<br><br>À traiter dans le tableau de bord, onglet Demandes.</div>`;
  await send(to, `Nouvelle demande : ${d.product}`, html, lines.join("\n"));
}
