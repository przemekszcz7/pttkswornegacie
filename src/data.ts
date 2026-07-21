import { GalleryItem, AttractionItem, AccommodationType } from './types';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    url: 'https://i.ibb.co/rfFNFkdn/645652060-122175493232823864-2357191817385338388-n.jpg',
    title: 'Drewniane domki letniskowe',
    category: 'rooms',
    description: 'Nasze pachnące drewnem, przytulne domki wkomponowane w otoczenie sosnowego lasu.'
  },
  {
    id: 'gal-2',
    url: 'https://i.ibb.co/HpzPyBF7/646397278-122175493676823864-3970029122686148013-n.jpg',
    title: 'Taras biesiadny Tawerny PTTK',
    category: 'tavern',
    description: 'Południowy ogródek restauracyjny w cieniu parasoli. Idealne miejsce na odpoczynek po spływie.'
  },
  {
    id: 'gal-3',
    url: 'https://i.ibb.co/v4BX3GTg/647139236-122175689600823864-183148074851387107-n.jpg',
    title: 'Rustykalne wnętrze naszej Tawerny',
    category: 'tavern',
    description: 'Ciepłe, drewniane elementy wnętrza tawerny tworzące prawdziwie swojski, tradycyjny klimat.'
  },
  {
    id: 'gal-4',
    url: 'https://i.ibb.co/q3P07dQS/646531341-122175689648823864-7407450498153030862-n.jpg',
    title: 'Wnętrze domku – wyposażony aneks',
    category: 'rooms',
    description: 'Nowoczesny i funkcjonalny aneks kuchenny z lodówką, płytą grzewczą i naczyniami w każdym domku.'
  },
  {
    id: 'gal-5',
    url: 'https://i.ibb.co/Vc1XFf7W/648244631-122175689702823864-334907685620694575-n.jpg',
    title: 'Komfortowa, prywatna łazienka',
    category: 'rooms',
    description: 'Każdy z naszych domków posiada nowoczesny węzeł sanitarny z prysznicem i gorącą wodą.'
  },
  {
    id: 'gal-6',
    url: 'https://i.ibb.co/dsdgpTY9/648841696-122175689756823864-6187717430308751029-n.jpg',
    title: 'Zielone pole namiotowe nad brzegiem',
    category: 'rooms',
    description: 'Przestronny teren na rozbicie namiotu lub postawienie przyczepy kempingowej bezpośrednio przy wodzie.'
  },
  {
    id: 'gal-7',
    url: 'https://i.ibb.co/nMFsbK8g/647198338-122175689816823864-1762558048436959119-n.jpg',
    title: 'Przystań wodna Stanicy PTTK',
    category: 'activities',
    description: 'Miejsce wodowania kajaków i startu niezapomnianych spływów krętą rzeką Zbrzycą.'
  },
  {
    id: 'gal-8',
    url: 'https://i.ibb.co/DHrnJHkF/647157796-122175689876823864-7842380236259187078-n.jpg',
    title: 'Prywatny pomost do łowienia',
    category: 'nature',
    description: 'Spokojny pomost wędkarski wychodzący w nurt rzeki Zbrzycy, otoczony malowniczą trzciną.'
  },
  {
    id: 'gal-9',
    url: 'https://i.ibb.co/5gsZrW9G/646136586-122175689930823864-8198842172359801198-n.jpg',
    title: 'Wieczorny klimat przy ognisku',
    category: 'activities',
    description: 'Miejsce na klimatyczne biesiady, gwieździste niebo, ciepło płomieni i wspólny śpiew.'
  },
  {
    id: 'gal-10',
    url: 'https://i.ibb.co/7d1VVg6g/612601370-122167983416823864-1256427580816765474-n.jpg',
    title: 'Zachód słońca nad Zbrzycą',
    category: 'nature',
    description: 'Spektakularne barwy zachodzącego słońca widoczne z tarasów naszych domków.'
  },
  {
    id: 'gal-11',
    url: 'https://i.ibb.co/sv0jxCHJ/540740342-122144381030823864-7901955189446449078-n.jpg',
    title: 'Przystań kajakowa pod nowym szyldem',
    category: 'activities',
    description: ''
  },
  {
    id: 'gal-12',
    url: 'https://i.ibb.co/C3ytTF3g/540741989-122144380484823864-7876530487274947402-n.jpg',
    title: 'Sielankowy widok na jezioro i naszą przystań',
    category: 'nature',
    description: ''
  }
];

