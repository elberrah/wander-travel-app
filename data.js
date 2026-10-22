// ==========================================================================
// Wander Travel & Event — Application Logic (script.js)
// ==========================================================================

// --- OFFERS DATABASE ---
const OFFERS_DATA = [
    {
        "id": "ola-blanca",
        "category": "casa",
        "title": "Ola Blanca",
        "image": "assets/ola-blanca.jpg",
        "stars": "Résidence balnéaire",
        "meal": "LOGT",
        "location": "Dar Bouazza",
        "equipments": [
            "Front de mer",
            "Piscines",
            "Résidence familiale"
        ],
        "startingPrice": 1200,
        "priceLabel": "Appartement / Nuit",
        "description": "Résidence balnéaire familiale à Dar Bouazza, en bord de mer, à environ 30 minutes de Casablanca.",
        "pricing": {
            "seasons": [
                { "name": "Haute saison (été)", "from": "06-15", "to": "09-15", "price": 1600, "weekendPrice": 1900 },
                { "name": "Moyenne saison (printemps/automne)", "from": "03-01", "to": "06-14", "price": 1300, "weekendPrice": 1500 },
                { "name": "Moyenne saison (printemps/automne)", "from": "09-16", "to": "10-31", "price": 1300, "weekendPrice": 1500 }
            ],
            "weekly": { "weekdayPrice": 1200, "weekendPrice": 1400 },
            "specials": [
                { "date": "2026-12-31", "price": 2500 },
                { "date": "2027-01-01", "price": 2000 }
            ]
        },
        "details": {
            "tableHeader": [
                "Catégorie",
                "Tarif par nuit (Logement seul)"
            ],
            "tableRows": [
                [
                    "Appartement Équipé Familial",
                    "1 300 MAD"
                ]
            ],
            "notes": [
                "Séjour minimum requis : 2 nuits.",
                "Accès direct à la plage et aux multiples piscines de la copropriété.",
                "Terrains de sport (tennis, football) disponibles au sein de la résidence."
            ]
        }
    },
    {
        "id": "ramo-flores",
        "category": "casa",
        "title": "Ramo Flores",
        "image": "assets/ramo-flores.jpg",
        "stars": "Résidence Estivale",
        "meal": "LOGT",
        "location": "Sidi Rahal",
        "equipments": [
            "Bord de mer",
            "Piscines",
            "Jardins"
        ],
        "startingPrice": 800,
        "priceLabel": "Appartement / Nuit",
        "description": "Résidence en bord de mer à Sidi Rahal, avec piscines et jardins.",
        "details": {
            "tableHeader": [
                "Catégorie",
                "Tarif par nuit (Logement seul)"
            ],
            "tableRows": [
                [
                    "Appartement Équipé (Période Estivale)",
                    "800 MAD"
                ]
            ],
            "notes": [
                "Réservations valables exclusivement pour la saison estivale.",
                "Séjour minimum requis : 2 nuits.",
                "Accès aux piscines collectives de la résidence."
            ]
        }
    },
    {
        "id": "al-kawatar",
        "category": "casa",
        "title": "Résidence Al Kawatar",
        "image": "",
        "stars": "Résidence",
        "meal": "LOGT",
        "location": "Casablanca",
        "equipments": [
            "Résidence"
        ],
        "startingPrice": 700,
        "priceLabel": "Appartement / Nuit",
        "description": "Établissement du réseau conventionné Wander. Résidence à Casablanca et environs.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "sungo-club",
        "category": "marrakech",
        "title": "Pickalbatros Sungo Club",
        "image": "assets/sungo-club.webp",
        "stars": "Hôtel Club 5★",
        "meal": "All Inclusive",
        "location": "Marrakech",
        "equipments": [
            "All Inclusive",
            "MICE",
            "Piscines",
            "Swim-up"
        ],
        "startingPrice": 2000,
        "priceLabel": "Single All-In (Saison Basse)",
        "description": "Une formule club haut de gamme en formule Tout Compris, idéale pour se détendre sans compter dans les différents bars et restaurants.",
        "details": {
            "tableHeader": [
                "Formule",
                "P1 (01/09-16/09)",
                "P2 (17/09-16/10)",
                "P3 (17/10-31/10)"
            ],
            "tableRows": [
                [
                    "Single All Inclusive",
                    "2 437 MAD",
                    "2 000 MAD",
                    "2 437 MAD"
                ],
                [
                    "Double (2 ad + 1 enf)",
                    "2 750 MAD",
                    "2 250 MAD",
                    "2 750 MAD"
                ],
                [
                    "Double (2 ad + 2 enf)",
                    "3 375 MAD",
                    "2 750 MAD",
                    "3 375 MAD"
                ]
            ],
            "notes": [
                "Supplément Vue Piscine : +200 MAD par nuit.",
                "Supplément Chambre Swim-up (accès direct piscine) : +500 MAD par nuit.",
                "Enfants : Gratuit de 0 à 2 ans. 1er enfant de 2 à 11 ans logé gratuitement dans la chambre."
            ]
        }
    },
    {
        "id": "aqua-fun-club",
        "category": "marrakech",
        "title": "Pickalbatros Aqua Fun Club",
        "image": "",
        "stars": "Complexe familial",
        "meal": "",
        "location": "Marrakech",
        "equipments": [
            "Parc aquatique",
            "Familial"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Complexe familial avec parc aquatique.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "hotel-du-golf",
        "category": "marrakech",
        "title": "Pickalbatros Hotel Du Golf",
        "image": "",
        "stars": "Adults Only +16",
        "meal": "",
        "location": "Marrakech",
        "equipments": [
            "Adults Only +16"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Hôtel réservé aux adultes, à partir de 16 ans.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "palm-plaza",
        "category": "marrakech",
        "title": "Palm Plaza Hôtel 5★ & Résidence",
        "image": "assets/palm-plaza.jpg",
        "stars": "5★ Hôtel & Spa",
        "meal": "BB",
        "location": "Marrakech",
        "equipments": [
            "Piscine",
            "Spa & Hammam",
            "Zone Agdal"
        ],
        "startingPrice": 1150,
        "priceLabel": "Single BB (Basse Saison)",
        "description": "Hôtel luxueux situé dans la zone touristique de l'Agdal, offrant une vue imprenable sur les montagnes de l'Atlas.",
        "details": {
            "tableHeader": [
                "Formule (+ Marge 15%)",
                "Basse Saison",
                "Moyenne Saison"
            ],
            "tableRows": [
                [
                    "Chambre Double BB",
                    "1 325 MAD",
                    "1 565 MAD"
                ],
                [
                    "Chambre Single BB",
                    "1 150 MAD",
                    "1 390 MAD"
                ],
                [
                    "Junior Suite BB",
                    "2 015 MAD",
                    "2 255 MAD"
                ]
            ],
            "notes": [
                "Taxes de séjour locales de 28,60 MAD par personne et par nuit.",
                "Supplément Repas (Déjeuner ou Dîner) : +345 MAD par adulte et par jour.",
                "Gratuité Enfant : De 0 à 5.99 ans logé gratuitement dans la chambre des parents."
            ]
        }
    },
    {
        "id": "palm-plaza-residence",
        "category": "marrakech",
        "title": "Palm Plaza Résidence",
        "image": "assets/palm-plaza-residence.jpg",
        "stars": "Résidence Hôtelière",
        "meal": "LOGT",
        "location": "Marrakech",
        "equipments": [
            "Accès Piscine",
            "Zone Agdal",
            "Appartements"
        ],
        "startingPrice": 850,
        "priceLabel": "Appartement / Nuit",
        "description": "Le confort autonome d'un appartement moderne tout en profitant des infrastructures de loisirs du complexe Palm Plaza.",
        "details": {
            "tableHeader": [
                "Catégorie",
                "Tarif par nuit (Logement seul)"
            ],
            "tableRows": [
                [
                    "Appartement Équipé Résidentiel",
                    "850 MAD"
                ]
            ],
            "notes": [
                "Accès payant ou sous réserve de conditions aux restaurants et Spa de l'hôtel.",
                "Service de ménage de base et gardiennage inclus.",
                "Proximité avec la promenade de l'Agdal."
            ]
        }
    },
    {
        "id": "trianon-appart",
        "category": "marrakech",
        "image": "assets/trianon-appart.jpg",
        "title": "Le Trianon",
        "stars": "Appartements de luxe",
        "meal": "LOGT",
        "location": "Marrakech",
        "equipments": [
            "Piscine",
            "Conciergerie",
            "Suites Meublées"
        ],
        "startingPrice": 2700,
        "priceLabel": "Suite Meublée / Nuit",
        "description": "Appartements de haut standing situés dans le quartier chic de l'Hivernage, alliant l'indépendance d'un appartement au service d'un hôtel 5★.",
        "details": {
            "tableHeader": [
                "Type d'appartement",
                "Tarif par nuit (Logement seul)"
            ],
            "tableRows": [
                [
                    "Suite & Appartement Premium Meublé (2 personnes)",
                    "2 700 MAD"
                ]
            ],
            "notes": [
                "Prestations hôtelières complètes incluses : ménage quotidien, sécurité, accès piscine.",
                "Emplacement central privilégié, idéal pour explorer Marrakech à pied."
            ]
        }
    },
    {
        "id": "les-palmiers",
        "category": "marrakech",
        "title": "Les Palmiers Marrakech",
        "image": "",
        "stars": "Résidence",
        "meal": "",
        "location": "Marrakech",
        "equipments": [
            "Piscine",
            "Jardin"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Résidence d'appartements à Marrakech, avec piscine et jardins.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "prestigia-marrakech",
        "category": "marrakech",
        "title": "Prestigia",
        "image": "assets/prestigia-marrakech.jpg",
        "stars": "Résidence 1 Trianon et appartements",
        "meal": "LOGT",
        "location": "Marrakech",
        "equipments": [
            "Golf 18T",
            "Piscines",
            "Vue Atlas"
        ],
        "startingPrice": 850,
        "priceLabel": "Appartement / Nuit",
        "description": "Séjournez dans un appartement luxueux au sein d'une résidence privée fermée avec vue panoramique sur les montagnes de l'Atlas.",
        "details": {
            "tableHeader": [
                "Type d'appartement",
                "Tarif à partir de (Logement seul)"
            ],
            "tableRows": [
                [
                    "Appartement de prestige 2 chambres",
                    "1 600 MAD / nuit"
                ]
            ],
            "notes": [
                "Résidence hautement sécurisée 24/7 avec de grands espaces verts.",
                "Piscines d'îlots disponibles en saison.",
                "Terrasses meublées avec vue sur le parcours de golf."
            ]
        }
    },
    {
        "id": "adam-park",
        "category": "marrakech",
        "title": "Adam Park Marrakech Hotel & Spa",
        "image": "",
        "stars": "Hôtel & Spa",
        "meal": "",
        "location": "Marrakech",
        "equipments": [
            "Spa"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Hôtel et spa à Marrakech.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "al-maaden-villa",
        "category": "marrakech",
        "title": "Al Maaden VillaHotel & Spa",
        "image": "assets/al-maaden-villa.jpg",
        "stars": "Villas privées avec piscine",
        "meal": "BB",
        "location": "Marrakech",
        "equipments": [
            "Golf",
            "Piscine Privée",
            "Spa",
            "2 Chambres"
        ],
        "startingPrice": 2900,
        "priceLabel": "Villa 2 Ch (4 Pax) / Nuit",
        "description": "Offrez-vous le luxe suprême d'une villa privée de 2 chambres avec piscine privée au cœur d'un prestigieux domaine golfique à Marrakech.",
        "details": {
            "tableHeader": [
                "Hébergement",
                "Tarif par nuit (BB)"
            ],
            "tableRows": [
                [
                    "Villa Privée 2 Chambres (Capacité 4 personnes)",
                    "2 900 MAD"
                ]
            ],
            "notes": [
                "Le petit-déjeuner quotidien servi en villa ou au restaurant principal est inclus.",
                "Séjour minimum requis : 2 nuits.",
                "Service de conciergerie 24/7 et accès aux installations de Spa."
            ]
        }
    },
    {
        "id": "kech-boutique",
        "category": "marrakech",
        "title": "Kech Boutique Hotel & Spa",
        "image": "",
        "stars": "Boutique Hotel",
        "meal": "",
        "location": "Marrakech",
        "equipments": [
            "Spa"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Boutique hôtel et spa à Marrakech.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "kasbah-ourika",
        "category": "marrakech",
        "title": "La Kasbah d'Ourika",
        "image": "assets/kasbah-ourika.jpg",
        "stars": "Hôtel de Charme",
        "meal": "BB / DP",
        "location": "Vallée d'Ourika",
        "equipments": [
            "Vue Atlas",
            "Piscine",
            "Spa",
            "Randonnées"
        ],
        "startingPrice": 1725,
        "priceLabel": "Standard BB / Nuit",
        "description": "Hôtel, restaurant, spa et activités sur les collines de la vallée de l’Ourika, avec panorama sur l’Atlas.",
        "details": {
            "tableHeader": [
                "Catégorie (+ Marge 15%)",
                "Tarif Double BB",
                "Tarif Double DP"
            ],
            "tableRows": [
                [
                    "Chambre Standard (2 pax)",
                    "1 725 MAD",
                    "2 185 MAD"
                ],
                [
                    "Suite Junior (2 ad + 1 enf)",
                    "1 955 MAD",
                    "2 415 MAD"
                ],
                [
                    "Suite Deluxe (2 ad + 2 enf)",
                    "2 415 MAD",
                    "2 875 MAD"
                ],
                [
                    "Suite Présidentielle (4 pax)",
                    "4 370 MAD",
                    "5 060 MAD"
                ]
            ],
            "notes": [
                "Tarifs de repas (DP) comprenant le dîner gastronomique de terroir.",
                "Activités disponibles sur place : Trekking guidé, E-scooter, excursions 4x4, équitation.",
                "Spa traditionnel avec hammam beldi et massages aux huiles d'argan bio."
            ]
        }
    },
    {
        "id": "aurocher",
        "category": "marrakech",
        "title": "Hôtel Aurocher",
        "image": "",
        "stars": "Hôtel",
        "meal": "",
        "location": "Oukaïmeden",
        "equipments": [
            "Route de l’Oukaïmeden"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Hôtel situé sur la route de l’Oukaïmeden.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "kalyptus",
        "category": "marrakech",
        "title": "Kalyptus Luxury Camp",
        "image": "",
        "stars": "Luxury Camp",
        "meal": "",
        "location": "Lalla Takerkoust",
        "equipments": [
            "Camp de luxe"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Camp de luxe à Lalla Takerkoust.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "lemnaouar",
        "category": "sud",
        "title": "Lemnaouar Erg Camp & Bivouac",
        "image": "",
        "stars": "Camp & Bivouac",
        "meal": "",
        "location": "Merzouga",
        "equipments": [
            "Erg Chebbi",
            "Camp"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Camp et bivouac Lemnaouar, à Merzouga (Erg Chebbi).",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "hilton-houara",
        "category": "nord",
        "title": "Hilton Al Houara Resort & Spa",
        "image": "assets/hilton-houara.jpg",
        "stars": "Résidence de charme",
        "meal": "BB",
        "location": "Tanger",
        "equipments": [
            "Spa",
            "Golf",
            "Accès Plage",
            "Appartements"
        ],
        "startingPrice": 1800,
        "priceLabel": "Chambre BB / Nuit",
        "description": "Situé au sein d'une forêt protégée en bord de mer, ce resort propose des chambres élégantes ainsi que des appartements familiaux équipés.",
        "details": {
            "tableHeader": [
                "Catégorie Hébergement",
                "Tarif BB / Nuit"
            ],
            "tableRows": [
                [
                    "Garden View / Sea View (Chambre)",
                    "1 800 / 2 200 MAD"
                ],
                [
                    "Suite Ocean View / Junior Suite",
                    "2 700 / 2 950 MAD"
                ],
                [
                    "Appartement 1 ch (Garden / Ocean)",
                    "2 400 / 2 900 MAD"
                ],
                [
                    "Appartement 2 ch (Garden / Ocean)",
                    "3 800 / 4 200 MAD"
                ]
            ],
            "notes": [
                "Taxes de séjour de 39,60 MAD par personne et par nuit en sus.",
                "Appartements dotés d'une cuisine entièrement équipée et de balcons spacieux.",
                "Accès gratuit au parcours de golf pitch & putt."
            ]
        }
    },
    {
        "id": "le-tanger",
        "category": "nord",
        "title": "Le Tanger Résidence Hôtelière",
        "image": "",
        "stars": "Résidence hôtelière",
        "meal": "",
        "location": "Tanger",
        "equipments": [
            "Résidence hôtelière"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Résidence hôtelière à Tanger.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "casa-chahd",
        "category": "nord",
        "title": "Casa Chahd Chefchaouen",
        "image": "",
        "stars": "Appartements",
        "meal": "",
        "location": "Chefchaouen",
        "equipments": [
            "6 appartements équipés",
            "2 chambres par appartement",
            "24 personnes au total"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Casa Chahd Chefchaouen, un établissement d'hébergement situé au cœur de la ville de Chefchaouen, au Maroc. Notre établissement dispose de 6 appartements entièrement équipés, chacun comprenant 2 chambres, avec une capacité totale d'accueil de 24 personnes. Nous accueillons des familles, des groupes touristiques, des voyageurs d'affaires ainsi que des groupes organisés.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "ermitage-akchour",
        "category": "nord",
        "title": "L’Ermitage d’Akchour",
        "image": "",
        "stars": "Appartements de charme",
        "meal": "",
        "location": "Chefchaouen",
        "equipments": [
            "Appartements de charme"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Ermitage et appartements de charme à Akchour, région de Chefchaouen.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "vichy-thermalia",
        "category": "nord",
        "title": "Vichy Thermalia Spa Hôtel",
        "image": "",
        "stars": "Spa Hôtel",
        "meal": "",
        "location": "Moulay Yacoub",
        "equipments": [
            "Spa",
            "Fès"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Spa hôtel à Moulay Yacoub, près de Fès.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "ifrane-palace",
        "category": "nord",
        "title": "Ifrane Palace & Domaine Montagne",
        "image": "",
        "stars": "Domaine Montagne",
        "meal": "",
        "location": "Ifrane",
        "equipments": [
            "Ifrane",
            "Oukaïmeden"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Ifrane Palace et domaine de montagne (Ifrane / Oukaïmeden).",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "widiane-suite",
        "category": "nord",
        "title": "Widiane Suite & Spa",
        "image": "",
        "stars": "Suites & Spa",
        "meal": "",
        "location": "Bin El Ouidane",
        "equipments": [
            "Suites",
            "Spa"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Suites et spa à Bin El Ouidane.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "dakhla-attitude",
        "category": "dakhla",
        "title": "Dakhla Attitude",
        "image": "",
        "stars": "Dakhla Hospitality Group",
        "meal": "",
        "location": "Dakhla",
        "equipments": [
            "Dakhla Hospitality Group"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Membre de Dakhla Hospitality Group.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "pk25",
        "category": "dakhla",
        "title": "PK 25",
        "image": "",
        "stars": "Dakhla Hospitality Group",
        "meal": "",
        "location": "Dakhla",
        "equipments": [
            "Dakhla Hospitality Group"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Membre de Dakhla Hospitality Group.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "lagon-energy",
        "category": "dakhla",
        "title": "Lagon Energy",
        "image": "",
        "stars": "Dakhla Hospitality Group",
        "meal": "",
        "location": "Dakhla",
        "equipments": [
            "Dakhla Hospitality Group"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Membre de Dakhla Hospitality Group.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "westpoint",
        "category": "dakhla",
        "title": "Westpoint",
        "image": "",
        "stars": "Dakhla Hospitality Group",
        "meal": "",
        "location": "Dakhla",
        "equipments": [
            "Dakhla Hospitality Group"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Membre de Dakhla Hospitality Group.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "la-crique",
        "category": "dakhla",
        "title": "La Crique (Nature & Spa)",
        "image": "",
        "stars": "Dakhla Hospitality Group",
        "meal": "",
        "location": "Dakhla",
        "equipments": [
            "Nature & Spa"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Membre de Dakhla Hospitality Group.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "dunes-dakhla",
        "category": "dakhla",
        "title": "Dunes de Dakhla",
        "image": "",
        "stars": "Dakhla Hospitality Group",
        "meal": "",
        "location": "Dakhla",
        "equipments": [
            "Dakhla Hospitality Group"
        ],
        "startingPrice": null,
        "priceLabel": "Tarif négocié sur demande",
        "description": "Établissement du réseau conventionné Wander. Membre de Dakhla Hospitality Group.",
        "details": {
            "tableHeader": [],
            "tableRows": [],
            "notes": [
                "Tarif négocié communiqué par le service Corporate Wander sur demande, selon dates et composition."
            ]
        }
    },
    {
        "id": "omra-oct",
        "category": "omra",
        "title": "Omra Octobre 2026 · 15 jours",
        "image": "https://images.unsplash.com/photo-1565552070072-024257e5e1d6?auto=format&fit=crop&w=800&q=80",
        "stars": "14 nuits / 15 jours",
        "meal": "Sans repas / Petit-déjeuner",
        "location": "Makkah & Madinah",
        "equipments": [
            "Vol direct Saudia",
            "9 nuits Makkah / 5 nuits Madinah",
            "Du 15 au 29 octobre"
        ],
        "startingPrice": 15500,
        "priceLabel": "Quad / pers (Économique)",
        "description": "Programme Omra avec vols directs Saudia depuis Casablanca, hébergement à Makkah et Madinah, visa, transferts et visites.",
        "details": {
            "tableHeader": [
                "Hôtels (Makkah / Madinah)",
                "Repas",
                "Chambre Quad",
                "Chambre Triple",
                "Chambre Double"
            ],
            "tableRows": [
                [
                    "Al Moltazam (avec navettes) / Dorrat Al Eiman",
                    "Sans repas",
                    "15 500 MAD",
                    "16 500 MAD",
                    "17 800 MAD"
                ],
                [
                    "Emaar Grand Jarir / Ankira",
                    "Petit-déjeuner",
                    "19 300 MAD",
                    "20 300 MAD",
                    "21 800 MAD"
                ],
                [
                    "Anjum / Millennium Taiba",
                    "Petit-déjeuner",
                    "22 700 MAD",
                    "23 800 MAD",
                    "26 700 MAD"
                ],
                [
                    "Swissôtel Makkah / Millennium Taiba",
                    "Petit-déjeuner",
                    "—",
                    "30 500 MAD",
                    "35 300 MAD"
                ]
            ],
            "notes": [
                "Dates : du 15/10/2026 au 29/10/2026, 15 jours / 14 nuits (9 nuits Makkah, 5 nuits Madinah).",
                "Vols Saudia : SV 378 le 15/10 Casablanca–Djeddah (19h10, arrivée 03h20 le lendemain) ; SV 379 le 29/10 Djeddah–Casablanca (12h30, arrivée 17h30).",
                "Vol direct Saudia A/R depuis Casablanca, visa et frais d’émission, hébergement dans les hôtels indiqués (ou équivalents), transferts et déplacements en Arabie saoudite (bus climatisés, train rapide), visites (mazarat), encadrement marocain et assistance.",
                "Inscription : acompte de 50 % du programme. Passeport biométrique valable au moins 8 mois et copie de la CIN.",
                "Les chambres triples et quadruples des hôtels 5 étoiles sont souvent avec lit supplémentaire ou canapé-lit. Autres hôtels sur demande, selon disponibilité."
            ]
        }
    },
    {
        "id": "omra-oct-12j",
        "category": "omra",
        "title": "Omra Octobre 2026 · 12 jours",
        "image": "https://images.unsplash.com/photo-1565552070072-024257e5e1d6?auto=format&fit=crop&w=800&q=80",
        "stars": "11 nuits / 12 jours",
        "meal": "Sans repas / Petit-déjeuner",
        "location": "Makkah & Madinah",
        "equipments": [
            "Vol Saudia",
            "7 nuits Makkah / 4 nuits Madinah",
            "Du 16 au 27 octobre"
        ],
        "startingPrice": 13900,
        "priceLabel": "Quad / pers (Économique)",
        "description": "Programme Omra avec vols directs Saudia depuis Casablanca, hébergement à Makkah et Madinah, visa, transferts et visites.",
        "details": {
            "tableHeader": [
                "Hôtels (Makkah / Madinah)",
                "Repas",
                "Chambre Quad",
                "Chambre Triple",
                "Chambre Double"
            ],
            "tableRows": [
                [
                    "Al Moltazam (avec navettes) / Dorrat Al Eiman",
                    "Sans repas",
                    "13 900 MAD",
                    "15 200 MAD",
                    "16 300 MAD"
                ],
                [
                    "Emaar Al Manar / Emaar Elite",
                    "Petit-déjeuner",
                    "17 500 MAD",
                    "18 400 MAD",
                    "20 200 MAD"
                ],
                [
                    "Anjum / Millennium Taiba",
                    "Petit-déjeuner",
                    "20 800 MAD",
                    "21 800 MAD",
                    "23 900 MAD"
                ],
                [
                    "Swissôtel Makkah / Millennium Taiba",
                    "Petit-déjeuner",
                    "—",
                    "26 900 MAD",
                    "30 900 MAD"
                ]
            ],
            "notes": [
                "Dates : du 16/10/2026 au 27/10/2026, 12 jours / 11 nuits (7 nuits Makkah, 4 nuits Madinah).",
                "Vols Saudia : SV 372 le 16/10 Casablanca–Djeddah (14h55, arrivée 23h05) ; SV 1422 le 17/10 Djeddah–Médine (03h45, arrivée 04h45) ; SV 377 le 28/10 Djeddah–Casablanca (01h00, arrivée 06h00).",
                "Vol direct Saudia A/R depuis Casablanca, visa et frais d’émission, hébergement dans les hôtels indiqués (ou équivalents), transferts et déplacements en Arabie saoudite (bus climatisés, train rapide), visites (mazarat), encadrement marocain et assistance.",
                "Inscription : acompte de 50 % du programme. Passeport biométrique valable au moins 8 mois et copie de la CIN.",
                "Les chambres triples et quadruples des hôtels 5 étoiles sont souvent avec lit supplémentaire ou canapé-lit. Autres hôtels sur demande, selon disponibilité."
            ]
        }
    },
    {
        "id": "omra-nov",
        "category": "omra",
        "title": "Omra Novembre 2026 · 15 jours",
        "image": "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
        "stars": "14 nuits / 15 jours",
        "meal": "Sans repas / Petit-déjeuner",
        "location": "Makkah & Madinah",
        "equipments": [
            "Vol direct Saudia",
            "9 nuits Makkah / 5 nuits Madinah",
            "Du 12 au 26 novembre"
        ],
        "startingPrice": 14500,
        "priceLabel": "Quad / pers (Économique)",
        "description": "Programme Omra avec vols directs Saudia depuis Casablanca, hébergement à Makkah et Madinah, visa, transferts et visites.",
        "details": {
            "tableHeader": [
                "Hôtels (Makkah / Madinah)",
                "Repas",
                "Chambre Quad",
                "Chambre Triple",
                "Chambre Double"
            ],
            "tableRows": [
                [
                    "Abraj Al Tayseer / Dorrat Al Eiman",
                    "Sans repas",
                    "14 500 MAD",
                    "15 500 MAD",
                    "16 500 MAD"
                ],
                [
                    "Emaar Grand / Ilaf Al Taqwa",
                    "Petit-déjeuner",
                    "19 500 MAD",
                    "20 500 MAD",
                    "22 500 MAD"
                ],
                [
                    "Anjum / Al Aqeeq",
                    "Petit-déjeuner",
                    "21 900 MAD",
                    "23 900 MAD",
                    "26 900 MAD"
                ],
                [
                    "Mövenpick Hajar / Al Aqeeq",
                    "Petit-déjeuner",
                    "28 600 MAD",
                    "30 900 MAD",
                    "35 600 MAD"
                ]
            ],
            "notes": [
                "Dates : du 12/11/2026 au 26/11/2026, 15 jours / 14 nuits (9 nuits Makkah, 5 nuits Madinah).",
                "Vols Saudia : SV 378 le 12/11 Casablanca–Djeddah (19h05, arrivée 03h05 le lendemain) ; SV 1424 le 13/11 Djeddah–Médine (08h20, arrivée 09h20) ; SV 373 le 26/11 Djeddah–Casablanca (07h40, arrivée 12h40).",
                "Vol direct Saudia A/R depuis Casablanca, visa et frais d’émission, hébergement dans les hôtels indiqués (ou équivalents), transferts et déplacements en Arabie saoudite (bus climatisés, train rapide), visites (mazarat), encadrement marocain et assistance.",
                "Inscription : acompte de 50 % du programme. Passeport biométrique valable au moins 8 mois et copie de la CIN.",
                "Les chambres triples et quadruples des hôtels 5 étoiles sont souvent avec lit supplémentaire ou canapé-lit. Autres hôtels sur demande, selon disponibilité."
            ]
        }
    },
    {
        "id": "istanbul-oct",
        "category": "package",
        "title": "Istanbul Octobre 2026 · 8 jours",
        "image": "assets/package-istanbul.jpg",
        "stars": "7 nuits / 8 jours · Vol direct RAM",
        "meal": "Petit-déjeuner",
        "location": "Istanbul (Turquie)",
        "equipments": [
            "Vol direct RAM",
            "7 nuits",
            "Dîner-croisière Bosphore",
            "Transferts"
        ],
        "startingPrice": 7250,
        "priceLabel": "Triple / pers (River Hotel 3★)",
        "description": "Séjour de 7 nuits à Istanbul avec vol direct Royal Air Maroc, hôtels 3★ et 4★, petit-déjeuner, transferts et dîner-croisière sur le Bosphore.",
        "details": {
            "tableHeader": [
                "Hôtel (quartier)",
                "Chambre Double",
                "Chambre Single",
                "Chambre Triple",
                "Enfant 0–1,99 an",
                "Enfant 2–5 ans",
                "Enfant 6–11,99 ans"
            ],
            "tableRows": [
                [
                    "River Hotel 3★ (Old City)",
                    "7 580 MAD",
                    "9 360 MAD",
                    "7 250 MAD",
                    "1 400 MAD",
                    "5 940 MAD",
                    "6 390 MAD"
                ],
                [
                    "Ikbal Deluxe 4★ (Old City)",
                    "8 400 MAD",
                    "10 850 MAD",
                    "8 200 MAD",
                    "1 400 MAD",
                    "6 298 MAD",
                    "6 906 MAD"
                ],
                [
                    "Beyaz Saray 4★ (Old City)",
                    "8 990 MAD",
                    "11 988 MAD",
                    "8 750 MAD",
                    "1 400 MAD",
                    "6 440 MAD",
                    "7 190 MAD"
                ],
                [
                    "Valid Hotel 3★ (Taksim)",
                    "7 960 MAD",
                    "9 950 MAD",
                    "7 899 MAD",
                    "1 400 MAD",
                    "6 190 MAD",
                    "6 675 MAD"
                ],
                [
                    "Crestium Taksim Privé 4★ (Taksim)",
                    "8 490 MAD",
                    "10 990 MAD",
                    "8 150 MAD",
                    "1 400 MAD",
                    "6 315 MAD",
                    "6 940 MAD"
                ],
                [
                    "The Parma Hotel ou Metropolitan Hotels Taksim 4★ (Taksim)",
                    "9 150 MAD",
                    "12 280 MAD",
                    "8 880 MAD",
                    "1 400 MAD",
                    "6 474 MAD",
                    "7 258 MAD"
                ]
            ],
            "notes": [
                "Départs / retours : 03→10 oct., 10→17 oct., 17→24 oct., 24→31 oct., 30 oct.→06 nov. 2026.",
                "Vols Royal Air Maroc : AT 910 Casablanca 10h00, Istanbul 16h40 ; AT 911 Istanbul 18h10, Casablanca 21h10.",
                "Les tarifs comprennent : billet Casablanca–Istanbul–Casablanca avec Royal Air Maroc (2 bagages de 23 kg), 7 nuits en petit-déjeuner, transferts aéroport–hôtel–aéroport, dîner-croisière sur le Bosphore.",
                "Les tarifs ne comprennent pas : dépenses personnelles, excursions en option, port de bagages, extras et pourboires, repas non mentionnés.",
                "Excursions en option (par personne) : croisière sur le Bosphore 400 MAD ; visite guidée d’une journée avec guide anglophone 1 300 MAD (billet Hagia Sophia non inclus, supplément 300 MAD) ; Îles des Princesses 350 MAD ; Bursa 450 MAD.",
                "Jour 1 : Casablanca–Istanbul, accueil et transfert à l’hôtel. Jours 2 à 7 : journées libres avec petit-déjeuner à l’hôtel, excursions en option. Jour 8 : transfert à l’aéroport et retour à Casablanca.",
                "Tarifs par personne en MAD. Un seul enfant ou bébé partageant la chambre des parents."
            ]
        }
    },
    {
        "id": "istanbul-nov-dec",
        "category": "package",
        "title": "Istanbul Novembre – Décembre 2026 · 8 jours",
        "image": "assets/package-istanbul.jpg",
        "stars": "7 nuits / 8 jours · Vol direct RAM",
        "meal": "Petit-déjeuner",
        "location": "Istanbul (Turquie)",
        "equipments": [
            "Vol direct RAM",
            "7 nuits",
            "Dîner-croisière Bosphore",
            "Transferts"
        ],
        "startingPrice": 7450,
        "priceLabel": "Triple / pers (River Hotel 3★)",
        "description": "Séjour de 7 nuits à Istanbul en novembre et décembre, avec vol direct Royal Air Maroc, hôtels 3★ et 4★, petit-déjeuner, transferts et dîner-croisière sur le Bosphore.",
        "details": {
            "tableHeader": [
                "Hôtel (quartier)",
                "Chambre Double",
                "Chambre Single",
                "Chambre Triple",
                "Enfant 0–1,99 an",
                "Enfant 2–5 ans",
                "Enfant 6–11,99 ans"
            ],
            "tableRows": [
                [
                    "River Hotel 3★ (Old City) · 06 nov.–26 déc.",
                    "7 680 MAD",
                    "9 470 MAD",
                    "7 450 MAD",
                    "1 400 MAD",
                    "6 050 MAD",
                    "6 500 MAD"
                ],
                [
                    "Ikbal Deluxe 4★ (Old City) · 06 nov.–26 déc.",
                    "8 680 MAD",
                    "10 950 MAD",
                    "8 500 MAD",
                    "1 400 MAD",
                    "6 370 MAD",
                    "6 950 MAD"
                ],
                [
                    "Beyaz Saray 4★ (Old City) · 06 nov.–26 déc.",
                    "8 750 MAD",
                    "11 150 MAD",
                    "8 600 MAD",
                    "1 400 MAD",
                    "6 390 MAD",
                    "6 980 MAD"
                ],
                [
                    "Valid Hotel 3★ (Taksim) · 06 nov.–26 déc.",
                    "8 070 MAD",
                    "10 050 MAD",
                    "8 100 MAD",
                    "1 400 MAD",
                    "6 290 MAD",
                    "6 780 MAD"
                ],
                [
                    "Crestium Taksim Privé 4★ (Taksim) · 06 nov.–26 déc.",
                    "8 550 MAD",
                    "10 700 MAD",
                    "8 300 MAD",
                    "1 400 MAD",
                    "6 350 MAD",
                    "6 880 MAD"
                ],
                [
                    "The Parma Hotel ou Metropolitan Hotels Taksim 4★ (Taksim) · 06 nov.–26 déc.",
                    "9 550 MAD",
                    "12 680 MAD",
                    "9 275 MAD",
                    "1 400 MAD",
                    "6 590 MAD",
                    "7 370 MAD"
                ],
                [
                    "River Hotel 3★ (Old City) · Nouvel An (25/12–01/01)",
                    "8 100 MAD",
                    "10 300 MAD",
                    "7 690 MAD",
                    "1 400 MAD",
                    "6 150 MAD",
                    "6 700 MAD"
                ],
                [
                    "Ikbal Deluxe 4★ (Old City) · Nouvel An (25/12–01/01)",
                    "9 350 MAD",
                    "12 280 MAD",
                    "8 880 MAD",
                    "1 400 MAD",
                    "6 550 MAD",
                    "7 270 MAD"
                ],
                [
                    "Beyaz Saray 4★ (Old City) · Nouvel An (25/12–01/01)",
                    "10 200 MAD",
                    "13 990 MAD",
                    "9 850 MAD",
                    "1 400 MAD",
                    "6 750 MAD",
                    "7 680 MAD"
                ],
                [
                    "Valid Hotel 3★ (Taksim) · Nouvel An (25/12–01/01)",
                    "8 600 MAD",
                    "11 600 MAD",
                    "8 480 MAD",
                    "1 400 MAD",
                    "6 450 MAD",
                    "7 550 MAD"
                ],
                [
                    "Crestium Taksim Privé 4★ (Taksim) · Nouvel An (25/12–01/01)",
                    "9 800 MAD",
                    "13 200 MAD",
                    "9 600 MAD",
                    "1 400 MAD",
                    "6 650 MAD",
                    "7 490 MAD"
                ],
                [
                    "The Parma Hotel ou Metropolitan Hotels Taksim 4★ (Taksim) · Nouvel An (25/12–01/01)",
                    "9 990 MAD",
                    "13 500 MAD",
                    "9 750 MAD",
                    "1 400 MAD",
                    "6 680 MAD",
                    "7 590 MAD"
                ]
            ],
            "notes": [
                "Départs / retours : 06→13 nov., 18→25 nov., 06→13 déc. (supplément 600 MAD), 19→26 déc. 2026.",
                "Tarif Nouvel An : départ le 25/12/2026, retour le 01/01/2027.",
                "Vols Royal Air Maroc : AT 910 Casablanca 10h00, Istanbul 16h40 ; AT 911 Istanbul 18h10, Casablanca 21h10.",
                "Les tarifs comprennent : billet Casablanca–Istanbul–Casablanca avec Royal Air Maroc (2 bagages de 23 kg), 7 nuits en petit-déjeuner, transferts aéroport–hôtel–aéroport, dîner-croisière sur le Bosphore.",
                "Les tarifs ne comprennent pas : dépenses personnelles, excursions en option, port de bagages, extras et pourboires, repas non mentionnés.",
                "Excursions en option (par personne) : croisière sur le Bosphore 400 MAD ; visite guidée d’une journée avec guide anglophone 1 300 MAD (billet Hagia Sophia non inclus, supplément 300 MAD) ; Îles des Princesses 350 MAD ; Bursa 450 MAD.",
                "Jour 1 : Casablanca–Istanbul, accueil et transfert à l’hôtel. Jours 2 à 7 : journées libres avec petit-déjeuner à l’hôtel, excursions en option. Jour 8 : transfert à l’aéroport et retour à Casablanca.",
                "Tarifs par personne en MAD. Un seul enfant ou bébé partageant la chambre des parents."
            ]
        }
    },
    {
        "id": "package-egypt",
        "category": "package",
        "title": "Séjours en Égypte",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pyramids_in_Giza_-_Egypt.jpg?width=1600",
        "stars": "10N / 11J · Vol Inclus",
        "meal": "PC / AI",
        "location": "Égypte",
        "equipments": [
            "Caire 5★",
            "Croisière Nil",
            "Hurghada 5★",
            "Vol direct"
        ],
        "startingPrice": 17800,
        "priceLabel": "Double / pers (All Inclusives)",
        "description": "Découverte du Caire, croisières sur le Nil et séjours balnéaires (Sharm El Sheikh / Hurghada).",
        "details": {
            "tableHeader": [
                "Formule Chambre",
                "Tarif par Personne (TTC)"
            ],
            "tableRows": [
                [
                    "Chambre Double (Adulte)",
                    "17 800 MAD"
                ],
                [
                    "Chambre Triple (Adulte)",
                    "17 600 MAD"
                ],
                [
                    "Supplément Chambre Single",
                    "+4 900 MAD"
                ],
                [
                    "Enfant (2 à 5.99 ans) - Sans lit",
                    "7 500 MAD"
                ],
                [
                    "1er Enfant (6 à 11.99 ans) - Lit supp.",
                    "12 000 MAD"
                ]
            ],
            "notes": [
                "Inclus : 3 nuits Le Caire Marriott 5★ (BB), 1 nuit en Train-couchettes (DP), 3 nuits en Croisière 5★ (PC), 3 nuits Hurghada Marriott 5★ (Soft All-Inclusive).",
                "Vols réguliers Casablanca - Le Caire - Hurghada - Le Caire - Casablanca.",
                "Visites guidées incluses : Pyramides, Sphinx, Louxor, Assouan, temples d'Abou Simbel.",
                "Départs confirmés : 23/08, 30/08 et 06/09/2026. Frais de visa en sus (600 MAD)."
            ]
        }
    }
];

// Photos : déposer 1.jpg à 5.jpg dans assets/photos/<id>/ (voir README.txt)
OFFERS_DATA.forEach(o => {
    o.images = [1, 2, 3, 4, 5].map(n => 'assets/photos/' + o.id + '/' + n + '.jpg');
    if (!/^https?:/.test(o.image || '')) o.image = o.images[0];
});

// Photos officielles (sites des établissements)
const PHOTO_SOURCES = {
    'trianon-appart': ['https://www.residencetrianon.ma/images/jpg/p1-accueil-1.jpg','https://www.residencetrianon.ma/images/jpg/pic_residence1-accueil-1.jpg','https://www.residencetrianon.ma/images/resource/appartements-deluxe.jpg','https://www.residencetrianon.ma/images/resource/duplex-prestige.jpg','https://www.residencetrianon.ma/images/resource/room-5.jpg'],
    'les-palmiers': ['assets/photos/les-palmiers/1.jpg','assets/photos/les-palmiers/2.jpg','assets/photos/les-palmiers/3.jpg','assets/photos/les-palmiers/4.jpg','assets/photos/les-palmiers/5.jpg','assets/photos/les-palmiers/6.jpg'],
    'aqua-fun-club': ['https://image-tc.galaxy.tf/wijpeg-3ysbt4bod5rlslmcn9fknkq2n/royale-suite.jpg?width=3840','https://image-tc.galaxy.tf/wijpeg-belzdzz8ers4tob2m5gib1be1/pickalbatros-aqua-fun-club-resort-in-marrakech.jpg?width=3840','https://image-tc.galaxy.tf/wijpeg-17pzbufyc69g40t2pxmjyxr4z/kids-aqua-park.jpg?width=3840'],
    'hotel-du-golf': ['https://image-tc.galaxy.tf/wijpeg-6ydpc5mq3t096l9jk09ce9oxl/golf-court.jpg?width=3840'],
    'kasbah-ourika': ['assets/photos/kasbah-ourika/1.jpg','https://lakasbahdourika.com/wp-content/uploads/2026/05/Piscine.jpg','https://lakasbahdourika.com/wp-content/uploads/2026/05/Chambre-double-b1-1180x710.jpg','https://lakasbahdourika.com/wp-content/uploads/2026/05/Deluxe-suite-2-1180x710.jpg','https://lakasbahdourika.com/wp-content/uploads/2026/05/spa.jpg','https://lakasbahdourika.com/wp-content/uploads/2026/04/Salon4-pref.jpg'],
    'al-maaden-villa': ['assets/photos/al-maaden/1.jpg','https://almaadenvillahotel.com/static/img/Maaden_Villa&Riad_112%20(Moyen).3bf51bb.jpg','https://almaadenvillahotel.com/static/img/golf-1.97268ff.jpg'],
    'prestigia-marrakech': ['assets/photos/prestigia/hd-1.jpg','assets/photos/prestigia/hd-2.jpg','assets/photos/prestigia/hd-3.jpg','assets/photos/prestigia/hd-4.jpg','assets/photos/prestigia/hd-5.jpg'],
    'palm-plaza': ['assets/photos/palm-plaza/1.jpg'],
    'palm-plaza-residence': ['assets/photos/palm-plaza/residence-1.jpg'],
    'al-kawatar': ['assets/photos/al-kawatar/2.jpg','assets/photos/al-kawatar/1.avif'],
    'ola-blanca': ['assets/photos/ola-blanca/1.jpg','assets/photos/ola-blanca/2.webp','assets/photos/ola-blanca/3.jpg'],
    'adam-park': ['https://rate.picscache.com/images/11232/upload/edbd6144bf3c18ea739b278e265fdfa0.jpg','https://rate.picscache.com/images/11232/upload/8f6075b56e7d6c6daf493eed956f8365.jpg','https://rate.picscache.com/images/11232/upload/ac667118e3def7ac91ba7387c68fcd1b.jpg'],
    'aurocher': ['https://aurocher.com/wp-content/uploads/2025/10/Vue-aerienne-de-lHotel-Aurocher-Oukaimeden-au-coeur-des-montagnes-du-Haut-Atlas.jpg','https://aurocher.com/wp-content/uploads/2023/05/bateau-Aurocher.jpg','https://aurocher.com/wp-content/uploads/2025/10/Terrasse-panoramique-du-restaurant-Aurocher-Oukaimeden-–-Vue-sur-les-montagnes-du-Haut-Atlas-1.jpg','https://aurocher.com/wp-content/uploads/2024/03/terrasse-piscine.jpg'],
    'kech-boutique': ['https://kech-hotel.ma/wp-content/uploads/2025/04/DSC9970-scaled.webp','https://kech-hotel.ma/wp-content/uploads/2025/04/DSC0499-819x1024.webp'],
    'kalyptus': ['assets/photos/kalyptus/4.jpg','assets/photos/kalyptus/5.webp','https://kalyptusluxurycamp.com/images/hd/suites/Tente-Deluxe.jpg','https://kalyptusluxurycamp.com/images/rooms/prestige/Prestige_tent_1.jpg'],
    'lemnaouar': ['https://www.lemnaouarergcamp.com/album/royale/IMG_9928_2.jpg','https://www.lemnaouarergcamp.com/album/royale/IMG_9926_2.jpg','https://www.lemnaouarergcamp.com/album/longe-services/restaurant-loung-erg-6.jpeg','https://www.lemnaouarergcamp.com/album/1571392363-20140830_Install_Mariage_0152.jpg','https://www.lemnaouarergcamp.com/album/accueil/IMG_9871.jpg'],
    'hilton-houara': ['https://www.hilton.com/im/en/TNGAHHI/25155523/dsc-5907-final-1.jpg?impolicy=crop&cw=5000&ch=2799&gravity=NorthWest&xposition=0&yposition=266&rw=1280&rh=717','https://www.hilton.com/im/en/TNGAHHI/27189506/dsc-3363-final-a.jpg?impolicy=crop&cw=5000&ch=2799&gravity=NorthWest&xposition=0&yposition=266&rw=1280&rh=717','https://www.hilton.com/im/en/TNGAHHI/23676167/dsc-3306-final-2.jpg?impolicy=crop&cw=5000&ch=2799&gravity=NorthWest&xposition=0&yposition=232&rw=1280&rh=717','https://www.hilton.com/im/en/TNGAHHI/9661486/tngah-pool-1.jpg?impolicy=crop&cw=5286&ch=2959&gravity=NorthWest&xposition=0&yposition=282&rw=1280&rh=717','https://www.hilton.com/im/en/TNGAHHI/10236446/tngah-lobby-4.jpg?impolicy=crop&cw=6000&ch=3359&gravity=NorthWest&xposition=0&yposition=322&rw=1280&rh=717'],
    'ermitage-akchour': ['https://akchourermitage.com/home/wp-content/uploads/2022/05/Ermitage-Fautegraphe-22-scaled.jpg','https://akchourermitage.com/home/wp-content/uploads/2022/11/Ermitage-Fautegraphe-16-scaled-1.jpg','https://akchourermitage.com/home/wp-content/uploads/2022/05/Ermitage-Fautegraphe-34-scaled.jpg','https://akchourermitage.com/home/wp-content/uploads/2022/11/DSC00232-scaled.jpg','https://akchourermitage.com/home/wp-content/uploads/2022/11/DSC00086-borj-scaled.jpg'],
    'vichy-thermalia': ['https://www.moulay-yacoub-vichy-thermalia-spa-hotel.fr/sites/www.vichy-spa-hotel.fr/files/styles/slider1600x625/public/slide/slidehome-chambre.jpg?itok=RiEtjFgk','https://www.moulay-yacoub-vichy-thermalia-spa-hotel.fr/sites/www.vichy-spa-hotel.fr/files/styles/slider1600x625/public/slide/slidehome-piscine_thermale_fr.jpg?itok=lKXV-E3v','https://www.moulay-yacoub-vichy-thermalia-spa-hotel.fr/sites/www.vichy-spa-hotel.fr/files/styles/slider1600x625/public/slide/slidehome-resto_le_mineral.jpg?itok=LbJTIQmy','https://www.moulay-yacoub-vichy-thermalia-spa-hotel.fr/sites/www.vichy-spa-hotel.fr/files/styles/hotel340x180/public/03_1.jpg?itok=E5jjTpkq','https://www.moulay-yacoub-vichy-thermalia-spa-hotel.fr/sites/www.vichy-spa-hotel.fr/files/styles/hotel340x180/public/img_1293.jpg?itok=M84i9ofc'],
    'ifrane-palace': ['assets/photos/ifrane-palace/1.jpg','assets/photos/ifrane-palace/2.webp','assets/photos/ifrane-palace/3.webp','assets/photos/ifrane-palace/4.jpg'],
    'widiane-suite': ['assets/photos/widiane/1.jpg','https://cdn.prod.website-files.com/62b19b3879e1687dbbfc1a06/62da95bbd7265dc0d101f17d_HOME%20HERO.jpg','https://cdn.prod.website-files.com/62b19b3879e16886f2fc1a0f/62b2009009d7a421a1fd5112_Calque%2028%20(1).jpg','https://cdn.prod.website-files.com/62b19b3879e1687dbbfc1a06/62d54c250e8043768ca00da7_exp%201.jpg','https://cdn.prod.website-files.com/62b19b3879e1687dbbfc1a06/62d54c2e7a8ed589be570d06_exp%202.jpg','https://cdn.prod.website-files.com/62b19b3879e1687dbbfc1a06/65ce22270098cce7f384ebcd_WIDIANE%C2%A9alexandrechaplier_web-91.jpg'],
    'casa-chahd': ['assets/photos/casa-chahd/1.jpg','assets/photos/casa-chahd/2.webp','assets/photos/casa-chahd/3.jpg','assets/photos/casa-chahd/4.jpg','assets/photos/casa-chahd/5.jpg'],
    'istanbul-oct': ['assets/photos/istanbul-oct/1.jpg','assets/photos/istanbul-oct/2.jpg','assets/photos/istanbul-oct/3.jpg','assets/photos/istanbul-oct/4.jpg','assets/photos/istanbul-oct/5.jpg'],
    'istanbul-nov-dec': ['assets/photos/istanbul-nov-dec/1.jpg','assets/photos/istanbul-nov-dec/2.jpg','assets/photos/istanbul-nov-dec/3.jpg','assets/photos/istanbul-nov-dec/4.jpg','assets/photos/istanbul-nov-dec/5.jpg'],
    'omra-oct': ['assets/photos/omra-oct/1.jpg'],
    'omra-oct-12j': ['assets/photos/omra-oct-12j/1.jpg'],
    'omra-nov': ['assets/photos/omra-nov/1.jpg'],
    'package-egypt': ['https://commons.wikimedia.org/wiki/Special:FilePath/Pyramids_in_Giza_-_Egypt.jpg?width=1600'],
    'dunes-dakhla': ['assets/photos/dunes-dakhla/1.jpg'],
    'la-crique': ['assets/photos/la-crique/1.jpg'],
    'westpoint': ['assets/photos/westpoint/1.jpg'],
    'lagon-energy': ['assets/photos/lagon-energy/1.jpg'],
    'pk25': ['assets/photos/pk25/1.jpg'],
    'dakhla-attitude': ['assets/photos/dakhla-attitude/1.jpg'],
    'ramo-flores': ['assets/photos/ramo-flores/1.jpg'],
    'sungo-club': ['https://image-tc.galaxy.tf/wijpeg-ew9234s1vdt0crcwl1x9zh943/amenities-attributes-27_wide.jpg?crop=0%2C420%2C1920%2C1080&width=1920','https://image-tc.galaxy.tf/wijpeg-7r4tawxu75g62sgpvqlgi1ny5/sports-courts-6_wide.jpg?crop=0%2C104%2C2000%2C1125&width=1920','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/b9/29/eb/overview.jpg?w=900&h=500&s=1','images%20528.jpg'],
    'le-tanger': ['https://letanger.com/wp-content/uploads/2025/10/PAR0373-1024x563.jpg','https://letanger.com/wp-content/uploads/2025/10/2-6.jpg','https://letanger.com/wp-content/uploads/2025/09/7.jpg','https://letanger.com/wp-content/uploads/2025/09/FATA-MORGANA-3-Septembre-186-sur-93-scaled.jpg','https://letanger.com/wp-content/uploads/2025/09/20200220_04624.jpg']
};
Object.keys(PHOTO_SOURCES).forEach(id => {
    const o = OFFERS_DATA.find(x => x.id === id);
    if (o) { o.images = PHOTO_SOURCES[id]; o.image = o.images[0]; }
});
const le = OFFERS_DATA.find(x => x.id === 'le-tanger');
if (le) {
    le.equipments = ['2 piscines à débordement', 'Piscines privées', 'Vue mer', 'Cuisine équipée', 'Parking gratuit'];
    le.description = 'Appartements et suites entièrement équipés, certains avec piscine privée, entre mer et collines face au Cap Malabata. Deux piscines à débordement, ménage quotidien et centre-ville de Tanger à environ 8 minutes.';
    le.details.notes = ['Penthouse, appartements 1 et 2 chambres, suites et studios.', 'Check-in de 15h00 à 23h30, départ jusqu\u2019à 12h00.', 'Wi-Fi gratuit, climatisation, parking privé gratuit.', 'Tarif négocié communiqué par le service Corporate Wander sur demande.'];
}

const am = OFFERS_DATA.find(x => x.id === 'al-maaden-villa');
if (am) {
    am.equipments = ['Villa avec piscine privée', 'Golf 18 trous', 'Spa & hammam', 'Jardin privé', '2 à 4 chambres'];
    am.description = 'Villas de luxe d\u2019inspiration marocaine ouvertes sur le golf, avec jardin et piscine privée. Quatre catégories : Standard, Privilège, Deluxe et Prestige, de 2 à 4 chambres.';
    am.details.notes = ['Villa Standard : 2 chambres, 332 à 424 m², piscine privée de 35 m².', 'Villa Privilège : 3 chambres, 381 à 452 m², piscine privée de 40 m².', 'Villa Deluxe : 3 chambres, 530 à 650 m², piscine privée de 45 m², toit-terrasse avec solarium.', 'Villa Prestige : 4 chambres, 700 m², patio et toit-terrasse avec solarium.', 'Tarifs des autres catégories sur demande. Séjour minimum : 2 nuits. Petit-déjeuner inclus.'];
}

const tr = OFFERS_DATA.find(x => x.id === 'trianon-appart');
if (tr) {
    tr.location = 'Marrakech (Palmeraie)';
    tr.equipments = ['Piscine', 'Padel', 'Fitness', 'Kids Club', 'Résidence sécurisée'];
    tr.description = 'Résidence hôtelière de luxe à Bab Atlas, dans la Palmeraie, à 15 minutes du centre. 22 appartements de deux chambres, 3 duplex de trois chambres et 2 villas avec piscine privée, avec services hôteliers.';
    tr.details.notes = ['Appartements Deluxe : 13 unités, 142 à 148 m². Appartements Prestige : 9 unités, 157 à 222 m².', 'Duplex Deluxe (238 m²), Duplex Prestige (396 m²) et 2 villas Prestige avec piscine privée.', 'À 20 minutes de l\u2019aéroport de Marrakech et 15 minutes des golfs Royal, Amelkis et Al Maaden.', 'Prestations hôtelières complètes incluses : ménage, sécurité, accès piscine.'];
}

const ob = OFFERS_DATA.find(x => x.id === 'ola-blanca');
if (ob) {
    ob.location = 'Sidi Rahal (Dar Bouazza)';
    ob.equipments = ['Pieds dans l\u2019eau', 'Jusqu\u2019à 7 piscines', 'Appartements 1 à 2 chambres', 'Cuisine américaine équipée', 'Balcon ou terrasse'];
    ob.description = 'Complexe résidentiel balnéaire sur la plage de Sidi Rahal, à environ 20 minutes de Casablanca sur la route d\u2019Azemmour. Appartements de vacances avec salon ouvert sur cuisine américaine équipée, salle de bain et balcon ou terrasse.';
}

// --- Tarifs octobre 2026 à janvier 2027 ---
const PRICE_UPDATES = {
 "sungo-club": {
  "priceLabel": "Chambre / Nuit",
  "meal": "All Inclusive",
  "start": 1550,
  "header": [
   "Chambre",
   "01–04 oct.",
   "05–15 oct.",
   "16–29 oct.",
   "30–31 oct.",
   "Novembre",
   "01–23 déc.",
   "24–31 déc."
  ],
  "rows": [
   [
    "Single",
    "2 075 MAD",
    "2 338 MAD",
    "3 650 MAD",
    "2 513 MAD",
    "1 550 MAD",
    "1 550 MAD",
    "2 600 MAD"
   ],
   [
    "Double Deluxe (2+1)",
    "2 350 MAD",
    "2 650 MAD",
    "3 650 MAD",
    "2 850 MAD",
    "1 750 MAD",
    "1 750 MAD",
    "2 950 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par chambre, All Inclusive, hors taxes de séjour. Janvier 2027 : tarif communiqué sur demande.",
   "Supplément vue piscine : 200 MAD par nuit et par chambre. Supplément Swim-up : 500 MAD par nuit et par chambre.",
   "Dîner de Noël : 1 100 MAD. Dîner de la Saint-Sylvestre : 1 540 MAD.",
   "Enfants : gratuit de 0 à 2 ans. 1er enfant de 2 à 11,99 ans gratuit. 2ème enfant de 2 à 11,99 ans : 25 % du tarif de la chambre."
  ]
 },
 "adam-park": {
  "priceLabel": "Chambre / Nuit",
  "meal": "Petit-déjeuner",
  "start": 1250,
  "header": [
   "Chambre",
   "Octobre",
   "Novembre",
   "01–25 déc.",
   "26 déc.–04 janv.",
   "05–31 janv."
  ],
  "rows": [
   [
    "Standard Single",
    "1 400 MAD",
    "1 300 MAD",
    "1 250 MAD",
    "1 400 MAD",
    "1 300 MAD"
   ],
   [
    "Standard Double",
    "1 500 MAD",
    "1 400 MAD",
    "1 350 MAD",
    "1 500 MAD",
    "1 400 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par chambre, petit-déjeuner inclus, hors taxes.",
   "Demi-pension : 300 MAD par personne et par repas. Chambre Deluxe : +500 MAD par nuit. Suite Prestige : +800 MAD par nuit.",
   "Dîner de Noël : 850 MAD par personne (facultatif). Dîner de la Saint-Sylvestre : 1 900 MAD par personne (obligatoire).",
   "Bébés de 0 à 1,99 an : gratuit, lit bébé fourni. Enfants de 2 à 11,99 ans : 50 % sur l’arrangement dans la chambre des parents. 3ème personne : 15 % de réduction.",
   "Taxes touristiques : 28,60 MAD par personne et par nuit. Annulation à moins de 48 h : 50 % de la 1ère nuit."
  ]
 },
 "kech-boutique": {
  "priceLabel": "Chambre / Nuit",
  "meal": "Petit-déjeuner",
  "start": 920,
  "header": [
   "Chambre",
   "Octobre",
   "Nov.–20 déc.",
   "21 déc.–05 janv."
  ],
  "rows": [
   [
    "Supérieure Single",
    "1 035 MAD",
    "920 MAD",
    "1 035 MAD"
   ],
   [
    "Supérieure Double / Twin",
    "1 140 MAD",
    "1 030 MAD",
    "1 140 MAD"
   ],
   [
    "Deluxe ou Vue Piscine Single",
    "1 300 MAD",
    "1 185 MAD",
    "1 300 MAD"
   ],
   [
    "Deluxe ou Vue Piscine Double",
    "1 405 MAD",
    "1 295 MAD",
    "1 405 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par chambre, petit-déjeuner inclus. Hôtel fermé pour rénovation du 6 janvier au 30 avril 2027.",
   "Demi-pension : 200 MAD par adulte. Pension complète : 400 MAD par adulte (enfants de 4 à 12 ans à -50 %).",
   "Dîner de la Saint-Sylvestre (obligatoire le 31/12) : 1 600 MAD par adulte. Minimum 3 nuits du 28/12 au 01/01/2027.",
   "Enfants : gratuit de 0 à 4 ans en petit-déjeuner. De 5 à 11,99 ans : 50 % du tarif adulte. Dès 12 ans : plein tarif.",
   "Taxe de séjour : 16,50 MAD par personne et par nuit. Annulation sans frais jusqu’à 48 h avant l’arrivée."
  ]
 },
 "ifrane-palace": {
  "priceLabel": "Suite / Nuit",
  "meal": "Petit-déjeuner",
  "start": 870,
  "header": [
   "Suite",
   "Octobre",
   "Novembre",
   "Déc. hors fêtes",
   "Janvier"
  ],
  "rows": [
   [
    "Suite (2 personnes)",
    "870 MAD",
    "870 MAD",
    "870 MAD",
    "870 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par suite pour 2 personnes, petit-déjeuner inclus. Tarif de fin d’année sur demande.",
   "Repas par personne à partir de 220 MAD. Tarif groupe dès 10 suites : sur demande.",
   "Enfants de moins de 12 ans : hébergement de 2 enfants gratuit. Moins de 6 ans : -50 % sur la demi-pension ou pension complète.",
   "Taxe de séjour : 29 MAD par personne et par nuit. Annulation sans frais jusqu’à 10 jours avant l’arrivée."
  ]
 },
 "dakhla-attitude": {
  "priceLabel": "Bungalow / Nuit",
  "meal": "Pension complète",
  "start": 1000,
  "header": [
   "Bungalow",
   "Haute saison",
   "Intermédiaire",
   "Basse saison"
  ],
  "rows": [
   [
    "Windhunter Single",
    "1 396 MAD",
    "1 283 MAD",
    "1 000 MAD"
   ],
   [
    "Windhunter Double",
    "1 963 MAD",
    "1 793 MAD",
    "1 340 MAD"
   ],
   [
    "Windhunter Premium Double",
    "2 212 MAD",
    "2 019 MAD",
    "1 566 MAD"
   ],
   [
    "Dragon Camp Double",
    "2 212 MAD",
    "2 019 MAD",
    "1 566 MAD"
   ],
   [
    "VIP A Double",
    "3 010 MAD",
    "2 735 MAD",
    "2 405 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par bungalow, pension complète et transferts aéroport inclus.",
   "Haute : octobre, 1–8 nov., 23 déc.–4 janv. Intermédiaire : 9–23 nov. Basse : 24 nov.–22 déc. et 5–31 janv.",
   "Séjour minimum 5 nuits en haute saison, 4 nuits en intermédiaire. Offre 7=6 en basse et intermédiaire.",
   "Enfants : gratuit jusqu’à 4 ans. De 4 à 12 ans : 300 MAD par nuit (500 MAD en VIP).",
   "Taxe de séjour : 13 MAD par personne et par nuit."
  ]
 },
 "pk25": {
  "priceLabel": "Bungalow / Nuit",
  "meal": "Tout inclus",
  "start": 1419,
  "header": [
   "Bungalow",
   "Haute saison",
   "Intermédiaire",
   "Basse saison"
  ],
  "rows": [
   [
    "Vue Lagune Single",
    "2 035 MAD",
    "1 736 MAD",
    "1 419 MAD"
   ],
   [
    "Vue Lagune Double",
    "2 643 MAD",
    "2 189 MAD",
    "1 782 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par bungalow, tout inclus et transferts aéroport inclus.",
   "Haute : octobre, 1–8 nov., 23 déc.–4 janv. Intermédiaire : 9–23 nov. Basse : 24 nov.–22 déc. et 5–31 janv.",
   "Tout inclus de 8 h à 23 h (10 boissons alcoolisées ou 20 softs par adulte et par jour). Séjour minimum 5 nuits en haute saison.",
   "Enfants : gratuit jusqu’à 4 ans. De 4 à 12 ans : 300 MAD par nuit.",
   "Taxe de séjour : 13 MAD par personne et par nuit."
  ]
 },
 "lagon-energy": {
  "priceLabel": "Bungalow / Nuit",
  "meal": "Pension complète",
  "start": 1204,
  "header": [
   "Bungalow",
   "Haute saison",
   "Intermédiaire",
   "Basse saison"
  ],
  "rows": [
   [
    "Young Blood Single",
    "1 532 MAD",
    "1 442 MAD",
    "1 204 MAD"
   ],
   [
    "Young Blood Double",
    "2 246 MAD",
    "2 042 MAD",
    "1 680 MAD"
   ],
   [
    "Pacha Lodge Double",
    "2 869 MAD",
    "2 722 MAD",
    "2 223 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par bungalow, pension complète hors boissons et transferts aéroport inclus.",
   "Haute : octobre, 1–8 nov., 23 déc.–4 janv. Intermédiaire : 9–23 nov. Basse : 24 nov.–22 déc. et 5–31 janv.",
   "Enfants : gratuit jusqu’à 4 ans. De 4 à 12 ans : 300 MAD par nuit.",
   "Taxe de séjour : 10 MAD par personne et par nuit."
  ]
 },
 "westpoint": {
  "priceLabel": "Bungalow / Nuit",
  "meal": "Pension complète",
  "start": 1250,
  "header": [
   "Bungalow",
   "Haute saison",
   "Basse saison"
  ],
  "rows": [
   [
    "Vue Jardin Single",
    "1 536 MAD",
    "1 250 MAD"
   ],
   [
    "Vue Jardin Double",
    "2 119 MAD",
    "1 690 MAD"
   ],
   [
    "Vue Océan Double",
    "2 570 MAD",
    "2 086 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par bungalow, pension complète et transferts aéroport inclus.",
   "Haute : octobre, novembre, 23 déc. et janvier. Basse : 1–22 déc.",
   "Enfants : gratuit jusqu’à 4 ans. De 4 à 12 ans : 300 MAD par nuit.",
   "Taxe de séjour : 10 MAD par personne et par nuit."
  ]
 },
 "la-crique": {
  "priceLabel": "Suite / Nuit",
  "meal": "Demi-pension",
  "start": 1600,
  "header": [
   "Suite",
   "Haute saison",
   "Basse saison"
  ],
  "rows": [
   [
    "Junior VIP Vue Jardin Single",
    "1 963 MAD",
    "1 600 MAD"
   ],
   [
    "Junior VIP Vue Jardin Double",
    "2 416 MAD",
    "1 963 MAD"
   ],
   [
    "Junior Vue Lagune Double",
    "2 756 MAD",
    "2 189 MAD"
   ],
   [
    "Royale Vue Lagune Double",
    "4 000 MAD",
    "4 000 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par suite, demi-pension et transferts aéroport inclus.",
   "Haute : octobre, 1–23 nov., 23 déc.–4 janv. Basse : 24 nov.–22 déc. et 5–31 janv.",
   "Supplément pension complète : 270 MAD par repas et par personne.",
   "Enfants : gratuit jusqu’à 4 ans. De 4 à 12 ans : 320 MAD en basse saison, 400 MAD en haute saison.",
   "Taxe de séjour : 10 MAD par personne et par nuit."
  ]
 },
 "dunes-dakhla": {
  "priceLabel": "Bungalow / Nuit",
  "meal": "Pension complète",
  "start": 1030,
  "header": [
   "Bungalow",
   "Haute saison",
   "Basse saison"
  ],
  "rows": [
   [
    "Single",
    "1 250 MAD",
    "1 030 MAD"
   ],
   [
    "Double",
    "1 745 MAD",
    "1 426 MAD"
   ]
  ],
  "notes": [
   "Prix par nuit et par bungalow, pension complète hors boissons et transferts aéroport inclus.",
   "Haute : octobre, 1–5 nov., 20 déc.–8 janv. Basse : 6 nov.–19 déc. et 9–31 janv.",
   "Enfants : gratuit jusqu’à 4 ans. De 4 à 12 ans : 300 MAD par nuit.",
   "Taxe de séjour : 10 MAD par personne et par nuit."
  ]
 }
};
PRICE_UPDATES['kasbah-ourika'] = {"start":1550,"priceLabel":"Chambre / Nuit","meal":"Petit-déjeuner / Demi-pension","header":["Catégorie","Single BB","Double BB","Single DP","Double DP","Quadruple BB","Quadruple DP"],"rows":[["Chambre Standard","1 550 MAD","1 650 MAD","1 750 MAD","2 050 MAD","—","—"],["Suite Junior","1 750 MAD","1 850 MAD","1 950 MAD","2 250 MAD","—","—"],["Suite Deluxe","2 150 MAD","2 250 MAD","2 350 MAD","2 650 MAD","—","—"],["Suite Présidentielle (80 m², 2 ch.)","3 450 MAD","3 750 MAD","3 650 MAD","4 150 MAD","3 950 MAD","4 550 MAD"]],"notes":["Prix par nuit et par chambre, nets de commission, TVA incluse. Fin d’année (25/12 au 04/01) : séjour minimum 2 nuits.","3ème personne : supplément adulte 400 MAD en BB, 600 MAD en DP. Enfant : 300 MAD en BB, 450 MAD en DP (couchage sur canapé en suite).","Déjeuner ou dîner : adulte à partir de 170 MAD, enfant de moins de 12 ans 140 MAD. Forfait softs : 75 MAD.","Acompte de 30 % à la confirmation, solde 10 jours avant l’arrivée. Annulation de 30 à 7 jours : 30 % ; moins de 7 jours : 100 %."]};
PRICE_UPDATES['lemnaouar'] = {"start":1710,"priceLabel":"Tente / Nuit","meal":"Demi-pension (balade en dromadaire incluse)","header":["Tente","Double DP","Single DP"],"rows":[["Tente Luxe","2 120 MAD","1 710 MAD"],["Tente Luxe Master","3 020 MAD","2 610 MAD"],["Tente Région","3 840 MAD","3 430 MAD"],["Tente Royale","6 710 MAD","6 300 MAD"]],"notes":["Prix par nuit et par tente, demi-pension avec balade à dromadaire au coucher du soleil. Valable du 01/11/2026 au 31/10/2027 : octobre 2026, tarif sur demande.","Fin d’année (29/12 au 02/01) : minimum 2 nuits, demi-pension obligatoire, dîner de fête avec animation saharienne à confirmer.","Enfants : gratuit de 0 à 4 ans. De 4 à 12 ans : -50 % sur le régime des parents. Au-delà de 4 ans : 500 MAD par nuit avec petit-déjeuner. Lit d’appoint : 700 MAD avec petit-déjeuner.","Repas supplémentaire : 350 MAD hors boissons. Taxe de séjour : 11 MAD par personne et par nuit."]};
PRICE_UPDATES['ermitage-akchour'] = {"start":1680,"priceLabel":"Chalet / Nuit","meal":"Petit-déjeuner","header":["Hébergement","Saison Montagnes (01/11–18/12 et 05/01–09/03)","Sources / Fêtes (19/12–04/01)"],"rows":[["Chalet Ermitage","1 680 MAD","2 040 MAD"],["Chalet Suédois","2 130 MAD","2 490 MAD"],["Suite","2 670 MAD","3 030 MAD"]],"notes":["Prix net agence par nuit, single ou double, petit-déjeuner inclus, TVA incluse. Octobre 2026 : tarif sur demande (contrat dès le 01/11/2026).","Week-ends : séjour minimum 2 nuits (vendredi-samedi ou samedi-dimanche).","Enfants : gratuit de 0 à 4 ans (2 enfants maximum par chalet). De 4 à 12 ans : 200 MAD par enfant, -50 % sur la restauration. 3ème et 4ème personne (+12 ans) : 400 MAD.","Demi-pension : 380 à 480 MAD par personne. Pension complète : 760 à 960 MAD par personne.","Taxes : 36 MAD par personne et par nuit (taxe de séjour 25 MAD + TPT 11 MAD)."]};
PRICE_UPDATES['vichy-thermalia'] = {"start":1290,"priceLabel":"Chambre / Nuit","meal":"Petit-déjeuner","header":["Chambre","Double semaine","Double week-end","Single semaine","Single week-end"],"rows":[["Classic King ou Twin","1 450 MAD","1 490 MAD","1 290 MAD","1 360 MAD"],["Superior King","1 630 MAD","1 650 MAD","1 470 MAD","1 530 MAD"],["Suite Deluxe","2 450 MAD","2 550 MAD","2 290 MAD","2 390 MAD"]],"notes":["Prix net par nuit et par chambre, petit-déjeuner inclus. Haute saison du 01/10 au 31/12/2026 (fêtes comprises).","Déjeuner ou dîner : 240 MAD par personne. Réduction de 10 % sur les soins du spa et des thermes. 3ème personne en Suite Deluxe : 410 MAD.","Bébé de 0 à 2 ans : lit bébé gratuit (1 par chambre). Enfant dans la chambre de 2 adultes : -50 % (lit d’appoint ou canapé-lit).","Minimum 2 nuits les week-ends en haute saison. Taxe de séjour à payer sur place."]};
PRICE_UPDATES['aqua-fun-club'] = {"start":1988,"priceLabel":"Chambre / Nuit","meal":"Tout inclus, parc aquatique inclus","header":["Chambre","Octobre","Nov.–20 déc.","21–31 déc.","01–22 janv.","23–31 janv."],"rows":[["Single Standard","2 775 MAD","1 988 MAD","2 775 MAD","1 988 MAD","2 775 MAD"],["Double Standard","3 150 MAD","2 250 MAD","3 150 MAD","2 250 MAD","3 150 MAD"]],"notes":["Prix net par nuit et par chambre, tout inclus avec accès au parc aquatique.","Enfants : bébé de 0 à 3,99 ans gratuit. 1er enfant de 4 à 11,99 ans gratuit dans la chambre des parents. 2ème enfant et suivants : 500 MAD en basse saison, 600 MAD en moyenne saison.","3ème adulte : 800 MAD (basse), 900 MAD (moyenne). Chambre familiale : +500 MAD. Large familiale : +700 MAD. Vue piscine : 200 MAD par nuit.","Dîner de Noël (obligatoire) : 800 MAD par adulte. Dîner du Nouvel An (obligatoire) : 1 000 MAD par adulte. Enfants : -50 %.","Taxe de séjour : 30,80 MAD par personne et par nuit."]};
PRICE_UPDATES['kalyptus'] = {"start":1892,"priceLabel":"Tente / Nuit","meal":"Petit-déjeuner / Demi-pension","header":["Tente","Single BB","Double BB","Single DP","Double DP"],"rows":[["Tente Deluxe","1 892 MAD","2 020 MAD","2 162 MAD","2 564 MAD"],["Tente Prestige douche italienne","2 742 MAD","2 870 MAD","3 014 MAD","3 414 MAD"],["Tente Prestige baignoire à jet","2 997 MAD","3 125 MAD","3 269 MAD","3 669 MAD"],["Tente Présidentielle","3 847 MAD","3 975 MAD","4 119 MAD","4 519 MAD"],["Tente Royale","5 547 MAD","5 675 MAD","5 819 MAD","6 219 MAD"]],"notes":["Prix net par nuit et par tente. Valable du 01/11/2026 au 31/10/2027 : octobre 2026, tarif sur demande.","Fin d’année (29/12 au 02/01) : demi-pension obligatoire et non remboursable, dîner de fin d’année à confirmer.","Enfants : gratuit de 0 à 4 ans. De 4 à 12 ans : -50 % sur le régime des parents. Au-delà de 4 ans : 700 MAD par nuit avec petit-déjeuner. Lit d’appoint : 700 MAD avec petit-déjeuner.","Taxe de séjour : 30 MAD par personne et par nuit."]};
PRICE_UPDATES['hotel-du-golf'] = {"start":3210,"priceLabel":"Chambre / Nuit","meal":"Tout inclus · Adults Only +16","header":["Chambre","Octobre 2026"],"rows":[["Premium Garden View Single","3 210 MAD"],["Premium Garden View Double","3 750 MAD"],["Premium Garden View Triple","5 010 MAD"]],"notes":["Prix net par nuit et par chambre, tout inclus, réservé aux adultes (+16 ans). La grille reçue couvre octobre 2026 (peak season, jusqu’au 31/10) : novembre 2026 à janvier 2027, tarif sur demande."]};
PRICE_UPDATES['hilton-houara'] = {"start":1450,"priceLabel":"Chambre / Nuit","meal":"Petit-déjeuner","header":["Chambre","Octobre","Novembre","Déc. (hors fêtes)","Noël / Nouvel An","Janvier 2027"],"rows":[["Deluxe Single","1 750 MAD","1 450 MAD","1 450 MAD","—","1 450 MAD"],["Deluxe Double","1 850 MAD","1 550 MAD","1 550 MAD","2 350 MAD","1 550 MAD"]],"notes":["Prix par nuit et par chambre, petit-déjeuner inclus.","Demi-pension : +320 MAD par personne et par nuit. Supplément Vue Océan : +250 MAD par nuit.","Enfants : gratuit jusqu’à 11,99 ans dans la chambre des parents. Berceau offert jusqu’à 2 ans.","Taxe de séjour : 39,60 MAD par personne et par nuit. Annulation sans frais jusqu’à 7 jours avant l’arrivée."]};
PRICE_UPDATES['le-tanger'] = {"start":650,"priceLabel":"Appartement / Nuit","meal":"Logement seul","header":["Hébergement","Octobre – Novembre","01–20 déc.","21–31 déc.","01–18 janv.","19–31 janv."],"rows":[["Studio Vue Piscine","650 MAD","650 MAD","1 230 MAD","1 230 MAD","650 MAD"],["Appartement 1 chambre Vue Mer","850 MAD","850 MAD","1 766 MAD","1 766 MAD","850 MAD"],["Suite Garden View","850 MAD","850 MAD","1 415 MAD","1 415 MAD","850 MAD"],["Appartement 1 chambre Panoramique","1 050 MAD","1 050 MAD","2 054 MAD","2 054 MAD","1 050 MAD"],["Suite Piscine privée","1 050 MAD","1 050 MAD","1 806 MAD","1 806 MAD","1 050 MAD"],["Appartement 1 chambre Piscine privée","1 230 MAD","1 230 MAD","2 526 MAD","2 526 MAD","1 230 MAD"],["Appartement 2 chambres Panoramique (4 pers.)","1 450 MAD","1 450 MAD","2 963 MAD","2 963 MAD","1 450 MAD"],["Penthouse 2 chambres Piscine privée (4 pers.)","1 770 MAD","1 770 MAD","3 714 MAD","3 714 MAD","1 770 MAD"]],"notes":["Prix par nuit et par appartement, logement seul. Haute saison et fêtes du 21/12/2026 au 18/01/2027.","Petit-déjeuner buffet continental : +90 MAD par personne et par jour.","Enfants selon la capacité de chaque hébergement. Lit bébé gratuit sur demande.","Taxe de séjour : 15 MAD par personne et par nuit."]};
PRICE_UPDATES['al-maaden-villa'] = {"start":3450,"priceLabel":"Villa / Nuit","meal":"Petit-déjeuner","header":["Villa","Octobre","Novembre","Déc. (hors fêtes)","Noël / Nouvel An","Janvier 2027"],"rows":[["Villa 2 chambres","3 450 MAD","3 450 MAD","3 450 MAD","—","3 450 MAD"]],"notes":["Prix par nuit et par villa, petit-déjeuner servi en villa inclus.","Fin d’année : tarif sur demande, minimum 3 à 4 nuits.","Capacité jusqu’à 4 adultes et 2 enfants sans supplément d’hébergement. Lit bébé fourni.","Chef privé et soins spa en villa sur devis. Taxe de séjour : 28,60 MAD par adulte et par nuit."]};
PRICE_UPDATES['aurocher'] = {"start":1350,"priceLabel":"Chambre / Nuit","meal":"Petit-déjeuner","header":["Chambre","Toute l’année"],"rows":[["Chambre 1 ou 2 personnes","1 350 MAD"],["Chambre 3 personnes","1 550 MAD"],["Chambre 4 personnes","1 750 MAD"]],"notes":["Prix par nuit et par chambre, petit-déjeuner inclus. Tarif unique toute l’année, sans distinction de saison.","Demi-pension (dîner du terroir) : +250 MAD par personne et par nuit. Déjeuner de passage : 150 MAD par personne.","Randonnées guidées : 150 à 250 MAD par personne selon le groupe. Cours de cuisine : 450 à 500 MAD par personne.","Bébés gratuits de 0 à 1,99 an. Taxe de séjour : 36 MAD par personne et par nuit.","Annulation : sans frais à plus de 30 jours, 30 % entre 30 et 7 jours, 100 % à moins de 7 jours ou en cas de non-présentation."]};
PRICE_UPDATES['palm-plaza'] = {"start":1150,"priceLabel":"Chambre / Nuit","header":["Chambre","Basse saison (01–07 déc., 04–31 janv.)","Moyenne saison (octobre, novembre, 08–29 déc.)","Haute saison (30 déc.–03 janv.)"],"rows":[["Single (1 adulte)","1 150 MAD","1 360 MAD","1 760 MAD"],["Double (2 adultes + 1 enfant)","1 300 MAD","1 510 MAD","1 910 MAD"],["Junior Suite (2 adultes + 1 enfant)","1 900 MAD","2 110 MAD","2 510 MAD"],["Senior Suite (2 adultes + 1 enfant)","2 300 MAD","2 510 MAD","2 910 MAD"]],"notes":["Prix par nuit et par chambre. Haute saison : minimum 2 nuits (30–31 décembre ou 31 décembre–01 janvier), départ non autorisé le 31 décembre.","Dîner de gala du 31/12 obligatoire : 2 000 MAD par personne (enfants de 4 à 11,99 ans : -50 %).","Supplément chambre vue piscine : 200 MAD par nuit.","Annulation, basse saison : gratuite à plus de 4 jours, 1 nuit facturée à J-3. Moyenne saison : gratuite à plus de 16 jours, 1 nuit facturée à J-15, puis 100 %. Haute saison : gratuite à plus de 25 jours, 1 nuit facturée à J-24, puis 100 %.","Annulation tardive (jour d\\u2019arrivée), non-présentation et départ anticipé : 100 % du séjour facturé."]};
Object.entries(PRICE_UPDATES).forEach(([id, u]) => {
    const o = OFFERS_DATA.find(x => x.id === id); if (!o) return;
    o.startingPrice = u.start; o.priceLabel = u.priceLabel; if (u.meal) o.meal = u.meal;
    o.details.tableHeader = u.header; o.details.tableRows = u.rows; o.details.notes = u.notes;
});

// --- PARTNERS NETWORK DATA ---
const PARTNERS_NETWORK_DATA = [
    {
        "city": "Casablanca et environs",
        "hotels": [
            "Ola Blanca (résidence balnéaire familiale)",
            "Ramo Flores (résidence en bord de mer)",
            "Résidence Al Kawatar"
        ]
    },
    {
        "city": "Marrakech et région (Agdal, Palmeraie, Al Maaden, Atlas)",
        "hotels": [
            "Pickalbatros Sungo Club (Hôtel Club 5★ All Inclusive & MICE)",
            "Pickalbatros Aqua Fun Club (complexe familial avec parc aquatique)",
            "Pickalbatros Hotel Du Golf (Adults Only +16)",
            "Palm Plaza Hôtel 5★ & Résidence",
            "Le Trianon (appartements de luxe)",
            "Prestigia (Résidence 1 Trianon et appartements)",
            "Adam Park Marrakech Hotel & Spa",
            "Al Maaden VillaHotel & Spa (villas privées avec piscine)",
            "Kech Boutique Hotel & Spa",
            "La Kasbah d'Ourika (hôtel, restaurant, spa et activités)",
            "Hôtel Aurocher (route de l'Oukaïmeden)",
            "Kalyptus Luxury Camp (Lalla Takerkoust)"
        ]
    },
    {
        "city": "Agadir et Grand Sud",
        "hotels": [
            "Lemnaouar Erg Camp & Bivouac Lemnaouar (Merzouga / Erg Chebbi)",
        ]
    },
    {
        "city": "Nord, Centre et Moyen-Atlas",
        "hotels": [
            "Hilton Al Houara Resort & Spa & Résidence de Charme (Tanger)",
            "Le Tanger Résidence Hôtelière (Tanger)",
            "L'Ermitage d'Akchour & appartements de charme (Chefchaouen)",
            "Vichy Thermalia Spa Hôtel (Moulay Yacoub / Fès)",
            "Ifrane Palace & Domaine Montagne (Ifrane / Oukaïmeden)",
            "Widiane Suite & Spa (Bin El Ouidane)"
        ]
    },
    {
        "city": "Dakhla (Dakhla Hospitality Group)",
        "hotels": [
            "Dakhla Attitude",
            "PK 25",
            "Lagon Energy",
            "Westpoint",
            "La Crique (Nature & Spa)",
            "Dunes de Dakhla"
        ]
    },
    {
        "city": "Packages internationaux et destinations spécifiques",
        "hotels": [
            "Omra : formules clés en main (vol, hébergement proche des lieux saints, transferts, assistance logistique et spirituelle)",
            "Istanbul : circuits, séjours libres ou combinés (vols, hébergements, transferts, visites guidées)",
            "Égypte : Le Caire, croisières sur le Nil, séjours balnéaires (Sharm El Sheikh / Hurghada)",
            "Autres destinations : programmes sur mesure sur demande auprès du service Corporate"
        ]
    }
];



// Comparateur Booking : renseignez l'URL de votre API (réponse JSON attendue : {"price": 1900, "updated": "2026-10-11T10:00:00Z"}, prix par nuit ou par personne, en MAD).
// Test : laissez url vide pour utiliser uniquement les prix saisis manuellement (mode admin, ?admin=1).
const BOOKING_API = { url: '', key: '' };
