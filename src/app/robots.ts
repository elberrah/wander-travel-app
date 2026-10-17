import type {MetadataRoute} from 'next';
import {SITE} from '@/lib/site-data';
export default function robots():MetadataRoute.Robots {return {rules:[{userAgent:'*',allow:'/',disallow:['/preview/']}],sitemap:`${SITE.url}/sitemap.xml`}}
