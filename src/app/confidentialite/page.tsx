import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

// Page publique (sans connexion) : exigée par Google pour la connexion « Continuer avec Google ».
export const metadata: Metadata = {
  title: "Politique de confidentialité | Wander Travel & Event",
  description: "Comment Wander Travel & Event collecte, utilise et protège vos données personnelles.",
};

const UPDATED = "13 octobre 2026";

export default function ConfidentialitePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(197,160,89,0.08),transparent_55%)] pointer-events-none" />
      <div className="relative mx-auto w-full max-w-3xl px-4 py-12 sm:px-10 md:py-20">
        <Link href="/" aria-label="Wander Travel & Event — accueil" className="group inline-flex flex-col mb-14">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-white leading-none transition-colors group-hover:text-primary">WANDER</span>
          <span className="text-primary text-[9px] md:text-[10px] font-bold tracking-[0.5em] uppercase mt-1.5 opacity-80">Travel &amp; Event</span>
        </Link>

        <span className="block text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Données personnelles</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">Politique de confidentialité</h1>
        <p className="text-white/40 text-sm mb-12">Dernière mise à jour : {UPDATED}</p>

        <div className="space-y-10 text-white/70 font-light leading-relaxed">
          <Section title="1. Qui sommes-nous ?">
            <p>
              La plateforme privée Wander (espace membres et plateforme Avantages Salariés) est éditée par
              <strong className="text-white font-medium"> Wander Travel &amp; Event</strong>, agence de voyages corporate et
              d&apos;événementiel MICE basée à Casablanca, Maroc, responsable du traitement de vos données.
            </p>
            <p>
              Contact : <Mail /> · +212 702 093 107 ·{" "}
              <a className="text-primary hover:text-white" href="https://www.wandertravel-event.com" target="_blank" rel="noopener noreferrer">www.wandertravel-event.com</a>
            </p>
            <p>
              Les traitements sont réalisés conformément à la loi marocaine n° 09-08 relative à la protection des personnes
              physiques à l&apos;égard du traitement des données à caractère personnel.
            </p>
          </Section>

          <Section title="2. Données que nous collectons">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white font-medium">Compte</strong> : prénom, nom, adresse email, entreprise (facultatif), mot de passe — stocké uniquement sous forme chiffrée irréversible (hachage), jamais en clair.</li>
              <li><strong className="text-white font-medium">Connexion avec Google</strong> : si vous choisissez ce mode, Google nous transmet votre nom, votre adresse email (et son statut de vérification) et, le cas échéant, votre photo de profil. Nous ne recevons jamais votre mot de passe Google et n&apos;accédons ni à votre messagerie, ni à vos contacts, ni à vos fichiers.</li>
              <li><strong className="text-white font-medium">Sécurité</strong> : adresse IP, type de navigateur, date des connexions, nécessaires à la protection des comptes (sessions, limitation des tentatives de connexion).</li>
              <li><strong className="text-white font-medium">Demandes</strong> : les informations que vous saisissez pour une offre (dates, voyageurs, préférences) afin que nos conseillers y répondent.</li>
            </ul>
          </Section>

          <Section title="3. Pourquoi nous les utilisons">
            <ul className="list-disc pl-5 space-y-2">
              <li>Créer et sécuriser votre compte, vous identifier et vous donner accès aux espaces autorisés ;</li>
              <li>Vous envoyer les emails indispensables au compte (confirmation d&apos;adresse, réinitialisation du mot de passe) ;</li>
              <li>Traiter vos demandes de voyages, séjours et avantages, et vous recontacter à leur sujet ;</li>
              <li>Prévenir la fraude et les accès non autorisés.</li>
            </ul>
            <p>
              Ces traitements reposent sur votre consentement et sur l&apos;exécution du service que vous demandez.
              Nous ne vendons ni ne louons vos données, et ne les utilisons pas à des fins publicitaires.
            </p>
          </Section>

          <Section title="4. Données reçues de Google">
            <p>
              L&apos;utilisation par Wander des informations reçues des API Google respecte la{" "}
              <a className="text-primary hover:text-white" href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
                Google API Services User Data Policy
              </a>
              , y compris les exigences de « Limited Use ». Ces informations servent uniquement à vous identifier sur la
              plateforme ; elles ne sont ni partagées, ni transférées à des tiers, ni utilisées pour entraîner des modèles
              d&apos;intelligence artificielle. Les jetons d&apos;accès Google sont conservés chiffrés.
            </p>
          </Section>

          <Section title="5. Qui y a accès">
            <p>
              Uniquement l&apos;équipe Wander habilitée, et nos prestataires techniques agissant sur nos instructions :
              hébergement de l&apos;application et de la base de données (Vercel, Neon), envoi des emails de service, et Google
              si vous utilisez la connexion Google. Certains de ces prestataires hébergent les données hors du Maroc
              (notamment aux États-Unis), avec des garanties de sécurité et de confidentialité contractuelles.
            </p>
          </Section>

          <Section title="6. Durée de conservation">
            <ul className="list-disc pl-5 space-y-2">
              <li>Compte : tant qu&apos;il est actif ; supprimé sur simple demande ou après 3 ans sans connexion ;</li>
              <li>Sessions de connexion : 7 jours maximum ; liens de confirmation et de réinitialisation : 24 h et 1 h ;</li>
              <li>Demandes : durée nécessaire à leur traitement et aux obligations comptables et légales.</li>
            </ul>
          </Section>

          <Section title="7. Cookies">
            <p>
              Un cookie de session strictement nécessaire (sécurisé, inaccessible au JavaScript) vous maintient connecté.
              Une mesure d&apos;audience (Google Analytics) peut être utilisée pour améliorer le service. La plateforme
              conserve aussi dans votre navigateur vos préférences et votre panier de demandes.
            </p>
          </Section>

          <Section title="8. Sécurité">
            <p>
              Connexions chiffrées (HTTPS), mots de passe hachés, confirmation obligatoire de l&apos;adresse email, limitation
              des tentatives de connexion, contrôle des droits côté serveur et fermeture des sessions à chaque changement de
              mot de passe.
            </p>
          </Section>

          <Section title="9. Vos droits">
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression de vos données,
              ainsi que du retrait de votre consentement. Écrivez-nous à <Mail /> : nous répondons sous 30 jours. Vous pouvez
              aussi retirer l&apos;accès de Wander à votre compte Google depuis{" "}
              <a className="text-primary hover:text-white" href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">myaccount.google.com/permissions</a>.
              En cas de désaccord, vous pouvez saisir la CNDP (Commission nationale de contrôle de la protection des données à
              caractère personnel) —{" "}
              <a className="text-primary hover:text-white" href="https://www.cndp.ma" target="_blank" rel="noopener noreferrer">www.cndp.ma</a>.
            </p>
          </Section>

          <Section title="10. Modifications">
            <p>Toute modification de cette politique est publiée sur cette page, avec sa date de mise à jour.</p>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm">
          <Link href="/connexion" className="font-semibold text-primary hover:text-white">Accéder à mon espace</Link>
          <a href="https://www.wandertravel-event.com" className="text-white/50 hover:text-white" target="_blank" rel="noopener noreferrer">wandertravel-event.com</a>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}

function Mail() {
  return <a className="text-primary hover:text-white" href="mailto:contact@wandertravel-event.com">contact@wandertravel-event.com</a>;
}
