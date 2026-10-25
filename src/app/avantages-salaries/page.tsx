import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Building2, HeartHandshake, Gift, Users } from 'lucide-react';
import { PageHero, SectionHeading, Wow, FAQs, CTASection } from '@/components/site/sections';

export const metadata: Metadata = {
  title: 'Avantages salariés au Maroc | Voyages Wander',
  description: 'Résidences, séjours en famille, Istanbul, Omra et colonies : découvrez le programme de voyages Wander destiné aux collaborateurs des entreprises au Maroc.',
  openGraph: {title:'Avantages Salariés — Wander Travel & Event',description:'Des séjours et expériences dédiés aux collaborateurs des entreprises partenaires.'},
};
const media = '/media/avantages/';
const residences = [
  {photo:'residence-piscine.webp',name:'Résidences avec piscine',desc:'Des séjours pensés pour les vacances en famille.',alt:'Résidence avec bassin bleu et palmiers'},
  {photo:'villa-maroc.webp',name:'Villas & intimité',desc:'Un autre rythme pour se retrouver.',alt:'Villa avec piscine privative et jardin'},
  {photo:'residence-ocean.webp',name:'Escapades à l’océan',desc:'L’air du large, le temps d’un séjour.',alt:'Terrasse avec fauteuil donnant sur un paysage côtier'},
  {photo:'residence-terrasse.webp',name:'Confort au quotidien',desc:'Des espaces pour se sentir ailleurs, ensemble.',alt:'Terrasse meublée avec vue sur le jardin et la piscine'},
];
const destinations = [
  {photo:'istanbul.webp',eyebrow:'VOYAGE CULTUREL',name:'Istanbul',desc:'Entre les deux rives du Bosphore, une ville de rencontres et de découvertes.',alt:'Vue sur Istanbul et le Bosphore'},
  {photo:'omra.webp',eyebrow:'VOYAGE SPIRITUEL',name:'Omra sur mesure',desc:'Un accompagnement étudié selon les attentes et les modalités du voyage.',alt:'Vue de la Kaaba et de la Grande Mosquée à La Mecque'},
  {photo:'sejour-littoral.webp',eyebrow:'SÉJOUR BALNÉAIRE',name:'Littoral & détente',desc:'Une parenthèse en bord de mer pour ralentir et profiter.',alt:'Piscine d’une résidence face à l’océan'},
];
export default function AvantagesSalaries(){return <>
  <PageHero eyebrow="WANDER / AVANTAGES SALARIÉS" title="Le voyage comme" italic="attention durable." description="Un programme conçu pour les entreprises qui souhaitent enrichir l’expérience de leurs collaborateurs et offrir à leurs familles de nouveaux horizons." image={`${media}famille-piscine.webp`} imageAlt="Famille en vacances auprès d’une piscine, dans un décor marocain au coucher du soleil" cta="Recevoir mon devis sous 24h" height="large" />

  <section className="section avantages-intro" id="decouvrir"><div className="container">
    <SectionHeading eyebrow="UNE PROPOSITION POUR LES DRH" title="Un avantage qui se vit. Et qui se partage." text="Wander imagine et coordonne une sélection de séjours et d’expériences à destination des collaborateurs des entreprises partenaires. Un dispositif de voyages qui prolonge l’attention portée aux équipes au-delà du bureau." />
    <div className="avantages-benefits">
      <article><Building2 size={24}/><span className="eyebrow">POUR L’ENTREPRISE</span><h3>Une marque employeur qui compte.</h3><p>Une offre à présenter à vos équipes, encadrée par une convention et accompagnée par Wander, sans reconstruire vos processus RH.</p></article>
      <article><HeartHandshake size={24}/><span className="eyebrow">POUR LES COLLABORATEURS</span><h3>Des expériences à partager.</h3><p>Résidences, escapades, découvertes et vacances en famille, selon les programmes disponibles et les périodes.</p></article>
      <article><Users size={24}/><span className="eyebrow">POUR LES FAMILLES</span><h3>Du temps qui laisse des souvenirs.</h3><p>Des expériences intergénérationnelles et des séjours dédiés aux plus jeunes, dans un cadre pensé pour rassurer.</p></article>
    </div>
  </div></section>

  <section className="section section-cream avantages-residences"><div className="container">
    <div className="avantages-header-row"><SectionHeading eyebrow="SÉJOURS AU MAROC" title="Des lieux pour se retrouver." text="Résidences et villas, montagne et littoral : des cadres variés pour transformer les congés en moments précieux."/><span className="avantages-side-note">UNE SÉLECTION ÉVOLUTIVE · SELON LES SAISONS</span></div>
    <div className="avantages-residence-grid">{residences.map((r,i)=><figure className={`avantages-photo-card ${i===0?'avantages-photo-featured':''}`} key={r.photo}><img src={`${media}${r.photo}`} alt={r.alt} loading="lazy" decoding="async"/><figcaption><span className="eyebrow">0{i+1} / SÉJOURS</span><h3>{r.name}</h3><p>{r.desc}</p></figcaption></figure>)}</div>
    <p className="fine-print">Photographies d’illustration fournies pour le projet. Les lieux ne constituent pas une liste nominative de partenaires ; offres et disponibilités à confirmer.</p>
  </div></section>

  <section className="section avantages-destinations"><div className="container">
    <SectionHeading eyebrow="VOYAGES & DÉCOUVERTES" title="Des horizons qui inspirent." text="Des escapades culturelles aux séjours spirituels, chaque programme s’étudie avec le soin apporté à la préparation et à l’accompagnement."/>
    <div className="avantages-destination-grid">{destinations.map(d=><article className="avantages-destination" key={d.photo}><div className="avantages-destination-image"><img src={`${media}${d.photo}`} alt={d.alt} loading="lazy" decoding="async"/></div><div className="avantages-destination-copy"><span className="eyebrow">{d.eyebrow}</span><h3>{d.name}</h3><p>{d.desc}</p><Link href="/contact" className="text-link">Étudier un séjour <ArrowUpRight size={16}/></Link></div></article>)}</div>
    <p className="fine-print">Voyages proposés sur étude préalable, sous réserve de disponibilité et de confirmation. Aucun départ ni tarif n’est annoncé sur cette page.</p>
  </div></section>

  <section className="avantages-kids"><div className="container avantages-kids-grid"><div className="avantages-kids-photo"><img src={`${media}ifrane-hiver.webp`} alt="Affiche de campagne illustrant des activités hivernales encadrées pour enfants à Ifrane" loading="lazy" decoding="async"/></div><div className="avantages-kids-copy"><span className="eyebrow">POUR LES ENFANTS DES COLLABORATEURS</span><h2>Leurs vacances.<br/><em>Leurs plus belles aventures.</em></h2><p>Avec Wander Kids & Juniors, les vacances deviennent des moments de découverte : activités de nature, loisirs saisonniers et séjours organisés pour les jeunes.</p><div className="avantages-kids-mini"><img src={`${media}loisirs-aquatiques.webp`} alt="Parc aquatique avec bassins et toboggans" loading="lazy"/><p><strong>De l’hiver à l’été</strong> · Ifrane, montagne, loisirs et programmes adaptés à l’âge des participants.</p></div><Link className="btn btn-outline" href="/kids-juniors">Découvrir Kids & Juniors <ArrowRight size={16}/></Link></div></div></section>

  <section className="section avantages-jeudi"><div className="container avantages-jeudi-inner"><div><span className="eyebrow">LE RENDEZ-VOUS DES COLLABORATEURS</span><h2>Le jeudi, <em>l’évasion se prépare.</em></h2><p>« Jeudi Promo » : un rendez-vous pour mettre en lumière des opportunités de séjours selon la saison. Les offres sont communiquées dans le cadre du programme réservé aux collaborateurs.</p><Link href="/contact" className="text-link">Découvrir le programme pour votre entreprise <ArrowUpRight size={16}/></Link></div><div className="avantages-jeudi-visual" aria-label="Illustration typographique du Jeudi Promo"><Gift size={47} strokeWidth={1}/><span>LE RENDEZ-VOUS</span><strong>Jeudi <em>Promo</em></strong><small>UNE NOUVELLE ENVIE DE PARTIR</small></div></div></section>

  <Wow title="Les souvenirs restent" text="Le moment signature Wander : une famille qui se retrouve, un séjour mémorable, une découverte partagée. L’avantage salarié prend alors tout son sens."/>
  <FAQs items={[{question:'À qui s’adresse le programme Avantages Salariés ?',answer:'Aux entreprises souhaitant proposer un programme de voyages et de séjours à leurs collaborateurs. Les modalités sont définies avec Wander.'},{question:'Quels types de séjours sont proposés ?',answer:'Résidences et villas au Maroc, séjours balnéaires, escapades à Istanbul, Omra sur mesure et programmes Kids & Juniors, selon la saison.'},{question:'Le programme nécessite-t-il une gestion quotidienne des RH ?',answer:'Wander présente le dispositif et coordonne les prestations selon la convention convenue avec l’entreprise.'},{question:'Les destinations et les hébergements sont-ils garantis ?',answer:'Non. Toute prestation dépend de la disponibilité et de la confirmation de la proposition.'},{question:'Comment mettre en place le programme dans notre entreprise ?',answer:'Contactez l’équipe Wander pour un échange de cadrage et une proposition adaptée à votre organisation.'}]}/>
  <CTASection eyebrow="WANDER / PARTENARIATS ENTREPRISES" title="Offrez à vos équipes l’envie de partir." text="Présentez-nous votre organisation. Notre équipe à Casablanca vous accompagne dans la mise en place du programme." label="Recevoir mon devis sous 24h" href="/contact"/>
</>}
