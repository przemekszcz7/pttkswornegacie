import React, { useEffect } from 'react';
import { FileText, ArrowLeft, Mail, Phone, MapPin, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack?: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Regulamin Serwisu - Stanica Wodna i Tawerna PTTK Swornegacie';
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
            <Scale className="w-7 h-7 text-tawerna-gold" />
            <span className="font-display tracking-widest text-xs uppercase font-bold">Dokument prawny serwisu</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            REGULAMIN SERWISU
          </h1>
          <p className="font-serif italic text-tawerna-gold text-lg md:text-xl mt-1">
            Stanica Wodna i Tawerna PTTK Swornegacie
          </p>
          <p className="text-xs font-mono text-tawerna-sand/80 mt-1 uppercase tracking-wider">
            serwisu internetowego pttkswornegacie.pl
          </p>

          <div className="mt-6 border-l-4 border-tawerna-gold pl-4 bg-tawerna-wood/30 py-3 pr-3 rounded-r-lg text-sm text-tawerna-cream">
            Niniejszy Regulamin określa zasady korzystania z serwisu internetowego działającego pod adresem{' '}
            <a href="https://www.pttkswornegacie.pl" className="text-tawerna-gold underline hover:text-white transition">
              www.pttkswornegacie.pl
            </a>, w tym zasady dokonywania rezerwacji domków, kajaków oraz usług gastronomicznych świadczonych przez Stanicę Wodną i Tawernę PTTK Swornegacie.
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-left">
          
          {/* § 1 Postanowienia ogólne */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 1</span>
              Postanowienia ogólne
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> Niniejszy Regulamin określa zasady korzystania z serwisu internetowego działającego pod adresem www.pttkswornegacie.pl (dalej: „Serwis”), w tym zasady dokonywania rezerwacji domków, kajaków oraz usług gastronomicznych świadczonych przez Stanicę Wodną i Tawernę PTTK Swornegacie.
              </p>
              <p>
                <strong>2.</strong> Właścicielem i administratorem Serwisu, a także podmiotem świadczącym usługi opisane w Regulaminie, jest:
                <br />
                <span className="text-white font-semibold">Kajbar Kajetan Baraniak</span>, z głównym miejscem wykonywania działalności gospodarczej: ul. Łąkowa 18a, 61-879 Poznań, oraz dodatkowym stałym miejscem wykonywania działalności: Zbrzyca 17, 89-608 (Stanica Wodna i Tawerna PTTK Swornegacie), wpisany do Centralnej Ewidencji i Informacji o Działalności Gospodarczej Rzeczypospolitej Polskiej prowadzonej przez ministra właściwego ds. gospodarki, <strong className="text-tawerna-gold font-mono">NIP: 7822335345</strong>, <strong className="text-tawerna-gold font-mono">REGON: 525186449</strong>, zwany dalej „Organizatorem” lub „Usługodawcą”.
              </p>
              <div className="pt-2">
                <p><strong>3.</strong> Kontakt z Usługodawcą możliwy jest za pośrednictwem:</p>
                <ul className="mt-2 space-y-1.5 pl-4 text-tawerna-sand">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-tawerna-gold shrink-0" />
                    <span>adresu e-mail: <a href="mailto:pttkswornegacie@gmail.com" className="text-tawerna-gold hover:underline font-bold">pttkswornegacie@gmail.com</a></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-tawerna-gold shrink-0" />
                    <span>numeru telefonu: <a href="tel:+48798550017" className="text-tawerna-gold hover:underline font-bold">798 550 017</a></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-tawerna-gold shrink-0" />
                    <span>adresu korespondencyjnego: ul. Warszawska 82 lok. 189, 61-031 Poznań</span>
                  </li>
                </ul>
              </div>
              <p>
                <strong>4.</strong> Niniejszy Regulamin jest regulaminem, o którym mowa w art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
              </p>
              <p className="p-3 bg-tawerna-wood/40 border border-tawerna-gold/25 rounded-xl text-tawerna-gold">
                <strong>5.</strong> Każdy Klient przed dokonaniem rezerwacji zobowiązany jest zapoznać się z treścią Regulaminu. Dokonanie rezerwacji jest równoznaczne z akceptacją jego postanowień.
              </p>
            </div>
          </div>

          {/* § 2 Definicje */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 2</span>
              Definicje
            </h2>
            <div className="space-y-2.5 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <div className="p-2.5 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/15">
                <strong className="text-tawerna-gold">Serwis</strong> – strona internetowa dostępna pod adresem www.pttkswornegacie.pl.
              </div>
              <div className="p-2.5 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/15">
                <strong className="text-tawerna-gold">Usługodawca / Organizator</strong> – Kajbar Kajetan Baraniak, podmiot wskazany w § 1 ust. 2 Regulaminu.
              </div>
              <div className="p-2.5 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/15">
                <strong className="text-tawerna-gold">Klient</strong> – osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, korzystająca z Serwisu i dokonująca Rezerwacji.
              </div>
              <div className="p-2.5 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/15">
                <strong className="text-tawerna-gold">Konsument</strong> – Klient będący osobą fizyczną, dokonujący czynności prawnej niezwiązanej bezpośrednio z jego działalnością gospodarczą lub zawodową.
              </div>
              <div className="p-2.5 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/15">
                <strong className="text-tawerna-gold">Przedsiębiorca na prawach Konsumenta</strong> – Klient będący osobą fizyczną, zawierający umowę bezpośrednio związaną z jego działalnością gospodarczą, gdy z treści tej umowy wynika, że nie posiada ona dla niego charakteru zawodowego, wynikającego w szczególności z przedmiotu wykonywanej przez niego działalności gospodarczej, udostępnionego na podstawie przepisów o Centralnej Ewidencji i Informacji o Działalności Gospodarczej.
              </div>
              <div className="p-2.5 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/15">
                <strong className="text-tawerna-gold">Rezerwacja</strong> – zgłoszenie chęci skorzystania z usług Usługodawcy (wynajem domku, kajaku, usługa gastronomiczna) dokonane za pośrednictwem formularza w Serwisie.
              </div>
              <div className="p-2.5 rounded-lg bg-tawerna-dark/50 border border-tawerna-gold/15">
                <strong className="text-tawerna-gold">Usługa</strong> – usługa wynajmu domku, wynajmu kajaku lub usługa gastronomiczna świadczona przez Usługodawcę.
              </div>
            </div>
          </div>

          {/* § 3 Rodzaj i zakres usług */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 3</span>
              Rodzaj i zakres usług
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <div>
                <p><strong>1.</strong> Zgodnie z wpisem do CEIDG, Usługodawca prowadzi działalność w zakresie:</p>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-tawerna-sand">
                  <li className="p-2 rounded bg-tawerna-dark/40 border border-tawerna-gold/15">
                    <strong className="text-white font-mono">55.20.Z</strong> – Obiekty noclegowe turystyczne i miejsca krótkotrwałego zakwaterowania,
                  </li>
                  <li className="p-2 rounded bg-tawerna-dark/40 border border-tawerna-gold/15">
                    <strong className="text-white font-mono">10.85.Z</strong> – Wytwarzanie gotowych posiłków i dań,
                  </li>
                  <li className="p-2 rounded bg-tawerna-dark/40 border border-tawerna-gold/15">
                    <strong className="text-white font-mono">47.11.Z</strong> – Sprzedaż detaliczna niewyspecjalizowana z przewagą żywności, napojów lub wyrobów tytoniowych,
                  </li>
                  <li className="p-2 rounded bg-tawerna-dark/40 border border-tawerna-gold/15">
                    <strong className="text-white font-mono">56.11.Z</strong> – Restauracje,
                  </li>
                  <li className="p-2 rounded bg-tawerna-dark/40 border border-tawerna-gold/15">
                    <strong className="text-white font-mono">56.30.Z</strong> – Podawanie napojów,
                  </li>
                  <li className="p-2 rounded bg-tawerna-dark/40 border border-tawerna-gold/15">
                    <strong className="text-white font-mono">77.34.Z</strong> – Wynajem i dzierżawa środków transportu wodnego.
                  </li>
                </ul>
              </div>
              <div className="pt-2">
                <p><strong>2.</strong> Za pośrednictwem Serwisu Usługodawca umożliwia Klientom:</p>
                <ul className="mt-2 space-y-1.5 pl-4 text-tawerna-sand">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                    <span>zapoznanie się z ofertą wynajmu domków / miejsc noclegowych,</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                    <span>zapoznanie się z ofertą wypożyczalni kajaków,</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                    <span>zapoznanie się z ofertą gastronomiczną Tawerny,</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tawerna-gold"></span>
                    <span>dokonanie zgłoszenia rezerwacyjnego za pomocą formularza kontaktowego.</span>
                  </li>
                </ul>
              </div>
              <p className="pt-2">
                <strong>3.</strong> Rezerwacja dokonana za pomocą formularza w Serwisie staje się wiążąca automatycznie z chwilą otrzymania przez Klienta potwierdzenia rezerwacji wygenerowanego za pośrednictwem Google Calendar, pod warunkiem dokonania pełnej płatności zgodnie z § 5.
              </p>
            </div>
          </div>

          {/* § 4 Sposób zawarcia umowy i dokonywania Rezerwacji */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 4</span>
              Sposób zawarcia umowy i dokonywania Rezerwacji
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> W celu dokonania Rezerwacji Klient wypełnia formularz dostępny w Serwisie, podając: imię i nazwisko, adres e-mail, numer telefonu, wybrany termin oraz zakres usługi.
              </p>
              <p>
                <strong>2.</strong> Po przesłaniu formularza Klient otrzymuje automatyczne potwierdzenie zgłoszenia na podany adres e-mail (za pośrednictwem integracji z Google Calendar).
              </p>
              <p>
                <strong>3.</strong> Umowę pomiędzy Klientem a Usługodawcą uważa się za zawartą z chwilą otrzymania przez Klienta automatycznego potwierdzenia Rezerwacji za pośrednictwem Google Calendar, następującego po zaksięgowaniu pełnej płatności zgodnie z § 5.
              </p>
              <p>
                <strong>4.</strong> Usługodawca zastrzega sobie prawo do odmowy potwierdzenia Rezerwacji w przypadku braku dostępności wybranego terminu, o czym niezwłocznie poinformuje Klienta.
              </p>
            </div>
          </div>

          {/* § 5 Ceny i płatności */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 5</span>
              Ceny i płatności
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> Ceny wynajmu poszczególnych domków wskazane są w Serwisie i wyrażone są w złotych polskich (PLN) za dobę.
              </p>
              <p>
                <strong>2.</strong> Płatność za Rezerwację następuje z góry, w całości, w momencie dokonywania Rezerwacji za pośrednictwem Serwisu.
              </p>
              <p>
                <strong>3.</strong> Klient płaci za zamówioną usługę poprzez zewnętrzny system płatności ING Pay, obsługiwany przez ING Bank Śląski S.A. z siedzibą w Katowicach.
              </p>
              <p className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-300 font-semibold">
                <strong>4.</strong> Rezerwacja jest uznawana za potwierdzoną z chwilą zaksięgowania pełnej płatności.
              </p>
            </div>
          </div>

          {/* § 6 Zmiana i anulowanie Rezerwacji */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 6</span>
              Zmiana i anulowanie Rezerwacji
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> Klient może dokonać zmiany terminu lub anulować Rezerwację, kontaktując się z Usługodawcą pod adresem e-mail <a href="mailto:pttkswornegacie@gmail.com" className="text-tawerna-gold font-bold hover:underline">pttkswornegacie@gmail.com</a> lub telefonicznie pod numerem <a href="tel:+48798550017" className="text-tawerna-gold font-bold hover:underline">798 550 017</a>, nie później niż 14 dni przed planowanym terminem rozpoczęcia usługi.
              </p>
              <p className="text-emerald-300">
                <strong>2.</strong> W przypadku anulowania Rezerwacji z zachowaniem powyższego terminu, wpłacona kwota podlega zwrotowi w całości.
              </p>
              <p className="text-amber-200">
                <strong>3.</strong> W przypadku anulowania Rezerwacji po upływie wskazanego terminu (mniej niż 14 dni przed planowanym terminem rozpoczęcia usługi) lub niestawienia się w umówionym terminie, wpłacona kwota nie podlega zwrotowi.
              </p>
              <p>
                <strong>4.</strong> Zwrot płatności, o którym mowa powyżej, następuje przy użyciu takiego samego sposobu płatności, jakiego użył Klient, chyba że Klient wyraźnie zgodził się na inny sposób zwrotu.
              </p>
            </div>
          </div>

          {/* § 7 Prawo odstąpienia od umowy */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 7</span>
              Prawo odstąpienia od umowy
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> Zgodnie z art. 38 pkt 12 ustawy z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. z 2023 r. poz. 2759 z późn. zm.), prawo odstąpienia od umowy zawartej na odległość nie przysługuje Konsumentowi ani Przedsiębiorcy na prawach Konsumenta w odniesieniu do umów o świadczenie usług związanych z wypoczynkiem, wydarzeniami rozrywkowymi, sportowymi lub kulturalnymi, jeżeli w umowie oznaczono dzień lub okres świadczenia usługi.
              </p>
              <p>
                <strong>2.</strong> Z uwagi na powyższe, Rezerwacje dotyczące wynajmu domków, kajaków oraz usług gastronomicznych na oznaczony termin nie podlegają 14-dniowemu prawu odstąpienia od umowy przewidzianemu dla standardowej sprzedaży towarów.
              </p>
              <p>
                <strong>3.</strong> Zasady anulowania takich Rezerwacji reguluje § 6 niniejszego Regulaminu.
              </p>
            </div>
          </div>

          {/* § 8 Reklamacje */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 8</span>
              Reklamacje
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> Klient ma prawo złożyć reklamację dotyczącą usług świadczonych przez Usługodawcę.
              </p>
              <div>
                <p><strong>2.</strong> Reklamację można złożyć:</p>
                <ul className="mt-1.5 space-y-1 pl-4 text-tawerna-sand">
                  <li>mailowo na adres: <a href="mailto:pttkswornegacie@gmail.com" className="text-tawerna-gold hover:underline font-bold">pttkswornegacie@gmail.com</a>,</li>
                  <li>telefonicznie pod numerem: <a href="tel:+48798550017" className="text-tawerna-gold hover:underline font-bold">798 550 017</a>,</li>
                </ul>
              </div>
              <p>
                <strong>3.</strong> Reklamacja powinna zawierać: imię i nazwisko Klienta, dane kontaktowe, opis przedmiotu reklamacji oraz oczekiwany sposób jej rozpatrzenia.
              </p>
              <p>
                <strong>4.</strong> Usługodawca ponosi odpowiedzialność wobec Konsumenta oraz Przedsiębiorcy na prawach Konsumenta za brak zgodności usługi z umową na zasadach określonych w ustawie z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. z 2023 r. poz. 2759 z późn. zm.).
              </p>
              <p className="font-semibold text-tawerna-gold">
                <strong>5.</strong> Usługodawca rozpatruje reklamację i udziela odpowiedzi w terminie 14 dni od dnia jej otrzymania.
              </p>
            </div>
          </div>

          {/* § 9 Odpowiedzialność */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 9</span>
              Odpowiedzialność
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> Klient ponosi odpowiedzialność za szkody wyrządzone w wynajmowanym domku, kajaku lub sprzęcie, powstałe z jego winy, w wysokości rzeczywiście poniesionej szkody.
              </p>
              <p>
                <strong>2.</strong> Usługodawca nie ponosi odpowiedzialności za rzeczy pozostawione przez Klienta na terenie obiektu.
              </p>
              <p>
                <strong>3.</strong> Usługodawca dokłada wszelkich starań, aby dane zawarte w Serwisie były aktualne i zgodne ze stanem faktycznym.
              </p>
            </div>
          </div>

          {/* § 10 Dane osobowe */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 10</span>
              Dane osobowe
            </h2>
            <p className="text-sm md:text-base text-tawerna-cream leading-relaxed">
              Zasady przetwarzania danych osobowych Klientów określa odrębny dokument – Polityka Prywatności, dostępna pod adresem:{' '}
              <a href="https://pttkswornegacie.pl/polityka-prywatnosci.html" className="text-tawerna-gold underline hover:text-white transition">
                https://pttkswornegacie.pl/polityka-prywatnosci.html
              </a>.
            </p>
          </div>

          {/* § 11 Postanowienia końcowe */}
          <div className="bg-[#150b07]/90 border border-tawerna-gold/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-display font-bold text-xl md:text-2xl text-tawerna-gold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tawerna-gold/15 border border-tawerna-gold/30 inline-flex items-center justify-center text-xs text-tawerna-gold font-mono font-bold">§ 11</span>
              Postanowienia końcowe
            </h2>
            <div className="space-y-3 text-sm md:text-base text-tawerna-cream leading-relaxed">
              <p>
                <strong>1.</strong> W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o prawach konsumenta.
              </p>
              <p>
                <strong>2.</strong> Ewentualne spory pomiędzy Usługodawcą a Klientem niebędącym Konsumentem rozstrzygane będą przez sąd właściwy dla siedziby Usługodawcy.
              </p>
              <p>
                <strong>3.</strong> Usługodawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie. Zmiany wchodzą w życie z dniem opublikowania nowej wersji Regulaminu w Serwisie.
              </p>
              <div className="mt-4 pt-4 border-t border-tawerna-gold/15 flex items-center justify-between text-xs text-tawerna-sand">
                <span>Status: Obowiązujący</span>
                <span className="font-mono text-tawerna-gold font-bold">Regulamin obowiązuje od dnia: 13.09.2026.</span>
              </div>
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
