import { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Calendar, Users, Flame, Coffee, Compass, CheckCircle2, Clipboard, Copy } from 'lucide-react';

export default function Calculator() {
  const [accomType, setAccomType] = useState<'cottage' | 'campsite'>('cottage');
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(4);
  
  // Cottage addons
  const [cottageSize, setCottageSize] = useState<'standard' | 'deluxe'>('standard');
  const [hasPet, setHasPet] = useState(false);
  const [kayakRent, setKayakRent] = useState(false);
  const [firewoodPkg, setFirewoodPkg] = useState(false);

  // Campsite addons
  const [campsiteType, setCampsiteType] = useState<'tent' | 'camper'>('tent');
  const [powerHookup, setPowerHookup] = useState(false);

  // Calculation state
  const [totalPrice, setTotalPrice] = useState(0);
  const [breakdown, setBreakdown] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let price = 0;
    const items: string[] = [];

    if (accomType === 'cottage') {
      const baseRate = cottageSize === 'standard' ? 220 : 300;
      const baseCost = baseRate * nights;
      price += baseCost;
      items.push(`Domek letniskowy (${cottageSize === 'standard' ? 'Standard' : 'Deluxe'}): ${nights} msc x ${baseRate} zł = ${baseCost} zł`);

      if (hasPet) {
        const petCost = 20 * nights;
        price += petCost;
        items.push(`Pobyt ze zwierzęciem: ${nights} msc x 20 zł = ${petCost} zł`);
      }
      if (kayakRent) {
        const kayakCost = 80 * nights;
        price += kayakRent ? kayakCost : 0;
        items.push(`Wypożyczenie kajaka na wyłączność: ${nights} dni x 80 zł = ${kayakCost} zł`);
      }
      if (firewoodPkg) {
        price += 50;
        items.push(`Pakiet biesiadny (drewno dębowe + rozpałka) = 50 zł`);
      }
    } else {
      // Campsite calculation
      const adultRate = 25;
      const peopleCost = adultRate * guests * nights;
      price += peopleCost;
      items.push(`Pobyt na polu namiotowym: ${guests} os x ${nights} dób x ${adultRate} zł = ${peopleCost} zł`);

      const siteBase = campsiteType === 'tent' ? 15 : 45;
      const siteCost = siteBase * nights;
      price += siteCost;
      items.push(`Opłata za miejsce (${campsiteType === 'tent' ? 'Namiot' : 'Kamper/Przyczepa'}): ${nights} dób x ${siteBase} zł = ${siteCost} zł`);

      if (powerHookup) {
        const powerCost = 20 * nights;
        price += powerCost;
        items.push(`Przyłącze elektryczne: ${nights} dób x 20 zł = ${powerCost} zł`);
      }
      if (hasPet) {
        const petCost = 10 * nights;
        price += petCost;
        items.push(`Pobyt ze zwierzęciem na polu: ${nights} dób x 10 zł = ${petCost} zł`);
      }
      if (kayakRent) {
        const kayakCost = 80 * nights;
        price += kayakCost;
        items.push(`Wypożyczenie kajaka: ${nights} dni x 80 zł = ${kayakCost} zł`);
      }
    }

    setTotalPrice(price);
    setBreakdown(items);
  }, [accomType, nights, guests, cottageSize, hasPet, kayakRent, firewoodPkg, campsiteType, powerHookup]);

  // Generate text for reservation copy
  const getReservationText = () => {
    const accomName = accomType === 'cottage' 
      ? `Domek Letniskowy (${cottageSize === 'standard' ? 'Standard' : 'Deluxe'})` 
      : `Pole Namiotowe (${campsiteType === 'tent' ? 'Namiot' : 'Kamper'})`;
    
    const addons: string[] = [];
    if (hasPet) addons.push("ze zwierzęciem");
    if (kayakRent) addons.push("wypożyczenie kajaka");
    if (accomType === 'cottage' && firewoodPkg) addons.push("pakiet drewna");
    if (accomType === 'campsite' && powerHookup) addons.push("przyłącze prądu");

    const addonsText = addons.length > 0 ? ` (Dodatki: ${addons.join(', ')})` : '';

    return `Dzień dobry! Chciałbym zapytać o rezerwację na stanicy Swornegacie. 
Wybrany nocleg: ${accomName},
Liczba dób: ${nights},
Liczba osób: ${guests}${addonsText}.
Szacowany koszt pobytu wynosi: ${totalPrice} zł. 
Proszę o kontakt w sprawie dostępności terminu!`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getReservationText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section id="kalkulator" className="py-24 bg-tawerna-wood/40 border-y border-tawerna-gold/15 relative overflow-hidden">
      {/* Visual ambient details */}
      <div className="absolute top-1/2 left-4 w-72 h-72 bg-tawerna-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-tawerna-gold mb-3">
            <CalcIcon className="w-5 h-5" />
            <span className="font-display tracking-widest text-xs font-bold uppercase">Zaplanuj swoje wczasy</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-tawerna-cream tracking-tight mb-4">
            Kalkulator Rezerwacji
          </h2>
          <div className="w-24 h-1 bg-tawerna-gold mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto text-tawerna-sand text-sm md:text-base mt-4 font-serif italic">
            Wybierz typ noclegu, liczbę dób, określ dodatkowe udogodnienia i oblicz szacunkową cenę pobytu na naszej przystani pod nowym zarządem!
          </p>
        </div>

        {/* Calculator Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Controls Side */}
          <div className="lg:col-span-7 bg-[#1c0e08]/90 p-6 md:p-8 rounded-xl border border-tawerna-gold/15 flex flex-col gap-6 shadow-xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tawerna-forest/5 rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Toggle Stay Type */}
            <div>
              <label className="block text-xs font-display font-bold uppercase tracking-wider text-tawerna-gold mb-2">Typ Noclegu</label>
              <div className="grid grid-cols-2 gap-2 bg-tawerna-dark/60 p-1.5 rounded-lg border border-tawerna-gold/10">
                <button
                  type="button"
                  onClick={() => {
                    setAccomType('cottage');
                    setGuests(4);
                  }}
                  className={`py-2 px-3 text-xs md:text-sm font-sans font-bold tracking-wide rounded-md transition-all cursor-pointer ${
                    accomType === 'cottage'
                      ? 'bg-tawerna-gold text-tawerna-dark'
                      : 'text-tawerna-sand hover:text-tawerna-gold'
                  }`}
                >
                  Domki letniskowe
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccomType('campsite');
                    setGuests(2);
                  }}
                  className={`py-2 px-3 text-xs md:text-sm font-sans font-bold tracking-wide rounded-md transition-all cursor-pointer ${
                    accomType === 'campsite'
                      ? 'bg-tawerna-gold text-tawerna-dark'
                      : 'text-tawerna-sand hover:text-tawerna-gold'
                  }`}
                >
                  Pole Namiotowe / Camping
                </button>
              </div>
            </div>

            {/* Stay Duration & Guests counts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-tawerna-gold mb-1.5">
                  <Calendar className="w-4 h-4 text-tawerna-gold" />
                  Liczba Dób ({nights})
                </label>
                <input
                  type="range"
                  min="1"
                  max="21"
                  value={nights}
                  onChange={(e) => setNights(parseInt(e.target.value))}
                  className="w-full accent-tawerna-gold bg-tawerna-dark/50 p-1 rounded h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-tawerna-sand mt-1">
                  <span>1 doba</span>
                  <span>7 dób</span>
                  <span>14 dób</span>
                  <span>21 dób</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-tawerna-gold mb-1.5">
                  <Users className="w-4 h-4 text-tawerna-gold" />
                  Liczba Gości ({guests})
                </label>
                <input
                  type="range"
                  min="1"
                  max={accomType === 'cottage' ? 6 : 10}
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full accent-tawerna-gold bg-tawerna-dark/50 p-1 rounded h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-tawerna-sand mt-1">
                  <span>1 osoba</span>
                  <span>{accomType === 'cottage' ? '6 osób max' : '10 osób'}</span>
                </div>
              </div>
            </div>

            {/* Custom Options based on Type */}
            {accomType === 'cottage' ? (
              <div className="flex flex-col gap-4 bg-tawerna-dark/30 p-4 rounded-lg border border-tawerna-gold/5">
                <h4 className="font-serif font-bold text-sm text-tawerna-cream border-b border-tawerna-gold/10 pb-1.5 mb-2">Specyfikacja Domku</h4>
                
                {/* Standard vs Deluxe */}
                <div>
                  <span className="block text-[11px] font-display font-bold uppercase tracking-wider text-tawerna-sand mb-1.5">Standard domku</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCottageSize('standard')}
                      className={`py-1.5 px-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                        cottageSize === 'standard'
                          ? 'border-tawerna-gold text-tawerna-gold bg-tawerna-gold/5'
                          : 'border-tawerna-gold/10 text-tawerna-sand hover:border-tawerna-gold/30'
                      }`}
                    >
                      Premium Standard (220 zł/dobę)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCottageSize('deluxe')}
                      className={`py-1.5 px-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                        cottageSize === 'deluxe'
                          ? 'border-tawerna-gold text-tawerna-gold bg-tawerna-gold/5'
                          : 'border-tawerna-gold/10 text-tawerna-sand hover:border-tawerna-gold/30'
                      }`}
                    >
                      Większy Deluxe (300 zł/dobę)
                    </button>
                  </div>
                </div>

                {/* Addons */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs md:text-sm text-tawerna-sand hover:text-tawerna-cream">
                    <input
                      type="checkbox"
                      checked={hasPet}
                      onChange={(e) => setHasPet(e.target.checked)}
                      className="w-4 h-4 rounded accent-tawerna-gold"
                    />
                    Pobyt z psem/kotem (+20 zł/doba)
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs md:text-sm text-tawerna-sand hover:text-tawerna-cream">
                    <input
                      type="checkbox"
                      checked={kayakRent}
                      onChange={(e) => setKayakRent(e.target.checked)}
                      className="w-4 h-4 rounded accent-tawerna-gold"
                    />
                    Własny kajak na wyłączność (+80 zł/doba)
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs md:text-sm text-tawerna-sand hover:text-tawerna-cream">
                    <input
                      type="checkbox"
                      checked={firewoodPkg}
                      onChange={(e) => setFirewoodPkg(e.target.checked)}
                      className="w-4 h-4 rounded accent-tawerna-gold"
                    />
                    Pakiet na kociołek/ognisko: Drewno dębowe + rozpałka (+50 zł jednorazowo)
                  </label>
                </div>

              </div>
            ) : (
              <div className="flex flex-col gap-4 bg-tawerna-dark/30 p-4 rounded-lg border border-tawerna-gold/5">
                <h4 className="font-serif font-bold text-sm text-tawerna-cream border-b border-tawerna-gold/10 pb-1.5 mb-2">Konfiguracja Pola Namiotowego</h4>

                {/* Tent vs Camper */}
                <div>
                  <span className="block text-[11px] font-display font-bold uppercase tracking-wider text-tawerna-sand mb-1.5">Stanowisko campingowe</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCampsiteType('tent')}
                      className={`py-1.5 px-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                        campsiteType === 'tent'
                          ? 'border-tawerna-gold text-tawerna-gold bg-tawerna-gold/5'
                          : 'border-tawerna-gold/10 text-tawerna-sand hover:border-tawerna-gold/30'
                      }`}
                    >
                      Namiot / Miejsce na polu (+15 zł/dobę)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCampsiteType('camper')}
                      className={`py-1.5 px-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                        campsiteType === 'camper'
                          ? 'border-tawerna-gold text-tawerna-gold bg-tawerna-gold/5'
                          : 'border-tawerna-gold/10 text-tawerna-sand hover:border-tawerna-gold/30'
                      }`}
                    >
                      Przyczepa / Kamper (+45 zł/dobę)
                    </button>
                  </div>
                </div>

                {/* Campsite Addons */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs md:text-sm text-tawerna-sand hover:text-tawerna-cream">
                    <input
                      type="checkbox"
                      checked={powerHookup}
                      onChange={(e) => setPowerHookup(e.target.checked)}
                      className="w-4 h-4 rounded accent-tawerna-gold"
                    />
                    Przyłącze elektryczne do namiotu/kampera (+20 zł/doba)
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs md:text-sm text-tawerna-sand hover:text-tawerna-cream">
                    <input
                      type="checkbox"
                      checked={hasPet}
                      onChange={(e) => setHasPet(e.target.checked)}
                      className="w-4 h-4 rounded accent-tawerna-gold"
                    />
                    Zwierzę domowe na polu namiotowym (+10 zł/doba)
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs md:text-sm text-tawerna-sand hover:text-tawerna-cream">
                    <input
                      type="checkbox"
                      checked={kayakRent}
                      onChange={(e) => setKayakRent(e.target.checked)}
                      className="w-4 h-4 rounded accent-tawerna-gold"
                    />
                    Wynajem kajaka ze spływem (+80 zł/doba)
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Results Side */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-tawerna-wood rounded-xl border-2 border-tawerna-gold/25 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-tawerna-gold/5 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <span className="font-display text-[10px] uppercase font-bold tracking-widest text-tawerna-gold">Orientacyjna wycena</span>
              <h3 className="font-serif font-black text-2xl text-tawerna-cream mb-4">Podsumowanie pobytu</h3>

              {/* Price Display */}
              <div className="bg-tawerna-dark/60 p-4 rounded-lg border border-tawerna-gold/15 text-center mb-6">
                <span className="block text-xs font-sans text-tawerna-sand">Uśredniony szacowany koszt:</span>
                <span className="block font-display text-3xl md:text-4xl font-extrabold text-tawerna-gold glow-gold mt-1">
                  {totalPrice} zł / <span className="text-sm font-sans tracking-tight font-medium text-tawerna-cream">{nights} dób{nights === 1 ? 'ę' : ''}</span>
                </span>
                <span className="block text-[10px] text-tawerna-sand/70 mt-1 italic">
                  *Podana kwota ma charakter poglądowy i zależy od terminu.
                </span>
              </div>

              {/* Items breakdown list */}
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-xs font-display font-semibold uppercase tracking-wider text-tawerna-gold">Wykaz opłat:</span>
                <div className="max-h-40 overflow-y-auto flex flex-col gap-1.5 pr-2">
                  {breakdown.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-xs font-serif text-tawerna-sand">
                      <span className="text-tawerna-gold mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiry Snippet Clipboard */}
            <div className="mt-4 pt-4 border-t border-tawerna-gold/20">
              <span className="block text-[11px] font-display font-semibold text-tawerna-gold tracking-wide uppercase mb-2">Zapytanie rezerwacyjne (Szybki kontakt)</span>
              
              <div className="bg-tawerna-dark/80 p-3.5 rounded border border-tawerna-gold/10 text-[11px] font-mono text-tawerna-sand text-left leading-relaxed max-h-24 overflow-y-auto mb-3 select-all">
                {getReservationText()}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-xs py-2.5 rounded transition cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Skopiowano zapytanie!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Skopiuj dane do schowka
                    </>
                  )}
                </button>
                <a
                  href={`mailto:pttkswornegacie@gmail.com?subject=Inne/Zapytanie%20Noclegowe%20Stanica%20PTTK&body=${encodeURIComponent(getReservationText())}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-tawerna-wood-light border border-tawerna-gold/30 hover:border-tawerna-gold text-tawerna-cream hover:bg-tawerna-dark font-sans font-bold text-xs py-2.5 rounded transition text-center"
                >
                  <Clipboard className="w-4 h-4" />
                  Wyślij Zapytanie E-mailem
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
