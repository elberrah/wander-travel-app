'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X, Phone, MapPin, Mail, ArrowRight } from 'lucide-react';
const IconInstagram=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>;
const IconLinkedin=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
import { SITE } from '@/lib/site-data';

const nav = [
  {href:'/mice',label:'MICE'}, {href:'/avantages-salaries',label:'Avantages Salariés'},
  {href:'/kids-juniors',label:'Kids & Juniors'}, {href:'/scolaire',label:'Scolaire'},
  {href:'/triangle-dor',label:'Triangle d’Or'}, {href:'/voyages-corporate',label:'Voyages Corporate'}, {href:'/vip',label:'VIP & Aviation'},
];
const secondary = [{href:'/destinations',label:'Destinations'},{href:'/realisations',label:'Réalisations'},{href:'/a-propos',label:'À propos'}];

export function Brand({footer=false}:{footer?:boolean}) {
  return <Link className={`brand ${footer?'brand-footer':''}`} href='/' aria-label='Wander Travel & Event — accueil'>
    <Image
      className={footer ? 'brand-art brand-art-footer' : 'brand-art'}
      unoptimized
      priority={!footer}
      src={footer ? '/brand/wander-logo.webp' : '/brand/wander-header.webp'}
      width={footer ? 180 : 280}
      height={footer ? 180 : 72}
      alt=''
    />
  </Link>;
}
export function Header() {
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const [mega,setMega]=useState(false);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>30);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open]);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);setMega(false)}};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[]);
 return <header className={`site-header ${scrolled?'is-scrolled':''}`}>
   <div className='site-header-inner'><Brand/>
    <nav aria-label='Navigation principale' className='desktop-nav'>
      <div className='mega-wrap' onMouseEnter={()=>setMega(true)} onMouseLeave={()=>setMega(false)}>
        <button className='nav-link menu-trigger' onClick={()=>setMega(!mega)} aria-expanded={mega} aria-controls='univers-panel'>Univers <ChevronDown size={14}/></button>
        {mega&&<div className='mega-panel' id='univers-panel'>
          <div className='mega-intro'><span className='eyebrow'>L’EXPERTISE WANDER</span><p>Des expériences distinctes. Une seule signature d’exigence.</p><Link href='/mice' onClick={()=>setMega(false)}>Explorer le MICE <ArrowUpRight size={14}/></Link></div>
          <div className='mega-list'>{nav.map((item,i)=><Link key={item.href} onClick={()=>setMega(false)} href={item.href}><span className='mega-num'>0{i+1}</span>{item.label}<ArrowUpRight size={14}/></Link>)}</div>
        </div>}
      </div>
      <Link href='/realisations' className='nav-link'>Réalisations</Link><Link href='/a-propos' className='nav-link'>À propos</Link><Link href='/contact' className='nav-link'>Contact</Link>
    </nav>
    <div className='header-actions'><Link className='btn btn-gold btn-small header-cta' href='/contact'>Demander une proposition <ArrowUpRight size={16}/></Link>
    <button className='mobile-toggle' onClick={()=>setOpen(!open)} aria-label={open?'Fermer le menu':'Ouvrir le menu'} aria-expanded={open} aria-controls='mobile-nav'>{open?<X size={25}/>:<Menu size={25}/>}</button></div>
   </div>
   {open&&<nav className='mobile-nav' id='mobile-nav' aria-label='Navigation mobile'><div className='mobile-nav-links'>{nav.concat(secondary).map((item,i)=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)}><span>{String(i+1).padStart(2,'0')}</span>{item.label}<ArrowUpRight size={18}/></Link>)}</div><Link href='/contact' className='btn btn-gold mobile-nav-cta' onClick={()=>setOpen(false)}>Demander une proposition <ArrowUpRight size={18}/></Link></nav>}
 </header>
}
export function Footer(){return <footer className='site-footer'>
  <div className='container footer-top'><div><span className='eyebrow'>DONNONS FORME À VOTRE PROCHAIN PROJET</span><h2 className='footer-title'>Le prochain moment<br/><em>commence ici.</em></h2></div><Link href='/contact' className='circle-link' aria-label='Demander une proposition'><ArrowUpRight size={28}/></Link></div>
  <div className='container footer-grid'>
    <div className='footer-brand'><Brand footer/><p>Le sens du détail, la rigueur du mouvement et l’art de créer des moments qui comptent. Paris dans le parcours, Casablanca comme ancrage.</p><span className='footer-license'>Voyages · Événementiel · Casablanca</span></div>
    <div><h3>EXPLORER</h3><Link href='/mice'>Wander MICE</Link><Link href='/avantages-salaries'>Avantages Salariés</Link><Link href='/kids-juniors'>Kids & Juniors</Link><Link href='/scolaire'>Scolaire</Link><Link href='/triangle-dor'>Triangle d’Or</Link><Link href='/voyages-corporate'>Voyages Corporate</Link><Link href='/vip'>VIP & Aviation</Link></div>
    <div><h3>DÉCOUVRIR</h3><Link href='/destinations'>Destinations</Link><Link href='/realisations'>Réalisations</Link><Link href='/a-propos'>À propos</Link><Link href='/contact'>Nous contacter</Link><a href={SITE.whatsapp} target='_blank' rel='noreferrer'>WhatsApp <ArrowUpRight size={12}/></a></div>
    <div className='footer-contact'><h3>CASABLANCA</h3><p><MapPin size={16}/>{SITE.address}</p><a href={`tel:${SITE.telephone}`}><Phone size={16}/>{SITE.phone}</a><a href={`mailto:${SITE.email}`}><Mail size={16}/>{SITE.email}</a><div className='footer-socials'><a href='https://www.instagram.com/wand.erevents/' aria-label='Instagram Wander' rel='noopener noreferrer' target='_blank'><IconInstagram/></a><a href='https://www.linkedin.com/company/wander-travel-event/' aria-label='LinkedIn Wander' rel='noopener noreferrer' target='_blank'><IconLinkedin/></a></div></div>
  </div>
  <div className='container footer-bottom'><span>© {new Date().getFullYear()} Wander Travel & Event. Tous droits réservés.</span><div><Link href='/mentions-legales'>Mentions légales</Link><Link href='/cgu'>CGU</Link><Link href='/confidentialite'>Confidentialité</Link><button type='button' onClick={()=>window.dispatchEvent(new Event('wander-open-cookies'))}>Gérer les cookies</button></div><span>Made for moments that matter.</span></div>
 </footer>}
