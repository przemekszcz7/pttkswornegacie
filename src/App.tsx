import { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Calculator from './components/Calculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { ACCOMMODATIONS, ATTRACTIONS, TAVERN_HIGHLIGHTS } from './data';
import { 
  Waves, 
  Flame, 
  Map, 
  Anchor, 
  Compass, 
  CheckCircle2, 
  ChevronRight, 
  Coffee, 
  Bike, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Sun,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeAttraction, setActiveAttraction] = useState<string>('kajaki');

  // Helper to map icon names from string to elements
  const renderAttractionIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-5 h-5 text-tawerna-gold" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-tawerna-gold" />;
      case 'Bike': return <Bike className="w-5 h-5 text-tawerna-gold" />;
      case 'Sun': return <Sun className="w-5 h-5 text-tawerna-gold" />;
      case 'Flame': return <Flame className="w-5 h-5 text-tawerna-gold" />;
      default: return <Waves className="w-5 h-5 text-tawerna-gold" />;
    }
  };

  return (
    <div className="bg-tawerna-dark text-tawerna-cream font-sans overflow-x-hidden min-h-screen">
      
      {/* Sticky Top Header */}
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Full-screen background layout */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/7d1VVg6g/612601370-122167983416823864-1256427580816765474-n.jpg"
            alt="Stanica Swornegacie zachód słońca"
            className="w-full h-full object-cover select-none filter brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients to transition smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-tawerna-dark via-transparent to-tawerna-dark/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-tawerna-dark/80 via-transparent to-tawerna-dark/40"></div>
        </div>

        {/* Floating background dust */}
        <div className="absolute inset-0 pointer-events-none organic-bg opacity-30 z-0"></div>

        {/* Core Hero Content */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 flex flex-col items-center gap-6 mt-8">
          


          {/* Heading with Serif/Display combo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-7xl leading-tight tracking-tight text-white glow-gold uppercase">
              Stanica Wodna <span className="text-tawerna-gold block font-serif lowercase italic font-normal text-2xl sm:text-4xl md:text-5xl tracking-normal mt-1 text-balance">i Tawerna PTTK Swornegacie</span>
            </h1>
          </motion.div>



          {/* Call to actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full sm:w-auto"
          >
            <a
              href="#domki"
              className="px-6 py-3.5 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-sm rounded-lg transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Oferta Noclegów
            </a>
            
            <a
              href="#tawerna"
              className="px-6 py-3.5 bg-[#3a2216]/80 hover:bg-[#3a2216] border border-tawerna-gold/30 hover:border-tawerna-gold text-tawerna-cream font-sans font-bold text-sm rounded-lg transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-tawerna-gold" />
              Tawerna i Gastronomia
            </a>

            <a
              href="https://www.booking.com/hotel/pl/stanica-wodna-swornegacie-pttk.pl.html?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZHRFUUZ5UkJOeUNvNDF6WHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7m9PavEFXFD2BdhVWaFKkMYUuFrqymsA8SejjI2MOdusXFqqKZ4y2mGns6TQ_aem_9L2AcMXvUiZt6Fx13IJByA&chal_t=1779527224279&force_referer="
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#003580] hover:bg-[#002244] text-white font-sans font-bold text-sm rounded-lg transition-all shadow-xl flex items-center justify-center gap-1 cursor-pointer"
            >
              Zarezerwuj na Booking.com
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>

        {/* Decorative subtle bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-tawerna-dark to-transparent z-10 pointer-events-none"></div>
      </section>


      {/* 2. "O NAS" & NEW MANAGEMENT PRESENTATION */}
      <section id="o-nas" className="py-24 bg-tawerna-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Story text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex items-center gap-2 text-tawerna-gold">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-display tracking-widest text-xs font-bold uppercase">Nowy Rozdział Od 2025</span>
              </div>
              
              <h2 className="font-display font-black text-3xl md:text-5xl text-tawerna-cream tracking-tight leading-tight">
                Pod Nowym Zarządem <br />
                <span className="text-tawerna-gold font-serif italic text-2xl md:text-4xl font-normal">Serca Borów Tucholskich</span>
              </h2>

              <p className="font-serif italic text-tawerna-sand text-md border-l-2 border-tawerna-gold pl-4 leading-relaxed">
                „Stanica Wodna PTTK w Swornegaciach od 4 kwietnia 2025 roku zyskała nowy oddech pod świeżym i pełnym pasji zarządem. Naszym celem jest połączenie tradycyjnego, kaszubskiego dziedzictwa z maksymalnym komfortem naszych Gości.”
              </p>

              <p className="text-sm md:text-base leading-relaxed text-justify text-tawerna-sand/90">
                Położona przy samej rzece <strong>Zbrzyca</strong>, u wrót Jeziora Witoczno, nasza stanica to wymarzone miejsce dla pasjonatów leśnej ciszy, pasjonatów wędkarstwa, wycieczek rowerowych i miłośników spływów kajakowych. Przygotowaliśmy dla Państwa w pełni komfortowe, pachnące lasem, drewniane domki, odnowione zaplecze sanitarne pola namiotowego oraz rustic tawernę biesiadną tętniącą staropolskimi i kaszubskimi smakami.
              </p>

              {/* USP grid indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-tawerna-cream">Komfortowe domki</h4>
                    <p className="text-xs text-tawerna-sand">Prywatne łazienki, świetnie wyposażone aneksy kuchenne i zaciszne tarasy.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-tawerna-cream">Tawerna z klimatem</h4>
                    <p className="text-xs text-tawerna-sand">Ciemne drewno, ciepła herbata, chłodne piwo i aromatyczne ryby na gorąco.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-tawerna-cream">Raj sportów wodnych</h4>
                    <p className="text-xs text-tawerna-sand">Bezpośrednia linia brzegowa rzeki, własne pomosty wędkarskie i baza spływowa.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-tawerna-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-tawerna-cream">Malowniczy odpoczynek</h4>
                    <p className="text-xs text-tawerna-sand">Wieczorne ogniska, hamaki i leżaki w cieniu sosen przy śpiewie ptaków.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual card with PTTK Logo badge & photos */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full aspect-[4/5] overflow-hidden rounded-xl wood-frame relative">
                <img
                  src="https://i.ibb.co/HpzPyBF7/646397278-122175493676823864-3970029122686148013-n.jpg"
                  alt="Zbrzyca Swornegacie ogródek"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glassmorphic Info Badge over the Photo */}
                <div className="absolute inset-x-4 bottom-4 bg-tawerna-dark/85 border border-tawerna-gold/25 backdrop-blur-md p-4 rounded-lg flex gap-3 text-left">
                  <img
                    src="https://i.ibb.co/TxnBQf0H/613302369-122168003180823864-3793124179119175346-n.jpg"
                    alt="Logo PTTK"
                    className="w-10 h-10 rounded-full border border-tawerna-gold object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold text-tawerna-gold">TRADYCJA PTTK</p>
                    <p className="text-[11px] text-tawerna-cream font-serif italic">Swornegacie, rzeka Zbrzyca</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 3. NOCLEGI (DOMKI & POLE KAMPINGOWE) */}
      <section id="domki" className="py-24 bg-tawerna-wood/20 border-t border-tawerna-gold/10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Section info */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-tawerna-gold mb-3">
              <Award className="w-5 h-5" />
              <span className="font-display tracking-widest text-xs font-bold uppercase">Baza Noclegowa Swornegacie</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-tawerna-cream tracking-tight mb-4">
              Nasza Oferta Noclegów
            </h2>
            <div className="w-24 h-1 bg-tawerna-gold mx-auto rounded-full"></div>
            <p className="max-w-xl mx-auto text-tawerna-sand text-sm md:text-base mt-4 font-serif italic">
              Zapewniamy zróżnicowane możliwości odpoczynku – poczuj kameralność naszych domków z pełnym węzłem sanitarnym lub doświadcz przygody na trawiastym polu kempingowym.
            </p>
          </div>

          {/* Accommodation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {ACCOMMODATIONS.map((accom) => (
              <div 
                key={accom.id} 
                className="group flex flex-col justify-between rounded-xl overflow-hidden wood-card-border p-5 border border-tawerna-gold/15 bg-tawerna-wood/85 shadow-lg transition-transform hover:-translate-y-1 duration-300"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-lg mb-5 relative border border-tawerna-gold/10">
                    <img
                      src={accom.imageUrl}
                      alt={accom.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-tawerna-dark/90 border border-tawerna-gold/20 text-tawerna-gold px-3 py-1 font-sans text-xs font-bold rounded-full">
                      {accom.capacity}
                    </div>
                  </div>

                  {/* Text Details */}
                  <h3 className="font-display text-xl md:text-2xl font-black text-tawerna-cream group-hover:text-tawerna-gold transition mb-1 text-left">
                    {accom.title}
                  </h3>
                  <p className="text-xs font-serif font-bold italic text-tawerna-gold text-left mb-3">
                    {accom.subtitle}
                  </p>
                  <p className="text-xs md:text-sm text-tawerna-sand/90 text-left leading-relaxed mb-6">
                    {accom.description}
                  </p>

                  {/* Bullet features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mb-6">
                    {accom.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs text-tawerna-sand">
                        <CheckCircle2 className="w-3.5 h-3.5 text-tawerna-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer price & cta */}
                <div className="pt-4 border-t border-tawerna-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left w-full sm:w-auto">
                    <span className="block text-[10px] font-mono text-tawerna-sand">SZACUNKOWY KOSZT:</span>
                    <span className="font-sans font-black text-tawerna-gold text-lg lg:text-xl">{accom.priceEstimate}</span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <a
                      href="#kalkulator"
                      className="flex-1 sm:flex-initial text-center px-4 py-2 bg-tawerna-wood-light hover:bg-tawerna-dark border border-tawerna-gold/20 hover:border-tawerna-gold text-tawerna-cream text-xs font-bold rounded transition"
                    >
                      Kalkulator wyceny
                    </a>
                    <a
                      href="https://www.booking.com/hotel/pl/stanica-wodna-swornegacie-pttk.pl.html?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZHRFUUZ5UkJOeUNvNDF6WHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7m9PavEFXFD2BdhVWaFKkMYUuFrqymsA8SejjI2MOdusXFqqKZ4y2mGns6TQ_aem_9L2AcMXvUiZt6Fx13IJByA&chal_t=1779527224279&force_referer="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow sm:flex-initial text-center px-4 py-2 bg-[#003580] hover:bg-[#002244] text-white text-xs font-bold rounded shadow transition"
                    >
                      Zarezerwuj
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 4. ATRAKCJE I REKREACJA INTERACTIVE GRID */}
      <section id="atrakcje" className="py-24 bg-tawerna-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-tawerna-gold mb-3">
              <Compass className="w-5 h-5" />
              <span className="font-display tracking-widest text-xs font-bold uppercase">U nas nie ma nudy</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-tawerna-cream tracking-tight mb-4">
              Atrakcje &amp; Aktywności
            </h2>
            <div className="w-24 h-1 bg-tawerna-gold mx-auto rounded-full"></div>
            <p className="max-w-xl mx-auto text-tawerna-sand text-sm md:text-base mt-4 font-serif italic">
              Niezależnie od tego, czy przybywasz na kajakach, szukasz ciszy z wędką na pomoście, czy mknesz rowerem leśnymi duktami – nasza lokalizacja oferuje wszystko.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            
            {/* Left Nav menu for attractions tabs */}
            <div className="lg:col-span-4 flex flex-col gap-2 bg-tawerna-wood/45 border border-tawerna-gold/10 p-3 rounded-xl">
              {ATTRACTIONS.map((attr) => (
                <button
                  key={attr.id}
                  onClick={() => setActiveAttraction(attr.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-lg font-serif font-bold text-sm tracking-wide text-left transition duration-200 cursor-pointer ${
                    activeAttraction === attr.id
                      ? 'bg-tawerna-gold text-tawerna-dark font-extrabold shadow-md'
                      : 'text-tawerna-cream hover:bg-tawerna-wood/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {renderAttractionIcon(attr.iconName)}
                    <span>{attr.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                    activeAttraction === attr.id ? 'translate-x-1' : 'opacity-40'
                  }`} />
                </button>
              ))}
            </div>

            {/* Right Tab panel display with elegant details */}
            <div className="lg:col-span-8 bg-tawerna-wood/80 md:p-8 p-6 rounded-xl border-2 border-tawerna-gold/15 min-h-[380px] flex flex-col md:flex-row gap-6 items-stretch shadow-inner">
              {ATTRACTIONS.filter(a => a.id === activeAttraction).map((attr) => (
                <div key={attr.id} className="flex flex-col md:flex-row gap-6 w-full text-left justify-between items-start">
                  
                  {/* Text details inside the Tab panel */}
                  <div className="flex-1 flex flex-col gap-4">
                    <span className="font-display text-[10px] uppercase font-bold tracking-widest text-tawerna-gold">Do Twojej dyspozycji</span>
                    <h3 className="font-serif font-black text-2xl text-tawerna-cream leading-tight">{attr.title}</h3>
                    <p className="text-xs md:text-sm text-tawerna-sand italic leading-relaxed">{attr.description}</p>
                    
                    <div className="flex flex-col gap-2 mt-2">
                      {attr.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs text-tawerna-sand">
                          <CheckCircle2 className="w-4 h-4 text-tawerna-gold flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Photo frame inside the Tab panel */}
                  <div className="w-full md:w-[220px] shrink-0 aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden border border-tawerna-gold/20 shadow-lg">
                    <img
                      src={attr.imageUrl}
                      alt={attr.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* 5. TAWERNA Z GASTRONOMIĄ SPECIAL HERO */}
      <section id="tawerna" className="py-24 bg-[#1a0e08] border-y border-tawerna-gold/15 relative overflow-hidden">
        {/* Full circular foliage decor */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-tawerna-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Left Photo */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden wood-frame">
                <img
                  src={TAVERN_HIGHLIGHTS.imageUrl}
                  alt="Tawerna PTTK wnętrze ciemne drewno"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right text panel */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex items-center gap-2 text-tawerna-gold">
                <Coffee className="w-5 h-5" />
                <span className="font-display tracking-widest text-xs font-bold uppercase">Swojskie zapachy we wnętrzu</span>
              </div>

              <h2 className="font-display font-black text-3xl md:text-5xl text-tawerna-cream tracking-tight leading-tight uppercase">
                {TAVERN_HIGHLIGHTS.title}
              </h2>
              <p className="font-serif font-bold italic text-tawerna-gold text-lg">
                {TAVERN_HIGHLIGHTS.subtitle}
              </p>
              <p className="text-xs md:text-sm text-tawerna-sand/90 text-justify leading-relaxed">
                {TAVERN_HIGHLIGHTS.description}
              </p>

              {/* Culinary highlights */}
              <div className="flex flex-col gap-2 mt-2">
                {TAVERN_HIGHLIGHTS.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-xs text-tawerna-sand/90 leading-tight">
                    <CheckCircle2 className="w-4 h-4 text-tawerna-gold flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="#kontakt"
                  className="px-5 py-3 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-xs rounded-md shadow-lg transition cursor-pointer"
                >
                  Gdzie jesteśmy?
                </a>
                <a
                  href="tel:+48798550017"
                  className="px-5 py-3 bg-tawerna-wood-light border border-tawerna-gold/20 hover:border-tawerna-gold text-tawerna-cream font-sans font-bold text-xs rounded-md shadow hover:bg-tawerna-dark transition cursor-pointer"
                >
                  Zadzwoń i zamów dopytując o menu
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. IMMERSIVE LIGHTBOX GALLERY GRID */}
      <Gallery />

      {/* 7. INTERACTIVE STAY PRICING CALCULATOR */}
      <Calculator />

      {/* 8. CONTACT FORM, MAPS, FAQS PANEL */}
      <ContactForm />

      {/* 9. FOOTER SECTION */}
      <Footer />

    </div>
  );
}
