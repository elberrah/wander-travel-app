import type {Metadata} from 'next';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, HeartHandshake, Camera, Sun, MountainSnow, Waves, UtensilsCrossed } from 'lucide-react';
import { PageHero, SectionHeading, Wow, CTASection, FAQs } from '@/components/site/sections';

export const metadata:Metadata={
  title:'Colonies de vacances au Maroc | Wander Kids & Juniors',
  description:'Colonies et séjours de 7 à 17 ans pour les enfants des collaborateurs : nature, loisirs, découverte et encadrement attentif avec Wander au Maroc.',
  openGraph:{title:'Wander Kids & Juniors — Colonies et séjours encadrés', description:'Des séjours de vacances pour les enfants et adolescents des collaborateurs d’entreprises partenaires.'}
};

const media='/media/kids/';
const activities=[
 {img:'aire-loisirs-littoral.webp',alt:'Vue aérienne d’une aire de jeux gonflables en bord de plage',label:'01 / VACANCES AU GRAND AIR',title:'Plage & jeux en plein air',text:'Des temps de mouvement et de découverte pour profiter du littoral et de la vie en groupe.'},
 {img:'parc-aquatique-vue-aerienne.webp',alt:'Vue aérienne d’un parc aquatique et de ses toboggans',label:'02 / LOISIRS SAISONNIERS',title:'Parcs aquatiques & loisirs',text:'Des activités récréatives à intégrer aux programmes selon l’âge et les conditions de chaque séjour.'},
 {img:'paysage-nature.webp',alt:'Vue de montagnes et de nature au Maroc',label:'03 / NATURE & MONTAGNE',title:'Découvrir, marcher, s’émerveiller',text:'Sorties nature, découverte du patrimoine et activités de montagne selon la destination et la saison.'},
 {img:'repas-sejour.webp',alt:'Repas servi dans un espace de restauration',label:'04 / VIE COLLECTIVE',title:'Les petits moments qui comptent',text:'Repas, temps calmes et vie de groupe : un rythme équilibré est essentiel à l’expérience.'},
];
const destinations=[
 {title:'Agadir',detail:'Océan, activités de plage & loisirs'},
 {title:'Fès & Ifrane',detail:'Nature, découverte & séjours hivernaux'},
 {title:'Essaouira',detail:'Océan, arts & découvertes'},
 {title:'Asilah',detail:'Littoral, créativité & culture'},
];

