import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, BusFront, Compass, GraduationCap, ShieldCheck, Users, Languages } from 'lucide-react';
import { PageHero, SectionHeading, Steps, Wow, FAQs, CTASection } from '@/components/site/sections';

export const metadata: Metadata = {
  title: 'Voyages scolaires éducatifs au Maroc | Wander Scolaire',
  description: 'Wander Travel & Event conçoit avec les écoles privées des voyages scolaires au Maroc, des séjours culturels et des découvertes équestres. Étudions votre projet.',
  openGraph: {
    title: 'Wander Scolaire — Le voyage comme expérience éducative',
    description: 'Voyages éducatifs, découvertes culturelles et activités encadrées au Maroc et à l’international.',
  },
};

const media='/media/scolaire/';
const parcours=[
  {numero:'01',categorie:'MAROC · PATRIMOINE & NATURE',titre:'Découvrir le Maroc autrement',texte:'Villes impériales, nature et savoir-faire : des itinéraires qui mettent les connaissances en mouvement.',photo:'maroc-nature.webp',alt:'Panorama naturel des montagnes marocaines, sans personne identifiable'},
  {numero:'02',categorie:'ESPAGNE · CULTURES CROISÉES',titre:'Andalousie & patrimoine',texte:'Explorer la rencontre des héritages, des arts et de l’architecture dans un parcours culturel accompagné.',photo:'marbella-andalousie.webp',alt:'Ruelle méditerranéenne fleurie, photographie d’illustration pour un programme en Espagne'},
  {numero:'03',categorie:'TURQUIE · CULTURES DU MONDE',titre:'Istanbul, les horizons s’ouvrent',texte:'Un voyage de découverte historique et culturelle, construit autour des objectifs pédagogiques de l’établissement.',photo:'istanbul-patrimoine.webp',alt:'Panorama urbain d’Istanbul et du Bosphore'},
];

