'use client';
import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE } from '@/lib/site-data';
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';
const types=['Wander MICE','Avantages Salariés','Kids & Juniors','Wander Scolaire','Triangle d’Or','Voyage corporate','Autre projet'];
export function QuoteForm({compact=false}:{compact?:boolean}){
 const [loading,setLoading]=useState(false);const [success,setSuccess]=useState(false);const [error,setError]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const data=new FormData(form);if(data.get('website'))return;
 if(!endpoint){
   const fields=['nom','fonction','entreprise','email','telephone','type_projet','participants','periode','budget','message'];
   const body=fields.map(k=>`${k.replaceAll('_',' ')} : ${String(data.get(k)||'Non précisé')}`).join('\n');
   const subject=encodeURIComponent('Demande de proposition Wander — '+String(data.get('type_projet')||'Projet'));
   const mail=`mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(body+'\n\nEnvoyé volontairement depuis ma messagerie.')}`;
   setError('Votre messagerie va s’ouvrir avec votre demande préremplie. Vérifiez-la puis cliquez sur « Envoyer » dans votre messagerie : cette action ne transmet encore rien à Wander.');
   window.location.href=mail;return;
 }
 setError('');setLoading(true);
 try { const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});clearTimeout(timer);if(!response.ok)throw new Error('Envoi impossible');setSuccess(true);form.reset();if(typeof window!=='undefined')window.gtag?.('event','generate_lead',{lead_source:'formulaire'});}
 catch {setError('Votre demande n’a pas pu être envoyée. Aucun envoi n’a été confirmé. Vous pouvez nous joindre par e-mail ou WhatsApp.')}finally{setLoading(false)}
 }
 return <div className='form-shell'>{success?<div className='form-success' role='status'><CheckCircle2 size={35}/><h3>Votre demande a bien été transmise.</h3><p>Merci. Votre demande a été acceptée par notre service de réception. Notre équipe reviendra vers vous après examen.</p><button className='text-link' onClick={()=>setSuccess(false)}>Faire une nouvelle demande</button></div>:<form onSubmit={submit} className='quote-form'><div className='form-heading'><span className='eyebrow'>UNE PREMIÈRE CONVERSATION</span><h2>{compact?'Parlons de votre projet.':'Concevons votre prochaine expérience.'}</h2><p>Quelques informations suffisent pour orienter notre première proposition.</p></div><div className='form-grid'>
 <label>Votre nom et prénom <input name='nom' required placeholder='Nom et prénom' autoComplete='name'/></label>
 <label>Votre fonction <input name='fonction' placeholder='Direction, RH, Achats…' autoComplete='organization-title'/></label>
 <label>Entreprise / établissement <input name='entreprise' required placeholder='Votre organisation' autoComplete='organization'/></label>
 <label>E-mail professionnel <input type='email' name='email' required placeholder='vous@entreprise.ma' autoComplete='email'/></label>
 <label>Téléphone <input type='tel' name='telephone' required placeholder='+212 …' autoComplete='tel'/></label>
 <label>Type de projet <select name='type_projet' required defaultValue=''><option value='' disabled>Choisissez une prestation</option>{types.map(t=><option key={t}>{t}</option>)}</select></label>
 <label>Nombre de participants <input type='number' name='participants' min='1' max='100000' placeholder='Effectif estimé'/></label>
 <label>Période souhaitée <input name='periode' placeholder='Ex. premier trimestre 2027'/></label>
 <label className='form-full'>Budget indicatif <select name='budget' defaultValue=''><option value=''>À définir ensemble</option><option>Moins de 50 000 MAD</option><option>50 000 – 150 000 MAD</option><option>150 000 – 500 000 MAD</option><option>Plus de 500 000 MAD</option></select></label>
 <label className='form-full'>Qu’est-ce qui rend ce projet important maintenant ? <textarea name='message' rows={4} required placeholder='Vos objectifs, vos envies, vos contraintes…'/></label>
 <label className='hidden-honeypot' aria-hidden='true'>Ne pas renseigner ce champ<input type='text' name='website' tabIndex={-1} autoComplete='off'/></label>
 <label className='form-consent form-full'><input type='checkbox' name='consentement' value='oui' required/><span>J’accepte que Wander utilise ces informations uniquement pour répondre à ma demande, conformément à sa <a href='/confidentialite'>politique de confidentialité</a>.</span></label>
 </div>{error&&<p className='form-error' role='alert'><AlertCircle size={16}/>{error}</p>}<button className='btn btn-gold form-submit' type='submit' disabled={loading}>{loading?'Envoi en cours…':endpoint?'Envoyer ma demande':'Préparer mon e-mail'} <ArrowUpRight size={17}/></button>{!endpoint&&<p className='form-mailto-note'>La réception automatique nécessite l’activation du service sécurisé de formulaire. En attendant, ce bouton prépare un e-mail dans votre messagerie, sans envoyer vos données automatiquement.</p>}<p className='form-direct'>Écrivez-nous directement : <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a target='_blank' rel='noreferrer' href={SITE.whatsapp}>WhatsApp</a></p></form>}</div>
}
