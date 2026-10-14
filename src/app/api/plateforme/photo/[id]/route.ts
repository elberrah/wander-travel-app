import { getPhoto } from "@/lib/platform-store";

// Photo importée depuis le tableau de bord. Accès réservé aux comptes connectés (proxy.ts).
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/.test(id)) return new Response("Introuvable", { status: 404 });
  const photo = await getPhoto(id);
  if (!photo) return new Response("Introuvable", { status: 404 });
  return new Response(new Uint8Array(photo.data), {
    headers: {
      "Content-Type": photo.mime,
      "Content-Length": String(photo.data.length),
      // Une photo importée ne change jamais (nouvel identifiant à chaque import).
      "Cache-Control": "private, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