export default function Scolaire(){return <>
  <PageHero eyebrow="WANDER / SCOLAIRE" title="Apprendre autrement." italic="Grandir ensemble." description="Des voyages scolaires et des découvertes pédagogiques pensés avec les écoles privées, pour faire du monde une salle de classe ouverte." image={`${media}maroc-nature.webp`} imageAlt="Paysage de montagne au Maroc, visuel d’illustration d’un voyage éducatif" cta="Un programme pour mon école" height="large"/>

  <section className="section scolaire-intro" id="decouvrir"><div className="container">
    <div className="scolaire-intro-grid"><div><span className="eyebrow">UNE AUTRE FAÇON D’APPRENDRE</span><h2>Le voyage donne <em>du sens</em> aux savoirs.</h2></div><p>Un séjour réussi dépasse la simple excursion. Wander coordonne, avec votre équipe pédagogique, un parcours qui associe découverte, rencontres et attention portée à chaque étape du déplacement. Les destinations et activités sont ajustées selon l’âge, le calendrier et les objectifs de l’école.</p></div>
    <div className="scolaire-promise-grid">
      <article><BookOpen aria-hidden="true"/><h3>Une intention pédagogique</h3><p>Chaque expérience part de vos objectifs éducatifs et du niveau des élèves.</p></article>
      <article><BusFront aria-hidden="true"/><h3>Une logistique coordonnée</h3><p>Trajets, étapes, hébergements et déroulé consolidés avec l’établissement.</p></article>
      <article><ShieldCheck aria-hidden="true"/><h3>La sécurité préparée</h3><p>Organisation, encadrement et modalités d’urgence précisés avant départ.</p></article>
    </div>
  </div></section>

  <section className="section section-cream scolaire-destinations"><div className="container">
    <SectionHeading eyebrow="NOS IDÉES DE PROGRAMMES" title="Des horizons qui éveillent la curiosité." text="Quatre pistes de voyage et un format de fin d’études à imaginer ensemble. Les photos illustrent des destinations et ne constituent pas la preuve d’un voyage organisé par Wander."/>
    <div className="scolaire-destination-grid">
      {parcours.map((p,i)=><article key={p.numero} className={`scolaire-destination-card ${i===0?'scolaire-destination-featured':''}`}>
        <div className="scolaire-destination-photo"><img src={`${media}${p.photo}`} alt={p.alt} loading="lazy" decoding="async"/></div>
        <div className="scolaire-destination-copy"><span className="eyebrow">{p.numero} / {p.categorie}</span><h3>{p.titre}</h3><p>{p.texte}</p></div>
      </article>)}
      <article className="scolaire-destination-card scolaire-destination-text">
        <div className="scolaire-destination-copy"><span className="eyebrow">04 / ESPAGNE · LANGUES & OUVERTURE</span><Languages size={35} aria-hidden="true"/><h3>Marbella & immersion linguistique</h3><p>Un format associant pratique linguistique et découverte du quotidien, à préciser avec l’équipe enseignante.</p></div>
        <div className="scolaire-destination-outline">LANGUES · CULTURE · DÉCOUVERTE</div>
      </article>
    </div>
    <div className="scolaire-graduation"><GraduationCap aria-hidden="true"/><div><span className="eyebrow">LE PROGRAMME SUR MESURE</span><h3>Voyage de fin d’études</h3><p>Une expérience de groupe pensée pour marquer une étape et célébrer un parcours, dans la destination choisie avec l’établissement.</p></div><Link href="/contact" className="btn btn-outline">Étudier le programme <ArrowUpRight size={16}/></Link></div>
    <p className="fine-print">Photographies d’illustration. Les destinations, modalités et disponibilités sont proposées sur étude et doivent être confirmées avant réservation.</p>
  </div></section>

  <section className="section scolaire-equitation"><div className="container scolaire-equitation-grid">
    <div className="scolaire-equitation-photos"><img src={`${media}equitation-decouverte.webp`} alt="Activité d’équitation encadrée, illustration sans enfant identifiable" loading="lazy" decoding="async"/><span>EXPÉRIENCES AU GRAND AIR</span></div>
    <div className="scolaire-equitation-copy"><span className="eyebrow">DÉCOUVERTE & NATURE</span><h2>Rencontrer le vivant. <em>Apprendre par l’expérience.</em></h2><p>La découverte du cheval peut donner lieu à une expérience pédagogique autour du respect de l’animal, de la confiance et de l’observation. Les activités équestres sont proposées seulement lorsqu’elles sont adaptées à l’âge du groupe et aux conditions d’encadrement.</p><div className="scolaire-equitation-notes"><div><Compass/><span>Découverte du cheval et de son environnement</span></div><div><Users/><span>Activités adaptées au groupe scolaire</span></div><div><ShieldCheck/><span>Matériel et modalités de sécurité à confirmer</span></div></div><Link href="/contact" className="text-link">Construire une visite avec Wander <ArrowUpRight size={16}/></Link></div>
  </div></section>

  <section className="section section-cream scolaire-organisation"><div className="container"><SectionHeading eyebrow="UN VOYAGE PRÉPARÉ ENSEMBLE" title="L’attention portée à chaque détail." text="L’équipe Wander conçoit le dispositif avec votre établissement. Aucun service de transport, d’accompagnement ou d’assurance n’est annoncé comme automatiquement inclus avant proposition écrite."/><Steps items={[{title:'Le projet',text:'Objectifs éducatifs, tranche d’âge, dates et effectif.'},{title:'La conception',text:'Programme, lieux, transport et faisabilité du parcours.'},{title:'La préparation',text:'Encadrement, autorisations, conditions de sécurité et informations aux familles.'},{title:'Le voyage',text:'Coordination des prestations convenues et suivi du déroulé.'}]}/></div></section>
  <Wow title="Le jour où l’on apprend sans s’en rendre compte" text="Une découverte architecturale, un atelier avec un artisan ou une rencontre avec le monde équestre : l’instant qui transforme une leçon en souvenir durable."/>
  <FAQs items={[{question:'Le programme suit-il nos objectifs pédagogiques ?',answer:'Oui. Le parcours est étudié à partir des objectifs et contraintes transmis par votre équipe enseignante.'},{question:'Quelles destinations peut-on envisager ?',answer:'Le Maroc, l’Andalousie, Istanbul et l’Espagne sont des pistes. Les itinéraires et disponibilités restent à confirmer lors du devis.'},{question:'Comment est organisé l’encadrement des élèves ?',answer:'Les responsabilités, effectifs d’encadrants, conditions de sécurité et autorisations sont définis avec l’établissement avant toute réservation.'},{question:'Peut-on intégrer une activité équestre ?',answer:'Oui, sous réserve de l’âge des élèves, de la faisabilité, des équipements et des exigences de sécurité.'},{question:'Les photos représentent-elles des voyages Wander ?',answer:'Non. Les photographies de cette page illustrent des types de destinations et d’activités, sans identifier d’élève ou de client.'}]}/>
  <CTASection eyebrow="WANDER SCOLAIRE · CASABLANCA" title="Leur prochain voyage commence avec votre projet pédagogique." text="Dites-nous ce que vous souhaitez faire découvrir à vos élèves. Nous étudierons le programme avec votre établissement." label="Demander un programme scolaire"/>
</>}
