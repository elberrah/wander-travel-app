import { clients, partnerCategories, hotelPartners, type PartnerGroup } from '@/lib/references-data';
import { SectionHeading } from '@/components/site/sections';

// Les références avec logo passent en premier, l'ordre du fichier est conservé dans chaque groupe.
const withLogoFirst = <T extends { logo?: string }>(items: T[]) => [...items.filter((i) => i.logo), ...items.filter((i) => !i.logo)];

function LogoMark({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className='logo-mark'>
      {logo ? <img src={logo} alt={name} loading='lazy' decoding='async' /> : <strong>{name}</strong>}
    </div>
  );
}

export function ClientReferences() {
  return (
    <section className='section section-cream references-section' aria-labelledby='references-title'>
      <div className='container'>
        <div className='split-heading'>
          <div className='section-heading'>
            <span className='eyebrow'>ILS NOUS FONT CONFIANCE</span>
            <h2 id='references-title'>Des références qui parlent.</h2>
            <p>Groupes internationaux, institutions et grandes écoles nous confient leurs événements, leurs déplacements et leurs moments d’exception.</p>
          </div>
          <span className='small-overline'>{clients.length} RÉFÉRENCES / CLIENTS ACTIFS</span>
        </div>
        <ul className='ref-grid'>
          {withLogoFirst(clients).map((c) => (
            <li key={c.name} className='ref-card'>
              <LogoMark name={c.name} logo={c.logo} />
              <span>{c.sector}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PartnerTiles({ items, className = '' }: { items: PartnerGroup[]; className?: string }) {
  return (
    <ul className={`partner-tiles ${className}`}>
      {withLogoFirst(items).map((p) => (
        <li key={p.name} className='partner-tile'>
          <LogoMark name={p.name} logo={p.logo} />
          <span>{p.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export function PartnerNetwork() {
  return (
    <section className='section partners-section' aria-labelledby='partners-title'>
      <div className='container'>
        <SectionHeading
          eyebrow='L’ÉCOSYSTÈME D’EXCELLENCE'
          title='Un réseau de partenaires d’exception.'
          text='Compagnies aériennes, services aéroportuaires, hospitalité sportive et grandes maisons hôtelières : un réseau sélectionné pour garantir le même niveau d’exigence, partout.'
        />
        <div className='partners-grid'>
          {partnerCategories.map((cat) => (
            <article key={cat.id} className={`partner-card partner-${cat.id}`}>
              <h3>{cat.title}</h3>
              <p>{cat.intro}</p>
              <PartnerTiles items={cat.items} />
            </article>
          ))}
        </div>
        <article className='partner-card partner-hotels'>
          <div className='partner-hotels-head'>
            <h3>Hôtellerie de luxe</h3>
            <p>Palaces et maisons d’exception au Maroc, à Paris, à Londres et dans le monde.</p>
          </div>
          <PartnerTiles items={hotelPartners} className='hotel-tiles' />
        </article>
      </div>
    </section>
  );
}