export const ATTRACTIONS: AttractionItem[] = [
  {
    id: 'kajaki',
    title: 'Szlaki Kajakowe Zbrzycy i Chociny',
    description: 'Wspaniałe rzeki o czystej wodzie, bogatym ptactwie i unikalnym, meandrującym biegu Borów Tucholskich.',
    iconName: 'Compass',
    imageUrl: 'https://i.ibb.co/nMFsbK8g/647198338-122175689816823864-1762558048436959119-n.jpg',
    details: [
      'Wypożyczalnia nowoczesnego sprzętu bezpośrednio na stanicy',
      'Elastyczne dystanse i trasy dostosowane dla rodzin z dziećmi',
      'Transport kajaków oraz pomoc doświadczonych organizatorów',
      'Połączenie rzeki Zbrzyca z malowniczym Jeziorem Witoczno'
    ]
  },
  {
    id: 'wedkowanie',
    title: 'Pomosty do Łowienia',
    description: 'Oaza spokoju z bezpośrednim dostępem do urokliwych miejsc łowieckich u ujścia rzeki do jezior.',
    iconName: 'Anchor',
    imageUrl: 'https://i.ibb.co/DHrnJHkF/647157796-122175689876823864-7842380236259187078-n.jpg',
    details: [
      'Własne linie brzegowe i bezpieczne, stabilne platformy drewniane',
      'Bogate łowiska: lin, szczupak, okoń, leszcz oraz płoć',
      'Otoczenie dzikiej, nieskażonej przyrody kaszubskich rezerwatów',
      'Możliwość wypożyczenia łódek wiosłowych na miejscu'
    ]
  },
  {
    id: 'rowery',
    title: 'Trasy Rowerowe',
    description: 'Dziesiątki kilometrów oznakowanych tras w sercu Zaborskiego Parku Krajobrazowego i Borów Tucholskich.',
    iconName: 'Bike',
    imageUrl: 'https://i.ibb.co/7d1VVg6g/612601370-122167983416823864-1256427580816765474-n.jpg',
    details: [
      'Bezpośrednio przebiegający słynny Szlak Kaszubski i trasa Kaszubska Marszruta',
      'Trasy o zróżnicowanej trudności – od leśnych traktów po utwardzone ścieżki',
      'Malownicze punkty widokowe i możliwość przypięcia rowerów w bezpiecznym boksie',
      'Mapy rowerowe i propozycje wycieczek dostępne na recepcji'
    ]
  },
  {
    id: 'relaks',
    title: 'Leżaki, Hamaki i Chillout',
    description: 'Błogi wypoczynek i ładowanie baterii w otoczeniu wysokich sosen i uspokajającego szumu fal rzecznych.',
    iconName: 'Sun',
    imageUrl: 'https://i.ibb.co/dsdgpTY9/648841696-122175689756823864-6187717430308751029-n.jpg',
    details: [
      'Strefy hamakowe zawieszone w cieniu pradawnego sosnowego lasu',
      'Wygodne, stabilne drewniane leżaki z widokiem na przystań rzeczną',
      'Brak miejskiego zgiełku i czyste, żywiczne powietrze',
      'Idealne warunki na czytanie książki lub popołudniową drzemkę'
    ]
  },
  {
    id: 'ogniska',
    title: 'Tawerniane Ogniska & Biesiady',
    description: 'Prawdziwy, tradycyjny klimat z płonącym drzewem sosnowym i wspólnym śpiewaniem pod gwieździstym niebem.',
    iconName: 'Flame',
    imageUrl: 'https://i.ibb.co/5gsZrW9G/646136586-122175689930823864-8198842172359801198-n.jpg',
    details: [
      'Duże, zorganizowane i bezpieczne paleniska biesiadne',
      'Dostępne ruszty do pieczenia kiełbasek oraz drewno dębowe/sosnowe',
      'Swojskie przekąski z naszej Tawerny – doskonałe na wieczorne spotkania',
      'Integracja i tradycyjne, żeglarskie piosenki (szanty) w tle'
    ]
  }
];

export const ACCOMMODATIONS: AccommodationType[] = [
  {
    id: 'cottage',
    title: 'Przytulne Domki letniskowe',
    subtitle: 'Noclegi z prywatną łazienką i aneksem kuchennym',
    description: 'Poczuj się jak w uroczej leśnej chatce, nie rezygnując z nowoczesnych wygód. Nasze domki pachną świeżym drewnem Sosnowym i oferują pełną niezależność dla rodzin oraz paczek znajomych.',
    priceEstimate: 'od 220 zł / doba',
    capacity: '4 - 6 osób',
    imageUrl: 'https://i.ibb.co/rfFNFkdn/645652060-122175493232823864-2357191817385338388-n.jpg',
    features: [
      'Prywatna łazienka z prysznicem i ciepłą wodą',
      'Wyposażony aneks kuchenny (lodówka, płyta, naczynia, sztućce)',
      'Sypialnie z wygodnymi i czystymi pościelami',
      'Zadaszony drewniany taras z meblami ogrodowymi',
      'Indywidualny grill obok domku',
      'Miejsce parkingowe blisko obiektu'
    ]
  },
  {
    id: 'campsite',
    title: 'Malownicze Pole Namiotowe i Kamping',
    subtitle: 'Rozbij się tuż nad brzegiem Zbrzycy',
    description: 'Dla prawdziwych pasjonatów natury, kajakarzy i miłośników gwieździstego nieba przygotowaliśmy trawiaste pole namiotowe z pełnym zapleczem sanitarnym, zasilaniem oraz wyjątkowym widokiem.',
    priceEstimate: 'od 25 zł / osoba za dobę',
    capacity: 'Dowolna',
    imageUrl: 'https://i.ibb.co/dsdgpTY9/648841696-122175689756823864-6187717430308751029-n.jpg',
    features: [
      'Bezpośredni, bezpieczny dostęp do rzeki i linii brzegowej',
      'Dostęp do prądu i przyłączy dla kamperów / przyczep',
      'Nowo wyremontowany węzeł sanitarny z prysznicami',
      'Miejsca do mycia naczyń oraz dostępu do bieżącej czystej wody',
      'Możliwość rozpalenia kontrolowanego ogniska kręgowego',
      'Bliskość Tawerny dla porannych śniadań i ciepłej kawy'
    ]
  }
];

