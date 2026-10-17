import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, SectionHeading, Steps, Wow, FAQs, CTASection } from '@/components/site/sections';

export const metadata: Metadata = {
  title: 'Voyages Corporate à Casablanca | Wander Travel & Event',
  description: 'Billetterie, transferts avec chauffeur, hôtellerie, Fast Track et aviation privée : Wander coordonne vos voyages professionnels au Maroc.',
};

const media = '/media/corporate/';

const services = [
  ['01', 'Billetterie aérienne', 'Des itinéraires étudiés selon vos priorités, vos contraintes et les agendas de vos équipes.'],
  ['02', 'Transferts avec chauffeur', 'Accueil à l’aéroport, berlines de prestige, vans VIP et coordination des déplacements de groupe.'],
  ['03', 'Fast Track & salons VIP', 'Des solutions d’accueil et de confort en aéroport, proposées selon les conditions locales de disponibilité.'],
  ['04', 'Hôtellerie d’affaires', 'Des hébergements sélectionnés selon la situation, les usages professionnels et le niveau de service recherché.'],
  ['05', 'Aviation privée', 'Étude de solutions aériennes dédiées lorsque flexibilité, confidentialité et rythme l’exigent.'],
  ['06', 'Coordination dédiée', 'Un interlocuteur pour orchestrer les étapes du déplacement, du briefing à la dernière arrivée.'],
];

function PhotoTile({file,alt,label,description,variant = ''}: {file:string;alt:string;label:string;description?:string;variant?:string}) {
 return <figure className={`corporate-photo-tile ${variant}`}>
   <img src={`${media}${file}`} alt={alt} loading="lazy" decoding="async" />
   <figcaption><strong>{label}</strong>{description && <span>{description}</span>}</figcaption>
 </figure>;
}

