import React, { useEffect } from 'react';
import { Cookie, ArrowLeft, Mail, ShieldCheck, Settings, ExternalLink } from 'lucide-react';

interface CookiePolicyProps {
  onBack?: () => void;
}

export default function CookiePolicy({ onBack }: CookiePolicyProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Polityka Cookies - Stanica Wodna i Tawerna PTTK Swornegacie';
  }, []);

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-screen bg-tawerna-dark text-tawerna-cream pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 bg-tawerna-wood/60 hover:bg-tawerna-gold hover:text-tawerna-dark text-tawerna-sand px-4 py-2.5 rounded-xl border border-tawerna-gold/30 transition-all font-sans font-bold text-xs md:text-sm shadow-md group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Powrót do strony głównej
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-[#1a0e08]/95 border-2 border-tawerna-gold/35 rounded-3xl p-6 md:p-10 shadow-2xl mb-8 relative overflow-hidden text-left">
          <div className="flex items-center gap-3 text-tawerna-gold mb-3">
            <Cookie className="w-7 h-7 text-tawerna-gold" />
            <span className="font-display tracking-widest text-xs uppercase font-bold">Dokument prawny serwisu</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Polityka Cookies
          </h1>
          <p className="font-serif italic text-tawerna-gold text-lg md:text-xl mt-1">
            serwisu pttkswornegacie.pl
          </p>

          <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mt-6 border-l-4 border-tawerna-gold pl-4 bg-tawerna-wood/30 py-3 pr-3 rounded-r-lg">
            Niniejsza Polityka Cookies określa zasady przechowywania i uzyskiwania dostępu do informacji na urządzeniach Użytkownika za pomocą plików cookies w serwisie internetowym{' '}
            <a href="https://pttkswornegacie.pl" className="text-tawerna-gold underline hover:text-white transition">
              pttkswornegacie.pl
            </a>.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-left">
          
          {/* 1. Czym są pliki cookies? */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">1</span>
              Czym są pliki cookies?
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Pliki cookies (tzw. „ciasteczka") to niewielkie pliki tekstowe zapisywane przez przeglądarkę internetową na urządzeniu Użytkownika podczas korzystania z serwisu <strong className="text-white">pttkswornegacie.pl</strong>. Pozwalają one na zapamiętanie informacji o wizycie Użytkownika oraz prawidłowe działanie strony.
            </p>
          </div>

          {/* 2. Kto umieszcza pliki cookies? */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">2</span>
              Kto umieszcza pliki cookies?
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Administratorem plików cookies jest właściciel i operator serwisu <strong className="text-white">pttkswornegacie.pl</strong> (Stanica Wodna i Tawerna PTTK w Swornegaciach).
            </p>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mt-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-tawerna-gold shrink-0" />
              <span>
                Kontakt:{' '}
                <a href="mailto:pttkswornegacie@gmail.com" className="text-tawerna-gold font-bold hover:underline">
                  pttkswornegacie@gmail.com
                </a>.
              </span>
            </p>
          </div>

          {/* 3. Jakich plików cookies używamy? */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">3</span>
              Jakich plików cookies używamy?
            </h2>
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-tawerna-gold/30 text-tawerna-gold text-xs uppercase tracking-wider font-mono">
                    <th className="py-3 px-4 bg-tawerna-dark/60 rounded-tl-xl">Rodzaj</th>
                    <th className="py-3 px-4 bg-tawerna-dark/60">Cel</th>
                    <th className="py-3 px-4 bg-tawerna-dark/60 rounded-tr-xl">Czas przechowywania</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tawerna-gold/15 text-sm">
                  <tr className="hover:bg-tawerna-wood/20 transition">
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      Niezbędne
                    </td>
                    <td className="py-3 px-4 text-tawerna-cream">
                      Zapewnienie podstawowego działania strony, w tym formularza rezerwacji oraz systemu płatności ING Pay.
                    </td>
                    <td className="py-3 px-4 text-tawerna-sand font-mono text-xs">
                      Sesja / do 12 miesięcy
                    </td>
                  </tr>
                  <tr className="hover:bg-tawerna-wood/20 transition">
                    <td className="py-3 px-4 font-bold text-tawerna-gold whitespace-nowrap">
                      Funkcjonalne
                    </td>
                    <td className="py-3 px-4 text-tawerna-cream">
                      Zapamiętanie ustawień Użytkownika (np. wybranego terminu rezerwacji) między odwiedzinami strony.
                    </td>
                    <td className="py-3 px-4 text-tawerna-sand font-mono text-xs">
                      Do 12 miesięcy
                    </td>
                  </tr>
                  <tr className="hover:bg-tawerna-wood/20 transition">
                    <td className="py-3 px-4 font-bold text-blue-300 whitespace-nowrap">
                      Analityczne (opcjonalne)
                    </td>
                    <td className="py-3 px-4 text-tawerna-cream">
                      Statystyki odwiedzin strony, pomagające nam ją ulepszać. Aktywne wyłącznie po wyrażeniu zgody.
                    </td>
                    <td className="py-3 px-4 text-tawerna-sand font-mono text-xs">
                      Do 24 miesięcy
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Podstawa prawna */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">4</span>
              Podstawa prawna
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Pliki cookies niezbędne do działania Serwisu są instalowane na podstawie art. 173 ust. 3 pkt 2 ustawy Prawo telekomunikacyjne (nie wymagają zgody Użytkownika). Pozostałe pliki cookies (funkcjonalne, analityczne) są instalowane wyłącznie za zgodą Użytkownika, wyrażoną poprzez ustawienia bannera cookies wyświetlanego przy pierwszej wizycie w Serwisie, zgodnie z art. 6 ust. 1 lit. a RODO.
            </p>
          </div>

          {/* 5. Zarządzanie plikami cookies */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">5</span>
              Zarządzanie plikami cookies
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Użytkownik może w każdej chwili zmienić swoją zgodę na pliki cookies opcjonalne poprzez ustawienia bannera cookies dostępnego na stronie, a także zmienić ustawienia dotyczące plików cookies bezpośrednio w swojej przeglądarce internetowej (włącznie z ich całkowitym zablokowaniem lub usunięciem). Należy pamiętać, że zablokowanie plików cookies niezbędnych może uniemożliwić prawidłowe korzystanie z formularza rezerwacji.
            </p>
          </div>

          {/* 6. Podmioty trzecie */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">6</span>
              Podmioty trzecie
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              W związku z korzystaniem z zewnętrznych usług (Google Calendar API, system płatności ING Pay), niektóre pliki cookies mogą być zamieszczane przez te podmioty na zasadach określonych w ich własnych politykach prywatności.
            </p>
          </div>

          {/* 7. Zmiany w Polityce Cookies */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">7</span>
              Zmiany w Polityce Cookies
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Cookies. Aktualna wersja dokumentu jest zawsze dostępna na stronie <strong className="text-white">pttkswornegacie.pl</strong>.
            </p>
            <div className="mt-4 pt-4 border-t border-tawerna-gold/15 flex items-center justify-between text-xs text-tawerna-sand">
              <span>Status: Obowiązująca</span>
              <span className="font-mono text-tawerna-gold font-bold">Data ostatniej aktualizacji: 13 września 2026 r.</span>
            </div>
          </div>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <button
            onClick={handleGoBack}
            className="px-8 py-3.5 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-sm md:text-base rounded-xl transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            Wróć do strony głównej
          </button>
        </div>

      </div>
    </div>
  );
}
