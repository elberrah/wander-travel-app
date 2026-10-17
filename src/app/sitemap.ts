import type {MetadataRoute} from 'next';
import {SITE,packages} from '@/lib/site-data';
export default function sitemap():MetadataRoute.Sitemap{const pages=['','mice','avantages-salaries','kids-juniors','scolaire','triangle-dor','voyages-corporate','vip','destinations','realisations','a-propos','contact','mentions-legales','cgu','confidentialite','cookies'];return [...pages.map(p=>({url:`${SITE.url}/${p}`,changeFrequency:'monthly' as const,priority:p===''?1:p==='mice'?0.9:0.6})),...packages.map(p=>({url:`${SITE.url}/mice/${p.slug}`,changeFrequency:'monthly' as const,priority:0.7}))]}
