// Références clients et réseau de partenaires affichés sur la page d'accueil.
// Pour ajouter un nom : une ligne dans le tableau concerné, rien d'autre à toucher.
// Logo : déposer le fichier dans public/media/logos/ puis ajouter  logo: '/media/logos/nom.svg'.
// Sans logo, le nom s'affiche en texte à la place.

export type ClientRef = { name: string; sector: string; logo?: string };

export const clients: ClientRef[] = [
  { name: 'Aramco', logo: '/media/logos/aramco.webp', sector: 'Énergie' },
  { name: 'Richard Mille', logo: '/media/logos/richard-mille.svg', sector: 'Horlogerie de luxe' },
  { name: 'Galeries Lafayette', logo: '/media/logos/galeries-lafayette.svg', sector: 'Retail luxe' },
  { name: 'CGEM', logo: '/media/logos/cgem.webp', sector: 'Institution patronale' },
  { name: 'CIMAT', sector: 'Industrie · Ciment' },
  { name: 'AKSAM Holding', sector: 'Holding' },
  { name: 'Savola', logo: '/media/logos/savola.svg', sector: 'Agroalimentaire' },
  { name: 'Groupe ISCAE', logo: '/media/logos/iscae.webp', sector: 'Enseignement supérieur' },
  { name: 'ENCG', logo: '/media/logos/encg.webp', sector: 'Enseignement supérieur' },
  { name: 'ENSA Tanger', logo: '/media/logos/uae.webp', sector: 'ENSA Tanger · Université Abdelmalek Essaâdi' },
  { name: 'CNDP', logo: '/media/logos/cndp.webp', sector: 'Protection des données' },
  { name: 'Salafin', sector: 'Services financiers' },
  { name: 'SIHAMCO', sector: 'Commerce international' },
  { name: 'Comexi Group', sector: 'Distribution' },
  { name: 'Gromic', sector: 'Distribution' },
  { name: 'Akaram Group', sector: 'Groupe' },
  { name: 'AINSI Maroc', sector: 'Services' },
  { name: 'Pro FM', sector: 'Facility management' },
  { name: 'Mapping Engineering', sector: 'Ingénierie' },
  { name: 'INRA', sector: 'Recherche agronomique' },
  { name: 'ONICL', sector: 'Sécurité alimentaire' },
  { name: 'Agence du Bassin Hydraulique de la Moulouya', sector: 'Infrastructure & environnement' },
  { name: 'Entraide Nationale', sector: 'Soutien & développement' },
];

export type PartnerGroup = { name: string; detail: string; logo?: string };
export type PartnerCategory = { id: string; title: string; intro: string; items: PartnerGroup[] };

export const partnerCategories: PartnerCategory[] = [
  {
    id: 'aerien',
    title: 'Aérien',
    intro: 'Un accès direct aux grandes compagnies, et à 65 transporteurs via Amadeus.',
    items: [
      { name: 'Royal Air Maroc', logo: '/media/logos/royal-air-maroc.svg', detail: 'Compagnie nationale' },
      { name: 'Air France', logo: '/media/logos/air-france.webp', detail: 'Europe & long-courrier' },
      { name: 'Emirates', logo: '/media/logos/emirates.svg', detail: 'Hub de Dubaï' },
      { name: 'Qatar Airways', logo: '/media/logos/qatar-airways.svg', detail: 'Hub de Doha' },
      { name: 'Saudia', logo: '/media/logos/saudia.svg', detail: 'Arabie saoudite' },
      { name: 'Flynas', logo: '/media/logos/flynas.svg', detail: 'Arabie saoudite' },
      { name: 'Royal Jordanian', logo: '/media/logos/royal-jordanian.webp', detail: 'Moyen-Orient' },
      { name: 'Réseau Amadeus', logo: '/media/logos/amadeus.svg', detail: '65 compagnies via GDS' },
    ],
  },
  {
    id: 'aeroport',
    title: 'Aéroport & accueil',
    intro: 'Fast track, meet & greet et salons VIP pour des arrivées sans attente.',
    items: [
      { name: 'NAS Maroc', detail: 'Concessionnaire ONDA · Fast track' },
      { name: 'Marhaba', detail: 'Meet & greet aéroport' },
      { name: 'Advanced Air Support International', detail: 'Salons et services VIP · 18+ destinations' },
    ],
  },
  {
    id: 'sport',
    title: 'Sport & golf',
    intro: 'Hospitalité des grands rendez-vous sportifs et parcours d’exception.',
    items: [
      { name: 'MATCH Hospitality', detail: 'Hospitalité sportive' },
      { name: 'Golf Tour Maroc', detail: 'Réseau de 37 parcours' },
    ],
  },
  {
    id: 'bien-etre',
    title: 'Bien-être',
    intro: 'Des retraites santé et longévité parmi les plus réputées au monde.',
    items: [
      { name: 'Chenot', detail: 'Chenot Palace Weggis · Chenot Palace Gabala · Espace Chenot' },
    ],
  },
];

export const hotelPartners: PartnerGroup[] = [
  { name: 'Royal Mansour', detail: 'Marrakech · Casablanca' },
  { name: 'Four Seasons', logo: '/media/logos/four-seasons.svg', detail: 'George V Paris · Casablanca · Marrakech' },
  { name: 'Mandarin Oriental', logo: '/media/logos/mandarin-oriental.svg', detail: 'Paris · Marrakech · Genève' },
  { name: 'Aman', logo: '/media/logos/aman.svg', detail: 'Amanjena Marrakech · Aman Venice · Aman New York' },
  { name: 'Cheval Blanc (LVMH)', detail: 'Paris · Courchevel · St-Barth · Randheli' },
  { name: 'Dorchester Collection', logo: '/media/logos/dorchester.webp', detail: 'Plaza Athénée · Le Meurice · The Dorchester · Hôtel Bel-Air' },
  { name: 'Oetker Collection', detail: 'Le Bristol Paris · Hôtel du Cap-Eden-Roc · The Lanesborough' },
  { name: 'The Peninsula Hotels', logo: '/media/logos/peninsula.svg', detail: 'Paris · London · Istanbul' },
  { name: 'Rosewood', logo: '/media/logos/rosewood.webp', detail: 'Hôtel de Crillon · Rosewood London' },
  { name: 'Shangri-La', logo: '/media/logos/shangri-la.svg', detail: 'Shangri-La Paris' },
  { name: 'The Savoy', logo: '/media/logos/savoy.svg', detail: 'The Savoy London' },
  { name: 'Accor', logo: '/media/logos/accor.svg', detail: 'Raffles · Fairmont · Sofitel · MGallery · Pullman · Mövenpick · Novotel · ibis' },
  { name: 'Marriott', logo: '/media/logos/marriott.svg', detail: 'Ritz-Carlton · St. Regis · Le Méridien · W · Sheraton · Courtyard' },
  { name: 'Hilton', logo: '/media/logos/hilton.svg', detail: 'Waldorf Astoria · Conrad · Hilton · DoubleTree' },
  { name: 'IHG', logo: '/media/logos/ihg.svg', detail: 'InterContinental · Six Senses · Kimpton · Holiday Inn' },
  { name: 'Hyatt', logo: '/media/logos/hyatt.svg', detail: 'Park Hyatt · Andaz · Grand Hyatt' },
  { name: 'Rixos', logo: '/media/logos/rixos.svg', detail: 'Resorts' },
  { name: 'Barceló', logo: '/media/logos/barcelo.svg', detail: 'Resorts & city hotels' },
];