export default function Corporate() {
 return <>
   <PageHero eyebrow="WANDER / VOYAGES CORPORATE" title="Voyager pour réussir." italic="Nous pensons au reste."
     description="Billetterie, accueil aéroportuaire, chauffeurs, hébergements et aviation privée. Une coordination précise au service de vos déplacements professionnels."
     image={`${media}avion-decollage.webp`} imageAlt="Avion de ligne au décollage au coucher du soleil" cta="Demander un devis voyage" height="large" />

   <section className="corporate-intro" id="decouvrir"><div className="container corporate-intro-inner">
     <div><span className="eyebrow">NOTRE APPROCHE</span><h2>Le bon déplacement.<br/><em>Au bon rythme.</em></h2></div>
     <p>Un déplacement réussi ne se mesure pas seulement à sa destination. Il se reconnaît à la fluidité de l’accueil, à la justesse de l’itinéraire et à l’attention portée aux détails. À Casablanca comme à l’international, Wander vous accompagne avec discrétion.</p>
   </div></section>

   <section className="section corporate-services"><div className="container">
     <SectionHeading eyebrow="UN SEUL INTERLOCUTEUR" title="Vos voyages, sans compromis." text="Six domaines de service complémentaires, combinés selon les exigences de chaque mission." />
     <div className="corporate-service-grid">{services.map(([number,title,text])=><article key={number} className="corporate-service-item"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
   </div></section>

   <section className="section corporate-mobility"><div className="container">
     <SectionHeading eyebrow="TRANSFERTS PRESTIGE" title="Arriver sereinement. Repartir avec élégance." text="Berlines avec chauffeur, vans exécutifs et accueil personnalisé : chaque déplacement s’intègre à votre programme professionnel." />
     <div className="corporate-mobility-grid">
       <PhotoTile variant="corporate-photo-wide" file="flotte-prestige.webp" alt="Berline noire et van haut de gamme stationnés ensemble" label="Une mobilité à votre mesure" description="Véhicules de prestige et coordination des itinéraires" />
       <PhotoTile file="accueil-chauffeur.webp" alt="Chauffeur professionnel ouvrant la porte d’une berline noire" label="Accueil personnalisé" description="Un service attentif dès votre arrivée" />
       <PhotoTile file="van-vip-beige.webp" alt="Sièges en cuir beige à bord d’un van exécutif" label="Vans & groupes VIP" description="Confort lors des déplacements collectifs" />
     </div>
     <p className="corporate-gallery-caption">Visuels transmis pour illustrer les prestations, sous réserve de validation des droits de publication.</p>
   </div></section>

   <section className="corporate-airport"><div className="container corporate-airport-grid">
     <div className="corporate-airport-image"><img src={`${media}salon-aeroport.webp`} alt="Espace salon d’aéroport confortable avec vue sur les pistes" loading="lazy" decoding="async" /></div>
     <div className="corporate-airport-copy"><span className="eyebrow">FAST TRACK & SALONS VIP</span><h2>Votre temps est précieux.<br/><em>Nous le respectons.</em></h2><p>Accueil en aéroport, accompagnement, accès aux salons et parcours privilégiés selon les services disponibles sur place. Parce qu’une mission commence souvent bien avant l’embarquement.</p><Link className="text-link" href="/contact">Organiser un accueil VIP <ArrowUpRight size={18}/></Link></div>
   </div></section>

   <section className="section corporate-hotels"><div className="container">
     <SectionHeading eyebrow="HÔTELLERIE & SÉJOURS PROFESSIONNELS" title="Des adresses choisies pour l’essentiel." text="Séjours de direction, missions individuelles, programmes corporate ou retraites d’équipe : chaque lieu est étudié selon votre destination et votre programme." />
     <div className="corporate-hotels-grid">
       <PhotoTile variant="corporate-hotel-main" file="resort-corporate.webp" alt="Grand resort avec piscine, palmiers et architecture élégante" label="Hôtellerie corporate" description="Confort et qualité du cadre" />
       <PhotoTile file="sejour-ocean.webp" alt="Piscine panoramique bordant l’océan" label="Escapades et séjours" description="Océan et détente" />
       <PhotoTile file="sejour-dakhla.webp" alt="Vue aérienne d’un resort côtier au milieu d’un paysage naturel" label="Séminaires hors les murs" description="Un nouvel horizon pour vos équipes" />
       <PhotoTile file="sejour-atlas.webp" alt="Piscine ouverte sur des collines et montagnes de l’Atlas" label="Retraites de direction" description="Temps de recul et inspiration" />
     </div>
     <p className="corporate-gallery-caption">Photographies d’illustration fournies par Wander ; aucun lien commercial avec les établissements montrés n’est suggéré.</p>
   </div></section>

   <section className="section section-cream"><div className="container">
     <SectionHeading eyebrow="NOTRE MÉTHODE" title="La rigueur qui rend tout plus simple." text="Un parcours clair, du premier brief à la coordination sur le terrain." />
     <Steps items={[{title:'Comprendre votre mission',text:'Dates, destinations, voyageurs, contraintes de temps et attentes de service.'},{title:'Construire la proposition',text:'Une sélection d’options cohérente avec vos priorités et votre budget.'},{title:'Coordonner chaque étape',text:'Billetterie, accueil, transferts, hébergements et prestations spécifiques.'},{title:'Rester à vos côtés',text:'Un interlocuteur pour suivre l’exécution et les ajustements nécessaires.'}]} />
   </div></section>

   <Wow title="Chaque arrivée, un accueil remarquable" text="Vos invités passent de l’avion au véhicule qui les attend, puis à leur rendez-vous, avec un accompagnement discret. Un enchaînement fluide : voilà le luxe qui compte." />
   <FAQs items={[{question:'Pouvez-vous coordonner les déplacements de plusieurs collaborateurs ?',answer:'Oui. L’organisation est étudiée selon les effectifs, les villes, les horaires et les besoins des voyageurs.'},{question:'Proposez-vous des transferts avec chauffeur au Maroc ?',answer:'Oui. Les demandes concernent notamment Casablanca, Rabat, Marrakech, Agadir, Tanger et Fès, selon disponibilité et confirmation.'},{question:'Fast Track et salons VIP sont-ils disponibles partout ?',answer:'Le service dépend de l’aéroport, des conditions d’accès et de la disponibilité au moment de la demande.'},{question:'Peut-on inclure un jet privé dans un déplacement corporate ?',answer:'Wander peut étudier une demande d’aviation privée et proposer une solution adaptée, sous réserve de faisabilité et de confirmation.'},{question:'Les hébergements présentés sont-ils des partenaires identifiés ?',answer:'Les photographies illustrent des types de lieux. Toute proposition d’hébergement fait l’objet d’une sélection et d’une confirmation spécifiques.'}]} />
   <CTASection eyebrow="WANDER TRAVEL & EVENT · CASABLANCA" title="Votre prochain déplacement commence ici." text="Décrivez-nous votre mission. Notre équipe construit une proposition sur mesure." label="Demander un devis voyage" href="/contact" />
 </>;
}
