import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, AlertCircle, HelpCircle, ExternalLink } from 'lucide-react';
import { FAQ_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  
  const [formSent, setFormSent] = useState(false);
  const [copiedText, setCopiedText] = useState<'phone' | 'email' | 'address' | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, type: 'phone' | 'email' | 'address') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    // Trigger success state
    setFormSent(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMsg('');
    setFormSent(false);
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

        {/* Info, Map & Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Column Left: Contact Info and Google Maps iframe */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-tawerna-wood/80 p-6 md:p-8 rounded-xl border border-tawerna-gold/15 shadow-xl">
            <div>
              <span className="font-display text-[10px] uppercase font-bold tracking-widest text-tawerna-gold">Biuro Stanicy PTTK</span>
              <h3 className="font-serif font-bold text-2xl text-tawerna-cream mb-6">Dane Kontaktowe</h3>

              {/* Contacts blocks */}
              <div className="flex flex-col gap-4 mb-8">
                {/* Phone */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/10 hover:border-tawerna-gold/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-tawerna-gold/10 text-tawerna-gold">
                      <Phone className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-tawerna-sand">ZADZWOŃ TERAZ</span>
                      <a href="tel:+48798550017" className="font-sans font-bold text-md tracking-wider text-tawerna-cream hover:text-tawerna-gold transition">
                        798 550 017
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('798 550 017', 'phone')}
                    className="p-2 text-tawerna-sand hover:text-tawerna-gold rounded transition cursor-pointer"
                    title="Kopiuj numer"
                  >
                    {copiedText === 'phone' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/10 hover:border-tawerna-gold/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-tawerna-clay/15 text-tawerna-gold">
                      <Mail className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div className="flex flex-col">
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
                    <div className="flex flex-col">
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

            {/* Google map iframe wrapper formatted beautifully like framed wood art */}
            <div className="mt-4 overflow-hidden rounded-lg wood-frame aspect-video relative min-h-[220px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4704.987979302433!2d17.499789199977307!3d53.86964531577594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4702156fffffffff%3A0xb9998feb48d9fc65!2sStanica%20wodna%20PTTK!5e0!3m2!1spl!2spl!4v1779527250441!5m2!1spl!2spl"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Column Right: Message Sheet */}
          <div className="lg:col-span-6 bg-[#1a0c06]/95 border border-tawerna-gold/20 rounded-xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <span className="font-display text-[10px] uppercase font-bold tracking-widest text-tawerna-gold">Napisz bezpośrednio</span>
              <h3 className="font-serif font-bold text-2xl text-tawerna-cream mb-2">Formularz Kontaktowy</h3>
              <p className="text-xs font-serif text-tawerna-sand italic mb-6">
                Skorzystaj z formularza poniżej. Wszystkie zapytania są obsługiwane bezzwłocznie przez nową miłą obsługę.
              </p>

              <AnimatePresence mode="wait">
                {!formSent ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-tawerna-sand mb-1">
                          Imię i Nazwisko *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="np. Jan Kowalski"
                          className="w-full bg-tawerna-dark/70 border border-tawerna-gold/15 focus:border-tawerna-gold/60 focus:outline-none rounded p-2.5 text-sm transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-wider text-tawerna-sand mb-1">
                          Telefon kontaktowy
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="np. +48 123 456 789"
                          className="w-full bg-tawerna-dark/70 border border-tawerna-gold/15 focus:border-tawerna-gold/60 focus:outline-none rounded p-2.5 text-sm transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-tawerna-sand mb-1">
                        Adres E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="np. jan.kowalski@gmail.com"
                        className="w-full bg-tawerna-dark/70 border border-tawerna-gold/15 focus:border-tawerna-gold/60 focus:outline-none rounded p-2.5 text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-tawerna-sand mb-1">
                        Treść Twojego zapytania *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Wpisz treść swojej wiadomości, termin pobytu, zapytanie o kajaki lub rezerwację..."
                        className="w-full bg-tawerna-dark/70 border border-tawerna-gold/15 focus:border-tawerna-gold/60 focus:outline-none rounded p-2.5 text-sm transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold tracking-wide text-sm py-3.5 rounded-lg transition-all cursor-pointer shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      Wyślij wiadomość bezpośrednio
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-tawerna-dark/50 border border-tawerna-gold/25 p-6 rounded-lg text-center flex flex-col items-center py-10"
                  >
                    <CheckCircle2 className="w-14 h-14 text-green-500 mb-4" />
                    <h4 className="font-serif font-black text-xl text-tawerna-cream mb-2">
                      Wiadomość została przygotowana!
                    </h4>
                    <p className="text-xs text-tawerna-sand max-w-sm mb-6 leading-relaxed">
                      Dziękujemy, {name}. Aby natychmiast wysłać zapytanie i zagwarantować błyskawiczną rezerwację, możesz otworzyć program pocztowy jednym kliknięciem poniżej!
                    </p>

                    <div className="flex flex-col gap-2.5 w-full">
                      <a
                        href={`mailto:pttkswornegacie@gmail.com?subject=Zapytanie%20od%20${encodeURIComponent(name)}&body=${encodeURIComponent(`Imię: ${name}\nTelefon: ${phone}\nE-mail: ${email}\n\nWiadomość:\n${msg}`)}`}
                        className="w-full justify-center flex items-center gap-2 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-sm py-3 rounded"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Wyślij przez E-mail
                      </a>
                      <button
                        onClick={handleReset}
                        className="w-full text-xs font-semibold text-tawerna-sand hover:text-tawerna-gold underline decoration-tawerna-gold/30 underline-offset-4"
                      >
                        Napisz nową wiadomość
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* FAQ Section Integrated elegantly in Contact Area */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-tawerna-gold" />
            <h3 className="font-display text-sm tracking-wider text-tawerna-gold uppercase font-bold text-center">Najczęściej Zadawane Pytania (FAQ)</h3>
          </div>
          <h4 className="font-serif text-2xl md:text-3xl text-center text-tawerna-cream mb-8">Odpowiadamy na pytania gości</h4>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-tawerna-gold/15 bg-tawerna-wood/40 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex justify-between items-center bg-tawerna-wood/60 hover:bg-tawerna-wood transition cursor-pointer text-sm md:text-base font-bold font-serif text-tawerna-cream"
                  >
                    <span>{item.question}</span>
                    <span className="text-tawerna-gold font-mono font-bold ml-2">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-tawerna-dark/50 text-xs md:text-sm text-tawerna-sand font-serif italic border-t border-tawerna-gold/5 leading-relaxed text-balance">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