export function FloatingWhatsApp(){return <a className='floating-whatsapp' href={SITE.whatsapp} aria-label='Échanger sur WhatsApp avec Wander' target='_blank' rel='noopener noreferrer'><Phone size={19}/><span>Parlons de votre projet</span></a>}
export function CookieConsent(){
 const [shown,setShown]=useState(false),[custom,setCustom]=useState(false),[analytics,setAnalytics]=useState(false),[marketing,setMarketing]=useState(false);
 useEffect(()=>{setShown(!localStorage.getItem('wander-consent-v1'));const handler=()=>{setCustom(true);setShown(true)};window.addEventListener('wander-open-cookies',handler);return()=>window.removeEventListener('wander-open-cookies',handler)},[]);
 useEffect(()=>{try{const consent=JSON.parse(localStorage.getItem('wander-consent-v1')||'{}');if(consent.analytics)loadAnalytics();if(consent.marketing)loadMarketing()}catch{/* no consent */}},[]);
 function save(a:boolean,m:boolean){localStorage.setItem('wander-consent-v1',JSON.stringify({analytics:a,marketing:m,date:new Date().toISOString()}));setShown(false);if(a)loadAnalytics();if(m)loadMarketing();if(!a||!m)window.location.reload()}
 function loadAnalytics(){const id=process.env.NEXT_PUBLIC_GA4_ID || 'G-ZL06HET5SK';if(!id||document.querySelector('[data-wander-ga]'))return;const s=document.createElement('script');s.async=true;s.dataset.wanderGa='true';s.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer?.push(arguments)};window.gtag('js',new Date());window.gtag('config',id,{anonymize_ip:true});}
 function loadMarketing(){const id=process.env.NEXT_PUBLIC_META_PIXEL_ID;if(!id||document.querySelector('[data-wander-pixel]'))return;const script=document.createElement('script');script.dataset.wanderPixel='true';script.text="!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');";document.head.appendChild(script);if(typeof window.fbq==='function'){window.fbq('init',id);window.fbq('track','PageView')}}
 return shown?<div className='consent-backdrop'><div className='consent-panel' role='dialog' aria-modal='true' aria-labelledby='cookies-title'><span className='eyebrow'>VOTRE CONFIDENTIALITÉ</span><h2 id='cookies-title'>Votre expérience, vos choix.</h2><p>Nous utilisons des cookies essentiels au fonctionnement du site. Les outils de mesure d’audience et de marketing ne sont activés qu’avec votre accord. Vous pouvez modifier votre choix à tout moment.</p>{custom&&<div className='consent-options'><label><span>Mesure d’audience (Google Analytics)</span><input type='checkbox' checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label><label><span>Marketing (Meta Pixel)</span><input type='checkbox' checked={marketing} onChange={e=>setMarketing(e.target.checked)}/></label><p className='small-muted'>Les cookies strictement nécessaires restent actifs. Les options non configurées ne chargent aucun service.</p></div>}<div className='consent-actions'><button className='btn btn-outline' onClick={()=>save(false,false)}>Refuser</button><button className='btn btn-outline' onClick={()=>custom?save(analytics,marketing):setCustom(true)}>{custom?'Enregistrer mes choix':'Personnaliser'}</button><button className='btn btn-gold' onClick={()=>save(true,true)}>Tout accepter</button></div><Link href='/cookies' className='consent-link'>En savoir plus sur les cookies <ArrowRight size={14}/></Link></div></div>:null;
}

declare global { interface Window {dataLayer?: unknown[];gtag?: (...args: unknown[])=>void;fbq?: (...args: unknown[])=>void;} }
