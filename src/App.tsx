import { useState } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import GoogleCalendarBooking from './components/GoogleCalendarBooking';
import { GALLERY_ITEMS, TAVERN_HIGHLIGHTS, TAVERN_MENU } from './data';
import { 
  CheckCircle2, 
  Coffee, 
  ArrowRight,
  Phone,
  Calendar,
  Utensils,
  Home,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="bg-tawerna-dark text-tawerna-cream font-sans overflow-x-hidden min-h-screen">
      
      {/* Sticky Top Header */}
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Full-screen background layout */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/7d1VVg6g/612601370-122167983416823864-1256427580816765474-n.jpg"
            alt="Stanica Swornegacie zachód słońca"
            className="w-full h-full object-cover select-none filter brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients to transition smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-tawerna-dark via-transparent to-tawerna-dark/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-tawerna-dark/80 via-transparent to-tawerna-dark/40"></div>
        </div>

        {/* Core Hero Content */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 flex flex-col items-center gap-6 mt-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-8xl leading-tight tracking-tight text-white glow-gold uppercase">
              Stanica Wodna <span className="text-tawerna-gold block font-serif lowercase italic font-normal text-3xl sm:text-5xl md:text-6xl tracking-normal mt-2 text-balance">i Tawerna Swornegacie</span>
            </h1>
            <p className="max-w-2xl text-[#fdfcf9] text-lg md:text-xl mt-6 font-serif italic text-balance">
              Tradycyjny kaszubski urok, komfortowe drewniane domki i smaczna domowa kuchnia nad samą rzeką Zbrzyca.
            </p>
          </motion.div>

          {/* Large, clear, highly legible Call to Actions for easy reading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
          >
            <a
              href="#zarezerwuj"
              className="px-8 py-4 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-base md:text-lg rounded-xl transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              Zarezerwuj nocleg
            </a>
            
            <a
              href="#tawerna"
              className="px-8 py-4 bg-[#3a2216]/90 hover:bg-[#3a2216] border-2 border-tawerna-gold/45 hover:border-tawerna-gold text-tawerna-cream font-sans font-bold text-base md:text-lg rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Coffee className="w-5 h-5 text-tawerna-gold" />
              Tawerna menu
            </a>

            <a
              href="tel:+48798550017"
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-sans font-bold text-base md:text-lg rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              Zadzwoń: 798 550 017
            </a>
          </motion.div>

        </div>
      </section>


      {/* 2. SECTION: O NAS (id="o-nas") */}
      <section id="o-nas" className="py-24 bg-tawerna-dark border-t border-tawerna-gold/15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text with larger, more legible font sizes */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex items-center gap-2 text-tawerna-gold">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-display tracking-widest text-sm font-bold uppercase">Nowy Rozdział Od 2025 Roku</span>
              </div>
              
              <h2 className="font-display font-black text-4xl md:text-5xl text-tawerna-cream tracking-tight leading-tight">
                Pod Nowym Zarządem <br />
                <span className="text-tawerna-gold font-serif italic text-3xl md:text-4xl font-normal">Serca Borów Tucholskich</span>
              </h2>

              <p className="font-serif italic text-white font-medium text-lg md:text-xl border-l-4 border-tawerna-gold pl-4 leading-relaxed bg-tawerna-wood/30 py-4 pr-3 rounded-r-lg">
                „Stanica Wodna PTTK w Swornegaciach od 4 kwietnia 2025 roku zyskała nowy oddech pod świeżym i pełnym pasji zarządem. Naszym celem jest połączenie kaszubskiego dziedzictwa z maksymalnym komfortem naszych Gości.”
              </p>

              <p className="text-base md:text-lg leading-relaxed text-tawerna-cream text-left">
                Położona przy samej malowniczej rzece <strong>Zbrzyca</strong>, u ujścia do Jeziora Witoczno, nasza stanica to wymarzone miejsce dla pasjonatów leśnej ciszy, wycieczek rowerowych, wędkarstwa i spływów kajakowych. Przygotowaliśmy dla Państwa w pełni zmodernizowane, pachnące świeżym lasem, drewniane domki, odnowione zaplecze sanitarne pola namiotowego oraz klimatyczną tawernę biesiadną tętniącą staropolskimi i kaszubskimi smakami.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-tawerna-cream">Przytulne domki</h4>
                    <p className="text-sm text-tawerna-cream/90">Prywatna łazienka z ciepłą wodą, aneks kuchenny, taras i grill.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-tawerna-cream">Tawerna z klimatem</h4>
                    <p className="text-sm text-tawerna-cream/90">Pyszne domowe jedzenie, świeża smażona ryba i chłodne napoje.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-tawerna-cream">Raj dla aktywnych</h4>
                    <p className="text-sm text-tawerna-cream/90">Wypożyczalnia kajaków na miejscu, rzeka Zbrzyca, pomosty i ogniska.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-tawerna-cream">Cisza i spokój</h4>
                    <p className="text-sm text-tawerna-cream/90">Piękny las sosnowy, śpiew ptaków i bezpośredni kontakt z naturą.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful main picture */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl wood-frame relative shadow-2xl">
                <img
                  src="https://i.ibb.co/HpzPyBF7/646397278-122175493676823864-3970029122686148013-n.jpg"
                  alt="Zbrzyca Swornegacie ogródek"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

          {/* Simple, clear integrated photo gallery so they can see everything in one place without clicks */}
          <div className="mt-20 border-t border-tawerna-gold/10 pt-12">
            <h3 className="font-display font-bold text-2xl text-tawerna-cream mb-8 text-center uppercase tracking-wider">
              Zdjęcia Naszej Stanicy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY_ITEMS.slice(0, 4).map((item) => (
                <div key={item.id} className="aspect-[4/3] rounded-xl overflow-hidden border border-tawerna-gold/20 shadow-md">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 3. SECTION: ZAREZERWUJ NOCLEG (id="zarezerwuj") */}
      <section id="zarezerwuj" className="py-24 bg-tawerna-wood/25 border-y border-tawerna-gold/15 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-tawerna-gold mb-3">
              <Home className="w-6 h-6" />
              <span className="font-display tracking-widest text-sm font-bold uppercase">Prosty i szybki wybór</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-tawerna-cream tracking-tight mb-4 text-balance">
              Wybierz Domek i Zarezerwuj
            </h2>
            <p className="max-w-2xl mx-auto text-tawerna-cream text-lg md:text-xl font-serif italic text-balance">
              Przygotowaliśmy trzy komfortowe, pachnące drewnem domki letniskowe. Wybierz termin na kalendarzyku obok domku i wyślij zgłoszenie – to banalnie proste!
            </p>
          </div>

          {/* Vertical list of cottages - incredibly readable and structured */}
          <div className="flex flex-col gap-16 max-w-6xl mx-auto mb-20">
            
            {/* 1. DOMEK DWUOSOBOWY */}
            <div className="bg-[#1a0e08]/90 border-2 border-tawerna-gold/30 rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Info */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full text-left">
                <div>
                  <span className="px-3 py-1 bg-tawerna-gold/10 text-tawerna-gold rounded-full text-xs font-mono font-bold tracking-wider uppercase inline-block mb-3 border border-tawerna-gold/25">
                    DLA 2 OSÓB
                  </span>
                  <h3 className="font-display font-black text-3xl text-white tracking-tight mb-1">
                    Domek Dwuosobowy
                  </h3>
                  <p className="font-serif italic text-tawerna-gold text-sm mb-4">
                    Klimatyczna, drewniana przystań idealna dla par
                  </p>
                  
                  <div className="bg-tawerna-dark/60 p-4 rounded-xl border border-tawerna-gold/25 mb-4">
                    <span className="block text-[10px] font-mono text-tawerna-gold uppercase tracking-wider font-bold">CENA PROSTOWA:</span>
                    <span className="font-sans font-black text-white text-2xl">180 zł</span> <span className="text-sm text-tawerna-cream font-serif italic">/ doba</span>
                  </div>

                  <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mb-6">
                    Przytulne wnętrze pachnące sosnowym lasem. Domek wyposażony jest w prywatną łazienkę z ciepłą wodą, w pełni sprawny aneks kuchenny z lodówką i płytą grzewczą, wygodne łoże małżeńskie oraz zadaszony taras z meblami ogrodowymi i prywatnym grillem.
                  </p>
                </div>

                <div className="flex flex-col gap-2 bg-tawerna-dark/45 p-4 rounded-xl border border-tawerna-gold/20">
                  <span className="text-[10px] font-mono font-bold text-tawerna-gold uppercase tracking-wider">ATUTY DOMKU:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-tawerna-cream">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Łoże małżeńskie</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Aneks kuchenny</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Łazienka z prysznicem</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Taras i grill</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="lg:col-span-4 h-full flex flex-col justify-center">
                <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl border-2 border-tawerna-gold/20 shadow-lg relative group">
                  <img
                    src="https://i.ibb.co/rfFNFkdn/645652060-122175493232823864-2357191817385338388-n.jpg"
                    alt="Domek dwuosobowy drewniany letniskowy"
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Interactive Calendar and Reserve action */}
              <div className="lg:col-span-4 h-full">
                <GoogleCalendarBooking
                  cottageKey="domek-1"
                  pricePerDay={180}
                />
              </div>
            </div>


            {/* 2. DOMEK TRZYOSOBOWY (ZATOKA) */}
            <div className="bg-[#1a0e08]/90 border-2 border-tawerna-gold/30 rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Info */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full text-left">
                <div>
                  <span className="px-3 py-1 bg-tawerna-gold/10 text-tawerna-gold rounded-full text-xs font-mono font-bold tracking-wider uppercase inline-block mb-3 border border-tawerna-gold/25">
                    DLA 3 OSÓB (STANDARD)
                  </span>
                  <h3 className="font-display font-black text-3xl text-white tracking-tight mb-1">
                    Domek Trzyosobowy
                  </h3>
                  <p className="font-serif italic text-tawerna-gold text-sm mb-4">
                    Komfortowy wypoczynek dla małej rodziny lub przyjaciół
                  </p>
                  
                  <div className="bg-tawerna-dark/60 p-4 rounded-xl border border-tawerna-gold/25 mb-4">
                    <span className="block text-[10px] font-mono text-tawerna-gold uppercase tracking-wider font-bold">CENA PROSTOWA:</span>
                    <span className="font-sans font-black text-white text-2xl">220 zł</span> <span className="text-sm text-tawerna-cream font-serif italic">/ doba</span>
                  </div>

                  <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mb-6">
                    Szeroki, rodzinny domek letniskowy z pełnym węzłem sanitarnym (ciepła woda, prysznic, WC) oraz w pełni zaopatrzoną kuchnią. W środku znajduje się jedno łóżko małżeńskie (dwuosobowe) oraz jedno łóżko pojedyncze. Przy wejściu duży zadaszony taras i meble wypoczynkowe.
                  </p>
                </div>

                <div className="flex flex-col gap-2 bg-tawerna-dark/45 p-4 rounded-xl border border-tawerna-gold/20">
                  <span className="text-[10px] font-mono font-bold text-tawerna-gold uppercase tracking-wider">ATUTY DOMKU:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-tawerna-cream">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Łóżko 2-os. + łóżko 1-os.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>W pełni wyposażona kuchnia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Łazienka z prysznicem</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Drewniany, duży taras</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="lg:col-span-4 h-full flex flex-col justify-center">
                <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl border-2 border-tawerna-gold/20 shadow-lg relative group">
                  <img
                    src="https://i.ibb.co/q3P07dQS/646531341-122175689648823864-7407450498153030862-n.jpg"
                    alt="Nowe wnętrze i kuchnia w domku letniskowym"
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Interactive Calendar and Reserve action */}
              <div className="lg:col-span-4 h-full">
                <GoogleCalendarBooking
                  cottageKey="domek-2"
                  pricePerDay={220}
                />
              </div>
            </div>


            {/* 3. DOMEK TRZYOSOBOWY (RZEKA) */}
            <div className="bg-[#1a0e08]/90 border-2 border-tawerna-gold/30 rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Info */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full text-left">
                <div>
                  <span className="px-3 py-1 bg-tawerna-gold/10 text-tawerna-gold rounded-full text-xs font-mono font-bold tracking-wider uppercase inline-block mb-3 border border-tawerna-gold/25">
                    DLA 3 OSÓB (WIDOKOWY)
                  </span>
                  <h3 className="font-display font-black text-3xl text-white tracking-tight mb-1">
                    Domek Trzyosobowy Premium
                  </h3>
                  <p className="font-serif italic text-tawerna-gold text-sm mb-4">
                    Wyjątkowe położenie tuż nad brzegiem rzeki Zbrzycy
                  </p>
                  
                  <div className="bg-tawerna-dark/60 p-4 rounded-xl border border-tawerna-gold/25 mb-4">
                    <span className="block text-[10px] font-mono text-tawerna-gold uppercase tracking-wider font-bold">CENA PROSTOWA:</span>
                    <span className="font-sans font-black text-white text-2xl">240 zł</span> <span className="text-sm text-tawerna-cream font-serif italic">/ doba</span>
                  </div>

                  <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mb-6">
                    Najchętniej wybierany domek położony najbliżej nurtu wody i pomostu wędkarskiego. Oferuje sielankowy, uspokajający widok na rzekę, śpiew ptaków bezpośrednio z tarasu, luksusowy aneks kuchenny, prywatny węzeł sanitarny z ciepłą wodą i grill.
                  </p>
                </div>

                <div className="flex flex-col gap-2 bg-tawerna-dark/45 p-4 rounded-xl border border-tawerna-gold/20">
                  <span className="text-[10px] font-mono font-bold text-tawerna-gold uppercase tracking-wider">ATUTY DOMKU:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-tawerna-cream">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Bezpośrednio przy rzece</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Widok z tarasu na wodę</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Aneks kuchenny + Łazienka</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Najcichsza leśna strefa</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="lg:col-span-4 h-full flex flex-col justify-center">
                <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl border-2 border-tawerna-gold/20 shadow-lg relative group">
                  <img
                    src="https://i.ibb.co/HpzPyBF7/646397278-122175493676823864-3970029122686148013-n.jpg"
                    alt="Domek z widokiem na przystań i wodę"
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Interactive Calendar and Reserve action */}
              <div className="lg:col-span-4 h-full">
                <GoogleCalendarBooking
                  cottageKey="domek-3"
                  pricePerDay={240}
                />
              </div>
            </div>

          </div>

          {/* Interactive Google Calendar Booking widget removed - integrated directly with cottages */}

        </div>
      </section>


      {/* 4. SECTION: TAWERNA MENU (id="tawerna") */}
      <section id="tawerna" className="py-24 bg-[#140a04] border-b border-tawerna-gold/15 relative overflow-hidden">
        {/* Full circular foliage decor */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-tawerna-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto mb-16">
            {/* Left Photo */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden wood-frame shadow-xl">
                <img
                  src={TAVERN_HIGHLIGHTS.imageUrl}
                  alt="Tawerna PTTK wnętrze ciemne drewno"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right text panel */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex items-center gap-2 text-tawerna-gold">
                <Coffee className="w-6 h-6" />
                <span className="font-display tracking-widest text-sm font-bold uppercase">Swojskie Zapachy i Klimat</span>
              </div>

              <h2 className="font-display font-black text-4xl md:text-5xl text-tawerna-cream tracking-tight leading-tight uppercase">
                {TAVERN_HIGHLIGHTS.title}
              </h2>
              <p className="font-serif font-bold italic text-tawerna-gold text-lg md:text-xl">
                {TAVERN_HIGHLIGHTS.subtitle}
              </p>
              <p className="text-base md:text-lg text-tawerna-cream text-left leading-relaxed">
                Nasza nastrojowa Tawerna została stworzona, by karmić strudzonych wodniaków, rowerzystów i turystów poszukujących autentycznych smaków Kaszub. Przytulny kominek, ciemne naturalne drewno i bliskość szumu fal czynią każde danie wyjątkowym. Zapraszamy starszych, młodszych, całe rodziny!
              </p>
            </div>
          </div>

          {/* BEAUTIFUL, SENIOR-FRIENDLY DIGITAL RESTAURANT MENU */}
          <div className="max-w-5xl mx-auto mt-16 bg-[#1a0e08]/95 border-2 border-tawerna-gold/40 p-6 md:p-12 rounded-3xl shadow-2xl relative">
            
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 text-tawerna-gold mb-2">
                <Utensils className="w-5 h-5" />
                <span className="font-display text-xs tracking-widest uppercase font-bold">Karta dań i napojów</span>
              </div>
              <h3 className="font-serif font-bold text-2xl md:text-4xl text-white">Menu Naszej Tawerny</h3>
              <div className="w-16 h-0.5 bg-tawerna-gold mx-auto mt-3"></div>
            </div>

            {/* Menu sections layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {TAVERN_MENU.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-6 text-left">
                  {/* Section Title with high-contrast background strip */}
                  <h4 className="font-serif font-black text-xl md:text-2xl text-tawerna-gold pb-2 border-b border-tawerna-gold/30">
                    {section.title}
                  </h4>
                  
                  {/* Items loop */}
                  <div className="flex flex-col gap-6">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex flex-col gap-1 group">
                        <div className="flex justify-between items-baseline gap-4">
                          <h5 className="font-serif font-bold text-base md:text-lg text-white flex-1">
                            {item.name}
                            {item.tag && (
                              <span className="ml-2 inline-block px-2 py-0.5 text-[10px] font-sans font-bold uppercase rounded bg-emerald-700/20 text-emerald-400 border border-emerald-500/30">
                                {item.tag}
                              </span>
                            )}
                          </h5>
                          <span className="font-sans font-black text-tawerna-gold text-base md:text-lg shrink-0">
                            {item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs md:text-sm text-tawerna-sand italic leading-relaxed pr-6">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Menu footer hint */}
            <div className="text-center mt-12 pt-8 border-t border-tawerna-gold/20 text-sm font-serif italic text-tawerna-sand">
              * Ryby smażymy na bieżąco. Oferta dań może się nieznacznie różnić w zależności od dnia i dostaw świeżych ryb.
            </div>

          </div>

        </div>
      </section>


      {/* 5. SECTION: KONTAKT (id="kontakt") */}
      <ContactForm />

      {/* FOOTER SECTION */}
      <Footer />

    </div>
  );
}

