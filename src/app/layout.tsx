import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header,Footer,FloatingWhatsApp,CookieConsent,ContactClickTracking } from '@/components/site/site-chrome';
import { SITE } from '@/lib/site-data';
export const metadata:Metadata = {
 metadataBase:new URL(SITE.url),
 title:{default:'Wander Travel & Event | MICE & voyages corporate à Casablanca',template:'%s | Wander Travel & Event'},
 description:'Wander imagine vos séminaires, voyages corporate et expériences d’exception au Maroc. Un savoir-faire international porté par 17 ans de parcours entrepreneurial.',
 openGraph:{type:'website',locale:'fr_MA',siteName:SITE.name,images:[{url:'/og-wander.jpg',width:1200,height:630,alt:'Wander Travel & Event — Casablanca'}]},
 robots:process.env.VERCEL_ENV === 'preview'?{index:false,follow:false}:{index:true,follow:true},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0A0A0A'};
export default function RootLayout({children}:{children:React.ReactNode}) {
 const ld={ '@context':'https://schema.org','@type':['TravelAgency','LocalBusiness'],name:SITE.name,url:SITE.url,telephone:SITE.phone,email:SITE.email,address:{'@type':'PostalAddress',streetAddress:'36 Rue De Vevey, RDC Magasin 02',postalCode:'23330',addressLocality:'Casablanca',addressCountry:'MA'},areaServed:['Casablanca','Rabat','Marrakech','Tanger','Agadir','El Jadida','Maroc','Europe'],description:'Séminaires, incentives, team building et voyages d’affaires au Maroc et en Europe. Programme clé en main, devis personnalisé sous 24h.',founder:{'@type':'Person',name:'Mohammed El Berrah',jobTitle:'Fondateur & Directeur Général'}};
 return <html lang='fr'><body><a className='skip-link' href='#contenu'>Aller au contenu principal</a><Header/><main id='contenu'>{children}</main><Footer/><FloatingWhatsApp/><CookieConsent/><ContactClickTracking/><script type='application/ld+json' dangerouslySetInnerHTML={{__html:JSON.stringify(ld).replace(/</g,'\\u003c')}}/></body></html>
}
