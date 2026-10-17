import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {PageHero,SectionHeading,Wow,CTASection,FAQs} from '@/components/site/sections';
import {packages,tiers} from '@/lib/site-data';

export const metadata:Metadata={
 title:'Agence MICE à Casablanca | Séminaires & événements Wander',
 description:'Séminaires, conventions, team building, incentives, galas et six formats MICE conçus au Maroc par Wander Travel & Event.',
 alternates:{canonical:'/mice'}
};

const medias=[
 {src:'/media/mice/salle-direction.webp',alt:'Salle de réunion aménagée pour un comité de direction',label:'Salles & réunions',detail:'Comités de direction, workshops et décisions stratégiques'},
 {src:'/media/mice/montage-evenement.webp',alt:'Équipe organisant la mise en place d’un espace événementiel Wander',label:'Production événementielle',detail:'Logistique, mise en place, régie et coordination sur site'}
];
const moments=[
 {src:'/media/mice/team-day.webp',alt:'Visuel illustratif d’un groupe de collègues dans un jardin',title:'Cohésion & team building',text:'Créer du lien au-delà des réunions habituelles',illustration:true},
 {src:'/media/mice/equitation.webp',alt:'Visuel illustratif d’une activité d’équitation en groupe',title:'Équitation corporate',text:'Partager une expérience autour du cheval',illustration:true},
 {src:'/media/mice/golf.webp',alt:'Parcours de golf en pleine nature',title:'Golf & rencontres',text:'Changer de rythme et faire place aux échanges',illustration:false},
 {src:'/media/mice/leadership-retreat.webp',alt:'Campement dans le désert à la nuit tombée',title:'Désert & reconnexion',text:'Une expérience au grand air, pensée dans ses moindres détails',illustration:false}
];

export default function MICE(){return <>
<PageHero eyebrow='WANDER MICE / L’ART DU COLLECTIF' title='Des événements qui donnent' italic='du sens au collectif.' description='Séminaires, conventions, team building, incentives, lancements et galas : des expériences sur mesure, imaginées à Casablanca et orchestrées partout au Maroc.' image='/media/mice/hero-wander-evenement.webp' imageAlt='Installation événementielle au coucher du soleil, avec un espace d’accueil Wander' />
<section className='section' id='decouvrir'><div className='container'>
<SectionHeading eyebrow='ESPACES & ÉVÉNEMENTS' title='Un lieu juste. Une mise en scène qui compte.' text='Des comités de direction aux conventions de grande ampleur, le lieu, la scénographie et l’accueil servent un seul objectif : faire vivre votre message.' />
<div className='mice-space-grid'>{medias.map(m=><article className='mice-space' key={m.src}><div className='mice-space-photo'><img src={m.src} alt={m.alt} loading='lazy'/></div><div className='mice-space-info'><span className='eyebrow'>WANDER / EXPERTISE</span><h3>{m.label}</h3><p>{m.detail}</p></div></article>)}</div>
</div></section>
<section className='section section-cream'><div className='container'><SectionHeading eyebrow='SIX SIGNATURES WANDER' title='Le bon format. Au bon moment.' text='Six expériences distinctes, chacune déclinable en Silver, Gold et Platinum. Choisissez votre intention, nous en construirons le programme.' />
<div className='mice-cards'>{packages.map(p=><Link href={`/mice/${p.slug}`} className='mice-card' key={p.slug}><div className='mice-card-photo' style={{backgroundImage:`url("${p.hero}")`}}/><span className='mice-number'>{p.number}</span><div className='mice-card-body'><span className='eyebrow'>{p.signature}</span><h3>{p.title}</h3><p>{p.tagline}</p><div className='mice-card-footer'><span>{p.duration} · {p.participants}</span><ArrowUpRight size={22}/></div></div></Link>)}</div>
</div></section>
<section className='section'><div className='container'><SectionHeading eyebrow='EXPÉRIENCES SUR MESURE' title='Des expériences qui se vivent, pas seulement qui se racontent.' text='Une activité, un dîner, un temps de respiration : le moment signature prend forme selon votre culture et vos objectifs.' />
<div className='mice-experience-grid'>{moments.map(m=><figure className='mice-experience' key={m.src}><div className='mice-experience-photo'><img src={m.src} alt={m.alt} loading='lazy'/></div><figcaption><h3>{m.title}</h3><p>{m.text}</p>{m.illustration&&<small>Visuel d’ambiance illustratif</small>}</figcaption></figure>)}</div>
</div></section>
<section className='section section-cream'><div className='container'><SectionHeading eyebrow='SILVER · GOLD · PLATINUM' title='Trois niveaux d’accompagnement.' text='Des repères de prestation, affinés à la taille du groupe, à la durée et aux disponibilités.'/><div className='tier-grid'>{tiers.map((t,i)=><article key={t.name} className={`tier ${i===2?'tier-highlight':''}`}><span className='tier-index'>0{i+1}</span><h3>{t.name}</h3><p>{t.eyebrow}</p><ul>{t.features.map(f=><li key={f}>{f}</li>)}</ul><Link href='/contact?projet=Wander%20MICE' className='underlined-link'>Recevoir une proposition chiffrée <ArrowUpRight size={16}/></Link></article>)}</div><p className='fine-print'>Tarifs sur devis, sous réserve de disponibilité et de confirmation.</p></div></section>
<Wow title='Le détail qui devient souvenir' text='Un dîner sous les étoiles, une révélation scénographique, une expérience de reconnexion inattendue : chaque programme peut accueillir son moment signature.'/>
<section className='section'><div className='container mice-backstage-grid'><div className='mice-backstage-photo'><img src='/media/mice/montage-evenement.webp' alt='Équipe Wander préparant un espace événementiel' loading='lazy'/></div><div className='mice-backstage-copy'><SectionHeading eyebrow='L’EXÉCUTION WANDER' title='Avant le moment waouh, il y a la précision.' text='Conception, coordination, accueil, technique, implantation et gestion des imprévus : notre travail se mesure à la fluidité de l’expérience de vos invités.'/><Link className='btn btn-outline' href='/realisations'>Découvrir nos réalisations <ArrowUpRight size={16}/></Link></div></div></section>
<FAQs items={[{question:'Quels événements MICE organisez-vous ?',answer:'Séminaires, team building, conventions, incentives, lancements de produits, retraites de leadership et soirées de reconnaissance.'},{question:'Les packages Silver, Gold et Platinum sont-ils personnalisables ?',answer:'Oui, chaque niveau sert de base et les prestations sont ajustées selon votre besoin et les disponibilités.'},{question:'Intervenez-vous en dehors de Casablanca ?',answer:'Oui, nous pouvons concevoir et coordonner des programmes partout au Maroc selon le projet.'},{question:'Peut-on intégrer l’équitation ou le golf ?',answer:'Oui, sous réserve du lieu, de l’encadrement adapté et des disponibilités.'}]}/>
<CTASection title='Réunissons les conditions de l’exceptionnel.' label='Demander votre proposition MICE'/>
</>}
