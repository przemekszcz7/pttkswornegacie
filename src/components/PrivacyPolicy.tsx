import React, { useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Mail, Lock, FileText, Calendar } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Polityka Prywatności - Stanica Wodna i Tawerna PTTK Swornegacie';
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
            <ShieldCheck className="w-7 h-7 text-tawerna-gold" />
            <span className="font-display tracking-widest text-xs uppercase font-bold">Dokument prawny serwisu</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Polityka Prywatności
          </h1>
          <p className="font-serif italic text-tawerna-gold text-lg md:text-xl mt-1">
            serwisu pttkswornegacie.pl
          </p>

          <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mt-6 border-l-4 border-tawerna-gold pl-4 bg-tawerna-wood/30 py-3 pr-3 rounded-r-lg">
            Ochrona prywatności użytkowników jest dla nas niezwykle ważna. Niniejsza Polityka Prywatności wyjaśnia, jakie dane gromadzimy, w jakim celu je przetwarzamy oraz jak dbamy o ich bezpieczeństwo w związku z korzystaniem z serwisu internetowego{' '}
            <a href="https://pttkswornegacie.pl" className="text-tawerna-gold underline hover:text-white transition">
              https://pttkswornegacie.pl
            </a>.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-left">
          
          {/* Section 1 */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono">1</span>
              Administrator Danych Osobowych
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Administratorem danych osobowych zbieranych za pośrednictwem strony internetowej jest właściciel i operator serwisu <strong className="text-white">pttkswornegacie.pl</strong> (Stanica Wodna i Tawerna PTTK w Swornegaciach).
            </p>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mt-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-tawerna-gold shrink-0" />
              <span>
                W sprawach związanych z ochroną danych osobowych można kontaktować się pod adresem e-mail:{' '}
                <a href="mailto:pttkswornegacie@gmail.com" className="text-tawerna-gold font-bold hover:underline">
                  pttkswornegacie@gmail.com
                </a>
              </span>
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono">2</span>
              Jakie dane przetwarzamy?
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mb-3">
              Podczas korzystania z formularza rezerwacji domków/usług na naszej stronie możemy prosić o podanie następujących danych:
            </p>
            <ul className="space-y-2 text-sm md:text-base text-tawerna-sand">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                <strong className="text-white">Imię i nazwisko</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                <strong className="text-white">Adres e-mail</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                <strong className="text-white">Numer telefonu</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                <strong className="text-white">Wybrany termin rezerwacji oraz uwagi do zgłoszenia</strong>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono">3</span>
              Cel i podstawa przetwarzania danych
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mb-3">
              Twoje dane osobowe są przetwarzane wyłącznie w celu:
            </p>
            <ul className="space-y-2 text-sm md:text-base text-tawerna-sand">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>Realizacji procesu rezerwacji oraz obsługi zapytania dotyczącego wynajmu domków/usług.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>Kontaktowania się z Tobą w sprawach związanych z dokonaną rezerwacją.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>Przesłania automatycznego zaproszenia/potwierdzenia terminu na podany adres e-mail.</span>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-[#1a100a]/95 border-2 border-tawerna-gold/30 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="font-mono text-xs uppercase font-bold tracking-wider">Integracja zewnętrzna</span>
            </div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/40 inline-flex items-center justify-center text-xs text-blue-300 font-mono">4</span>
              Integracja z Google Calendar API
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mb-4">
              Nasza strona wykorzystuje integrację z usługą <strong className="text-white">Google Calendar API</strong> (dostarczaną przez Google LLC) w celu obsługi kalendarza dostępności oraz automatycznego tworzenia wydarzeń/rezerwacji.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-tawerna-dark/80 p-4 rounded-xl border border-tawerna-gold/20">
                <p className="font-bold text-tawerna-gold text-xs uppercase font-mono mb-1">Zakres danych</p>
                <p className="text-xs text-tawerna-cream leading-relaxed">
                  Serwis przesyła do usługi Kalendarza Google informacje niezbędne do utworzenia rezerwacji (imię i nazwisko, wybrane daty pobytu oraz dane kontaktowe).
                </p>
              </div>
              <div className="bg-tawerna-dark/80 p-4 rounded-xl border border-tawerna-gold/20">
                <p className="font-bold text-tawerna-gold text-xs uppercase font-mono mb-1">Wykorzystanie danych</p>
                <p className="text-xs text-tawerna-cream leading-relaxed">
                  Dane pozyskane lub przekazane za pośrednictwem interfejsów API Google są wykorzystywane wyłącznie do obsługi i potwierdzenia rezerwacji.
                </p>
              </div>
              <div className="bg-tawerna-dark/80 p-4 rounded-xl border border-emerald-500/30">
                <p className="font-bold text-emerald-400 text-xs uppercase font-mono mb-1">Brak udostępniania</p>
                <p className="text-xs text-tawerna-cream leading-relaxed">
                  Nie udostępniamy, nie sprzedajemy ani nie wykorzystujemy danych z usługi Google Calendar do celów reklamowych, analitycznych ani profili marketingowych.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono">5</span>
              Odbiorcy danych i przekazywanie danych
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Twoje dane osobowe nie są sprzedawane ani udostępniane osobom trzecim, z wyjątkiem podmiotów świadczących na naszą rzecz usługi technologiczne (Google LLC w zakresie obsługi kalendarza i e-mail) wyłącznie w celu prawidłowej realizacji rezerwacji.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono">6</span>
              Prawa użytkownika
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed mb-3">
              Każdemu użytkownikowi przysługuje prawo do:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-tawerna-sand mb-4">
              <div className="bg-tawerna-dark/50 p-2.5 rounded-lg border border-tawerna-gold/15">
                • Dostępu do treści swoich danych osobowych
              </div>
              <div className="bg-tawerna-dark/50 p-2.5 rounded-lg border border-tawerna-gold/15">
                • Sprostowania (poprawiania) danych
              </div>
              <div className="bg-tawerna-dark/50 p-2.5 rounded-lg border border-tawerna-gold/15">
                • Żądania usunięcia danych (&bdquo;prawo do bycia zapomnianym&rdquo;)
              </div>
              <div className="bg-tawerna-dark/50 p-2.5 rounded-lg border border-tawerna-gold/15">
                • Ograniczenia przetwarzania danych
              </div>
              <div className="bg-tawerna-dark/50 p-2.5 rounded-lg border border-tawerna-gold/15 sm:col-span-2">
                • Wniesienia sprzeciwu wobec przetwarzania
              </div>
            </div>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              W celu realizacji swoich praw skontaktuj się z nami pod adresem:{' '}
              <a href="mailto:pttkswornegacie@gmail.com" className="text-tawerna-gold font-bold hover:underline">
                pttkswornegacie@gmail.com
              </a>
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono">7</span>
              Pliki Cookies (Ciasteczka)
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Strona <strong className="text-white">pttkswornegacie.pl</strong> może wykorzystywać pliki cookies niezbędne do prawidłowego funkcjonowania witryny oraz obsługi formularzy rezerwacyjnych. Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono">8</span>
              Zmiany w Polityce Prywatności
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. Aktualna wersja dokumentu jest zawsze dostępna na stronie{' '}
              <a href="https://pttkswornegacie.pl/polityka-prywatnosci.html" className="text-tawerna-gold hover:underline font-mono text-xs md:text-sm">
                https://pttkswornegacie.pl/polityka-prywatnosci.html
              </a>.
            </p>
            <div className="mt-4 pt-4 border-t border-tawerna-gold/15 flex items-center justify-between text-xs text-tawerna-sand">
              <span>Status: Obowiązująca</span>
              <span className="font-mono text-tawerna-gold">Data ostatniej aktualizacji: 16 sierpnia 2026 r.</span>
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