export const TAVERN_HIGHLIGHTS = {
  title: 'Tawerna z Gastronomią PTTK',
  subtitle: 'Zimne napoje, rozgrzewające herbaty i domowe, sycące posiłki',
  description: 'Nasza nastrojowa Tawerna została stworzona, by karmić strudzonych wodniaków, rowerzystów i turystów poszukujących autentycznych smaków Kaszub. Tradycyjny styl z elementami ciemnego drewna, przytulny kominek i bliskość szumu fal czynią każde danie wyjątkowym.',
  features: [
    'Świeża ryba (np. smażona lub w zalewach) bezpośrednio od lokalnych dostawców',
    'Tradycyjne zupy (rozgrzewający żurek kociewski, flaki, swojski rosół)',
    'Polskie, sycące klasyki (pierogi lepione na miejscu, chrupiące placki ziemniaczane)',
    'Zimne lane piwo kraftowe oraz szeroka gama rzemieślniczych napojów chłodzących',
    'Bogata oferta gorących herbat rozgrzewających z miodem, cytryną i goździkami i świeżo mielonej kawy'
  ],
  imageUrl: 'https://i.ibb.co/v4BX3GTg/647139236-122175689600823864-183148074851387107-n.jpg',
  ctaText: 'Zasmakuj w Tawernie'
};

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  tag?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const TAVERN_MENU: MenuSection[] = [
  {
    title: 'Nasze Smażone Ryby',
    items: [
      { name: 'Pstrąg Smażony z Masłem Ziołowym', price: '14 zł / 100g', description: 'Świeży pstrąg z lokalnego potoku, chrupiąca skórka, aromatyczne masło z ziołami.', tag: 'Specjał Stanicy' },
      { name: 'Sandacz Smażony (Filat)', price: '16 zł / 100g', description: 'Delikatne, soczyste filety z sandacza podawane z cytryną.', tag: 'Bardzo popularny' },
      { name: 'Okoń z Patelni', price: '13 zł / 100g', description: 'Smażony na złoty kolor, tradycyjny przysmak rzek kaszubskich.' },
      { name: 'Śledzik w Oleju z Cebulką', price: '16 zł / porcja', description: 'Tradycyjna, swojska przystawka.' }
    ]
  },
  {
    title: 'Rozgrzewające Zupy Domowe',
    items: [
      { name: 'Żurek Kociewski z Jajkiem i Kiełbasą', price: '18 zł', description: 'Na prawdziwym zakwasie, z białą kiełbasą, jajkiem i majerankiem.', tag: 'Klasyk' },
      { name: 'Domowy Rosół z Makaronem', price: '15 zł', description: 'Sycący, gotowany na kilku rodzajach mięs, ze świeżą natką pietruszki.' },
      { name: 'Flaki Wołowe po Staropolsku', price: '19 zł', description: 'Dobrze doprawione, rozgrzewające flaczki, podawane z chlebem.' }
    ]
  },
  {
    title: 'Tradycyjne Dania & Klasyki',
    items: [
      { name: 'Ręcznie Lepione Pierogi Ruskie', price: '22 zł / 8 szt.', description: 'Codziennie świeżo lepione na miejscu, podawane ze złocistą cebulką.', tag: 'Ręczna robota' },
      { name: 'Ręcznie Lepione Pierogi z Mięsem', price: '24 zł / 8 szt.', description: 'Sycące, z farszem wieprzowo-wołowym, okraszone skwarkami.' },
      { name: 'Chrupiące Placki Ziemniaczane', price: '18 zł / 3 szt.', description: 'Tarcia według tradycyjnej receptury, podawane ze śmietaną.' },
      { name: 'Tradycyjny Kotlet Schabowy', price: '34 zł', description: 'Klasyk polskiego stołu podawany z purée ziemniaczanym i kapustą zasmażaną.' }
    ]
  },
  {
    title: 'Napoje Gorące & Zimne',
    items: [
      { name: 'Bogata Herbata Zimowa z Miodem', price: '14 zł', description: 'Z lipowym miodem, cytryną, pomarańczą i aromatycznymi goździkami.', tag: 'Rozgrzewająca' },
      { name: 'Kawa z Ekspresu (Czarna / Biała)', price: '10 zł', description: 'Świeżo mielone ziarna doskonałej jakości.' },
      { name: 'Zimne Piwo Lane z kija', price: '12 zł / 0.5L', description: 'Idealne orzeźwienie po słonecznym spływie kajakowym.' },
      { name: 'Kompot Owocowy', price: '8 zł / szklanka', description: 'Tradycyjny, ze świeżych sezonowych owoców.' }
    ]
  }
];