export default function Kids(){return <>
  <PageHero eyebrow="WANDER / KIDS & JUNIORS" title="Leurs vacances." italic="Leurs grandes aventures." description="Des colonies et séjours de vacances pensés pour les enfants et adolescents des collaborateurs de nos entreprises partenaires. De 7 à 17 ans, découvrir, partager et gagner en autonomie, dans un cadre organisé." image={`${media}aire-loisirs-littoral.webp`} imageAlt="Vue aérienne d’une aire de loisirs en bord de plage au Maroc" cta="Préparer un séjour" height="large"/>

  <section className="section kids-intro" id="decouvrir"><div className="container">
    <SectionHeading eyebrow="WANDER KIDS & JUNIORS" title="Des vacances à vivre pleinement." text="Wander conçoit des programmes de loisirs et de découverte qui associent nouvelles expériences, vie collective et attention portée à chaque tranche d’âge."/>
    <div className="kids-ages">
      <article><span className="eyebrow">LES DÉCOUVREURS</span><strong>7—10 <small>ans</small></strong><p>Premiers repères, activités accessibles et petits défis collectifs.</p></article>
      <article><span className="eyebrow">LES EXPLORATEURS</span><strong>11—14 <small>ans</small></strong><p>Curiosité, nouvelles amitiés et aventures adaptées.</p></article>
      <article><span className="eyebrow">LES JUNIORS</span><strong>15—17 <small>ans</small></strong><p>Autonomie, initiatives et projets d’équipe.</p></article>
    </div>
  </div></section>

  <section className="section kids-activities section-cream"><div className="container">
    <SectionHeading eyebrow="ACTIVITÉS & EXPERIENCES" title="Chaque jour, une nouvelle histoire." text="Des activités sélectionnées en fonction de l’âge, du lieu, de la météo et des conditions d'encadrement. Les visuels ci-dessous illustrent des formats possibles, non des prestations garanties pour chaque session."/>
    <div className="kids-activities-grid">{activities.map((it,i)=><article className={`kids-activity ${i===0?'kids-activity-large':''}`} key={it.img}>
       <div className="kids-activity-media"><img src={`${media}${it.img}`} alt={it.alt} loading="lazy" decoding="async"/></div>
       <div className="kids-activity-copy"><span className="eyebrow">{it.label}</span><h3>{it.title}</h3><p>{it.text}</p></div>
    </article>)}</div>
    <p className="fine-print">Images d’illustration ; lieux, activités et disponibilités définis dans le programme de chaque session. Aucun nom d’établissement ni image reconnaissable d’enfant n’est publié ici.</p>
  </div></section>

  <section className="section kids-destinations"><div className="container">
    <SectionHeading eyebrow="DESTINATIONS AU MAROC" title="Quatre univers à explorer." text="Des idées de séjours adaptées aux vacances scolaires et aux projets des entreprises partenaires, selon les calendriers confirmés."/>
    <div className="destination-strip">{destinations.map((x,i)=><article key={x.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{x.title}</h3><p>{x.detail}</p></article>)}</div>
  </div></section>

  <section className="section section-cream kids-reassurance"><div className="container">
    <SectionHeading eyebrow="LA TRANQUILLITÉ DES PARENTS" title="Des aventures. Un cadre rassurant." text="L’organisation et la communication avec les familles font partie intégrante du programme."/>
    <div className="icon-grid">
      <article><ShieldCheck/><h3>Encadrement adapté</h3><p>Des équipes et modalités de supervision définies selon l’âge, les activités et les exigences de chaque session.</p></article>
      <article><HeartHandshake/><h3>Suivi & bien-être</h3><p>Dispositif de suivi médical, contacts d’urgence et conditions d’assurance détaillés avant le départ.</p></article>
      <article><Camera/><h3>Des nouvelles en privé</h3><p>Informations aux familles via un canal privé, avec accès limité et autorisations relatives aux images.</p></article>
    </div>
  </div></section>

  <Wow title="Leur fierté, notre plus beau souvenir" text="Un défi relevé ensemble, une découverte inattendue, une amitié née pendant le séjour : ces expériences qui aident les jeunes à prendre confiance en eux."/>

  <section className="section kids-session"><div className="container kids-session-grid">
    <div><span className="eyebrow">PREMIÈRE SESSION ANNONCÉE · HIVER 2027</span><h2>Ifrane, du 24 au 31 janvier 2027.</h2><p>Une semaine autour de la découverte de la nature et de la vie collective. Programme, encadrement, transport, conditions d’accès et disponibilités à confirmer avant toute inscription.</p>
    <div className="hero-buttons"><Link href="/contact?profil=entreprise" className="btn btn-gold">Je suis DRH / CSE <ArrowUpRight size={16}/></Link><Link href="/contact?profil=parent" className="btn btn-outline">Je suis parent <ArrowUpRight size={16}/></Link></div></div>
    <div className="kids-session-art" aria-label="Illustration typographique de l’hiver à Ifrane"><MountainSnow size={51} strokeWidth={1.1}/><span>RENDEZ-VOUS HIVER</span><strong>Ifrane <em>2027</em></strong><small>24 — 31 JANVIER</small></div>
  </div></section>

  <FAQs items={[
    {question:'À qui s’adressent les programmes Kids & Juniors ?',answer:'Aux enfants et adolescents de 7 à 17 ans des collaborateurs des entreprises partenaires, selon les conditions de chaque session.'},
    {question:'Quelles activités sont proposées ?',answer:'Selon le lieu et la saison : activités de nature, découverte, loisirs collectifs, plage ou sorties aquatiques lorsque les conditions d’encadrement le permettent.'},
    {question:'Comment les familles reçoivent-elles des informations ?',answer:'Un canal de communication privé peut être mis en place pour les parents autorisés. Les photos ne sont partagées que dans le respect des autorisations et du droit à l’image.'},
    {question:'Quelles garanties sont prévues pour la sécurité ?',answer:'Les effectifs d’encadrement, procédures sanitaires, assurances et contacts d’urgence figurent dans le dossier de chaque séjour et doivent être confirmés avant inscription.'},
    {question:'La session Ifrane est-elle déjà ouverte à l’inscription ?',answer:'Les dates annoncées sont du 24 au 31 janvier 2027. Les places, activités et modalités d’inscription restent à confirmer auprès de Wander.'},
  ]}/>
  <CTASection eyebrow="WANDER / ENFANTS DES COLLABORATEURS" title="Faisons de leurs vacances une aventure." text="Entreprise partenaire ou parent : présentez-nous votre besoin pour recevoir les informations adaptées à votre situation." label="Parler à l’équipe Wander" href="/contact"/>
</>}
