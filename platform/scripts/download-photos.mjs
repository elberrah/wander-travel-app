// Télécharge les photos hébergées sur d'autres sites vers assets/photos/<offre>/ et met data.js à jour.
// Usage : node scripts/download-photos.mjs   (Node 18 ou plus)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = join(root, 'data.js');
let code = await readFile(dataPath, 'utf8');

const ctx = vm.createContext({});
const { OFFERS_DATA } = vm.runInContext(code + '\n({ OFFERS_DATA })', ctx);

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' };
const isRemote = u => /^https?:\/\//i.test(u);
let ok = 0, fail = 0;

for (const o of OFFERS_DATA) {
  const urls = (o.images || []).filter(isRemote);
  let n = 0;
  for (const url of urls) {
    n++;
    try {
      const r = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
          Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
          Referer: new URL(url).origin + '/'
        }
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const type = (r.headers.get('content-type') || '').split(';')[0].trim();
      const ext = EXT[type] || (url.match(/\.(jpe?g|png|webp|avif|gif)(?:\?|$)/i) || [, 'jpg'])[1].toLowerCase().replace('jpeg', 'jpg');
      const rel = `assets/photos/${o.id}/web-${n}.${ext}`;
      await mkdir(join(root, 'assets/photos', o.id), { recursive: true });
      await writeFile(join(root, rel), Buffer.from(await r.arrayBuffer()));
      code = code.split(`'${url}'`).join(`'${rel}'`).split(`"${url}"`).join(`"${rel}"`);
      ok++;
      console.log('OK  ', o.id, rel);
    } catch (e) {
      fail++;
      console.log('ECHEC', o.id, url, '-', e.message);
    }
  }
}

await writeFile(dataPath, code);
console.log(`\nTerminé : ${ok} photos téléchargées, ${fail} en échec (elles restent chargées depuis leur site d'origine).`);
