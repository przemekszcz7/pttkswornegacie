import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Copy } from 'lucide-react';

export default function ContactForm() {
  const [copiedText, setCopiedText] = useState<'phone' | 'email' | 'address' | null>(null);

  const handleCopy = (text: string, type: 'phone' | 'email' | 'address') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <section id="kontakt" className="py-24 bg-tawerna-dark relative overflow-hidden organic-bg">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-tawerna-forest/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/2 left-0 w-64 h-64 bg-tawerna-clay/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-tawerna-gold mb-3">
            <MapPin className="w-5 h-5" />
            <span className="font-display tracking-widest text-xs font-bold uppercase">Zapraszamy na Kaszuby</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-tawerna-cream tracking-tight mb-4">
            Kontakt i Lokalizacja
          </h2>
          <div className="w-24 h-1 bg-tawerna-gold mx-auto rounded-full"></div>
        </div>

        {/* Info & Map Layout - Clean, centered and high contrast */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Column Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-tawerna-wood/80 p-6 md:p-8 rounded-2xl border-2 border-tawerna-gold/20 shadow-xl">
            <div>
              <span className="font-display text-xs uppercase font-bold tracking-widest text-tawerna-gold">Biuro Stanicy Swornegacie</span>
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-6">Jak się z nami skontaktować?</h3>
              <p className="text-sm text-tawerna-sand mb-8 leading-relaxed font-serif italic text-left">
                Szybki kontakt telefoniczny to u nas podstawa. Jeśli masz pytania o rezerwację lub spływy – śmiało dzwoń!
              </p>

              {/* Contacts blocks */}
              <div className="flex flex-col gap-4">
                {/* Phone - BIG AND TOUCH-FRIENDLY */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/45 border-2 border-emerald-500/30 hover:border-emerald-400 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Phone className="w-6 h-6 flex-shrink-0" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider uppercase">ZADZWOŃ TERAZ</span>
                      <a href="tel:+48798550017" className="font-sans font-black text-xl tracking-wider text-white hover:text-tawerna-gold transition">
                        798 550 017
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/10 hover:border-tawerna-gold/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-tawerna-clay/15 text-tawerna-gold">
                      <Mail className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono text-tawerna-sand">WYŚLIJ E-MAIL</span>
                      <a href="mailto:pttkswornegacie@gmail.com" className="font-sans font-semibold text-sm text-tawerna-cream hover:text-tawerna-gold transition break-all">
                        pttkswornegacie@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('pttkswornegacie@gmail.com', 'email')}
                    className="p-2 text-tawerna-sand hover:text-tawerna-gold rounded transition cursor-pointer"
                    title="Kopiuj email"
                  >
                    {copiedText === 'email' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Address */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/10 hover:border-tawerna-gold/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-tawerna-forest/20 text-tawerna-gold">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono text-tawerna-sand">ADRES STANICY</span>
                      <p className="font-serif font-bold text-sm text-tawerna-cream leading-tight">
                        Zbrzyca 17, Swornegacie 89-608
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('Zbrzyca 17, Swornegacie 89-608', 'address')}
                    className="p-2 text-tawerna-sand hover:text-tawerna-gold rounded transition cursor-pointer"
                    title="Kopiuj adres"
                  >
                    {copiedText === 'address' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-tawerna-gold/10 text-xs font-serif italic text-tawerna-sand text-left">
              * Zapraszamy od poniedziałku do niedzieli. Recepcja i Tawerna są czynne od rana do późnego wieczora.
            </div>
          </div>

          {/* Column Right: Google Maps Map Frame */}
          <div className="lg:col-span-7 bg-[#1a0c06]/90 border-2 border-tawerna-gold/20 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="mb-4 text-left">
              <span className="font-display text-xs uppercase font-bold tracking-widest text-tawerna-gold">Gdzie dokładnie jesteśmy?</span>
              <h3 className="font-serif font-bold text-2xl text-tawerna-cream">Swornegacie nad rzeką Zbrzyca</h3>
            </div>
            {/* Google map iframe wrapper formatted beautifully like framed wood art */}
            <div className="w-full h-full overflow-hidden rounded-xl border border-tawerna-gold/15 aspect-video relative min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4704.987979302433!2d17.499789199977307!3d53.86964531577594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4702156fffffffff%3A0xb9998feb48d9fc65!2sStanica%20wodna%20PTTK!5e0!3m2!1spl!2spl!4v1779527250441!5m2!1spl!2spl"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
