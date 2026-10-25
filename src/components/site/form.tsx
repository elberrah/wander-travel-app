'use client';
import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE } from '@/lib/site-data';
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';
const types=['Séminaire / événement d’entreprise','Team building','Incentive / voyage de récompense','Voyages d’affaires & billetterie','Avantages Salariés','Hébergement cadres (villas & résidences)','Kids & Juniors / Scolaire','Autre projet'];
const labels:Record<string,string>={nom:'Nom',entreprise:'Entreprise',contact:'E-mail / téléphone',type_projet:'Projet',details:'Période & participants',message:'Message'};

function buildMessage(data:FormData){
 const lines=Object.keys(labels).map(k=>`${labels[k]} : ${String(data.get(k)||'Non précisé')}`);
 return `Bonjour Wander, je souhaite recevoir un devis.\n\n${lines.join('\n')}`;
}

export function QuoteForm({compact=false}:{compact?:boolean}){
 const [loading,setLoading]=useState(false);const [success,setSuccess]=useState(false);const [error,setError]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const data=new FormData(form);if(data.get('website'))return;
 if(!endpoint){
   // Pas de service de réception configuré : la demande part directement sur le WhatsApp de Wander, préremplie.
   const url=`https://wa.me/${SITE.telephone.replace('+','')}?text=${encodeURIComponent(buildMessage(data))}`;
   window.gtag?.('event','generate_lead',{lead_source:'formulaire_whatsapp'});
   window.open(url,'_blank','noopener,noreferrer');
   setSuccess(true);form.reset();return;
 }
 setError('');setLoading(true);
 try { const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});clearTimeout(timer);if(!response.ok)throw new Error('Envoi impossible');setSuccess(true);form.reset();window.gtag?.('event','generate_lead',{lead_source:'formulaire'});}
 catch {setError('Votre demande n’a pas pu être envoyée. Écrivez-nous sur WhatsApp ou à '+SITE.email+'.')}finally{setLoading(false)}
 }
 return <div className='form-shell'>{success?<div className='form-success' role='status'><CheckCircle2 size={35}/><h3>Merci, votre demande est prête.</h3><p>{endpoint?'Votre demande nous est bien parvenue.':'WhatsApp s’est ouvert avec votre demande préremplie : il vous suffit de l’envoyer.'} Vous recevez votre devis personnalisé sous 24h ouvrées.</p><p><a className='text-link' href={SITE.calendly} target='_blank' rel='noopener noreferrer'>Ou réservez un appel découverte <ArrowUpRight size={14}/></a></p><button className='text-link' onClick={()=>setSuccess(false)}>Faire une nouvelle demande</button></div>:<form onSubmit={submit} className='quote-form'><div className='form-heading'><span className='eyebrow'>DEVIS PERSONNALISÉ SOUS 24H</span><h2>{compact?'Parlons de votre projet.':'Recevez votre devis sous 24h.'}</h2><p>Six informations suffisent. Programme clé en main, un seul interlocuteur.</p></div><div className='form-grid'>
 <label>Nom et prénom <input name='nom' required placeholder='Nom et prénom' autoComplete='name'/></label>
 <label>Entreprise <input name='entreprise' required placeholder='Votre organisation' autoComplete='organization'/></label>
 <label>E-mail ou téléphone <input name='contact' required placeholder='vous@entreprise.ma ou +212 …' autoComplete='email'/></label>
 <label>Type de projet <select name='type_projet' required defaultValue=''><option value='' disabled>Choisissez</option>{types.map(t=><option key={t}>{t}</option>)}</select></label>
 <label className='form-full'>Période et nombre de participants <input name='details' placeholder='Ex. mars 2027 · 80 personnes'/></label>
 <label className='form-full'>Votre message (facultatif) <textarea name='message' rows={3} placeholder='Ville souhaitée, objectifs, contraintes…'/></label>
 <label className='hidden-honeypot' aria-hidden='true'>Ne pas renseigner ce champ<input type='text' name='website' tabIndex={-1} autoComplete='off'/></label>
 <label className='form-consent form-full'><input type='checkbox' name='consentement' value='oui' required/><span>J’accepte que Wander utilise ces informations uniquement pour répondre à ma demande, conformément à sa <a href='/confidentialite'>politique de confidentialité</a>.</span></label>
 </div>{error&&<p className='form-error' role='alert'><AlertCircle size={16}/>{error}</p>}<button className='btn btn-gold form-submit' type='submit' disabled={loading}>{loading?'Envoi en cours…':SITE.ctaDevis} <ArrowUpRight size={17}/></button><p className='form-direct'>Vous préférez échanger ? <a target='_blank' rel='noopener noreferrer' href={SITE.calendly}>Réserver un appel</a> · <a target='_blank' rel='noreferrer' href={SITE.whatsapp}>WhatsApp</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></form>}</div>
}
