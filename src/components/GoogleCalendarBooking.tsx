/**
 * GOOGLE CALENDAR API RESERVATION WIDGET - OVERNIGHT LODGING EDITION (MULTI-COTTAGE SYSTEM WITH FLATPICKR)
 * 
 * INSTRUCTIONS FOR GOOGLE CLOUD CONSOLE CONFIGURATION:
 * =========================================================================
 * 1. Go to Google Cloud Console (https://console.cloud.google.com).
 * 2. Enable "Google Calendar API" in the API Library.
 * 3. Go to "APIs & Services" > "OAuth consent screen":
 *    - Choose "External" (or Internal if G-Suite).
 *    - Add "https://www.googleapis.com/auth/calendar.events" to scopes.
 *    - Add your testing email to "Test users" (while in Testing status).
 * 4. Go to "APIs & Services" > "Credentials":
 *    - Create an "API Key" and copy it to the code below.
 *    - Create an "OAuth 2.0 Client ID" -> select "Web application":
 *      • Under "Authorized JavaScript origins", add:
 *        - http://localhost:3000
 *        - http://localhost
 *        - https://pttkswornegacie.github.io (and/or your custom GitHub Pages url e.g. https://<username>.github.io)
 *        - https://ais-dev-3eqxq6uelygxeuvhpeeykc-140455367719.europe-west1.run.app
 *      • Under "Authorized redirect URIs", you do not need any for GSI Client Token flow,
 *        but you can add your domain for completeness.
 * 5. Share your Google Calendar (the one with CALENDAR_ID):
 *    - Go to Google Calendar settings, find "Share with specific people", add the user/service email.
 *    - Or make it publicly viewable if you only read public free/busy slots,
 *      but for write operations, OAuth access token handles authorization.
 * =========================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Check, AlertCircle, Sparkles, Phone, Mail, FileText, User, RefreshCw, ArrowRight, Lock } from 'lucide-react';

// Google Calendar API Configs
const API_KEY = 'AIzaSyAkBPo1RwLm0Uo5BE7YitkQSU8FN2dy1Sw';
const CLIENT_ID = '14704527745-75qqdbll4tgc89nco3f2j4o8ehrjtiir.apps.googleusercontent.com'; // Replace with your client ID

export const DOMKI_CONFIG = {
  'domek-1': { name: 'Domek Dwuosobowy', calendarId: '3456c3102e164848b8c2bced2fe5e7e8af58e2d8ee0639e01a4de2969ac9cb22@group.calendar.google.com' },
  'domek-2': { name: 'Domek Trzyosobowy', calendarId: '4b40e3b43b8f637532c2e3b13452ba080ac4ddc7e46b7e090dd35bcd088602b7@group.calendar.google.com' },
  'domek-3': { name: 'Domek Trzyosobowy Premium', calendarId: '06e0dad49e31f1bcfb7eb83aa8df07cb71f35787747d99a56bb4c0e883c1986d@group.calendar.google.com' }
};

interface BookedRange {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  summary: string;
}

interface GoogleCalendarBookingProps {
  cottageKey: 'domek-1' | 'domek-2' | 'domek-3';
  pricePerDay: number;
}

// Helper to expand range into individual date strings (nights of stay)
const getDatesInRange = (startDateStr: string, endDateStr: string): string[] => {
  const dates: string[] = [];
  try {
    let current = new Date(startDateStr + 'T12:00:00');
    const end = new Date(endDateStr + 'T12:00:00');
    while (current < end) {
      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
      current.setDate(current.getDate() + 1);
    }
  } catch (e) {
    console.error('Error in getDatesInRange:', e);
  }
  return dates;
};

export default function GoogleCalendarBooking({ cottageKey, pricePerDay }: GoogleCalendarBookingProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referrerBlocked, setReferrerBlocked] = useState(false);
  const [blockedReferrerUrl, setBlockedReferrerUrl] = useState('');

  // DOM Refs for Flatpickr
  const flatpickrInputRef = useRef<HTMLInputElement>(null);
  const fpInstanceRef = useRef<any>(null);

  // Get cottage config
  const config = DOMKI_CONFIG[cottageKey];
  const cottageName = config?.name || 'Domek';
  
  // Use a fallback calendar ID if user has placeholder so they can see it working
  const isPlaceholder = !config?.calendarId || config.calendarId.startsWith('TUTAJ_ID_');
  const calendarId = isPlaceholder ? 'pttkswornegacie@gmail.com' : config.calendarId;

  // Form State
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);

  // Client Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // App State
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fetch events for availability checking on mount or when calendarId changes
  useEffect(() => {
    fetchBookedEvents();
  }, [calendarId]);

  // Initialize and update Flatpickr
  useEffect(() => {
    let fpInstance: any = null;

    const initFp = () => {
      if (!flatpickrInputRef.current || !(window as any).flatpickr) {
        return;
      }

      // Destroy previous instance
      if (fpInstanceRef.current) {
        fpInstanceRef.current.destroy();
      }

      // Gather all individual dates to block
      const disabledDates: string[] = [];
      bookedRanges.forEach(range => {
        const dates = getDatesInRange(range.start, range.end);
        disabledDates.push(...dates);
      });

      fpInstance = (window as any).flatpickr(flatpickrInputRef.current, {
        mode: 'range',
        minDate: 'today',
        locale: 'pl',
        disable: disabledDates,
        dateFormat: 'Y-m-d',
        theme: 'dark',
        onChange: (selectedDates: Date[]) => {
          if (selectedDates.length === 2) {
            const start = selectedDates[0];
            const end = selectedDates[1];
            
            const formatToDateStr = (date: Date) => {
              const yyyy = date.getFullYear();
              const mm = String(date.getMonth() + 1).padStart(2, '0');
              const dd = String(date.getDate()).padStart(2, '0');
              return `${yyyy}-${mm}-${dd}`;
            };

            setCheckInDate(formatToDateStr(start));
            setCheckOutDate(formatToDateStr(end));
          } else {
            setCheckInDate('');
            setCheckOutDate('');
          }
        }
      });

      fpInstanceRef.current = fpInstance;
    };

    // Polling because Flatpickr is loaded asynchronously in <head>
    const checkInterval = setInterval(() => {
      if ((window as any).flatpickr) {
        initFp();
        clearInterval(checkInterval);
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      if (fpInstance) {
        fpInstance.destroy();
      }
    };
  }, [bookedRanges]);

  const fetchBookedEvents = async () => {
    setLoading(true);
    setError(null);
    setReferrerBlocked(false);

    try {
      const today = new Date();
      today.setHours(0,0,0,0);
      
      const futureLimit = new Date();
      futureLimit.setDate(today.getDate() + 180); // 6 months in advance

      const timeMin = today.toISOString();
      const timeMax = futureLimit.toISOString();

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&maxResults=250`;

      const response = await fetch(url);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      const events = data.items || [];
      const ranges: BookedRange[] = events.map((event: any) => {
        let startStr = '';
        let endStr = '';

        if (event.start?.date) {
          startStr = event.start.date;
          endStr = event.end.date;
        } else if (event.start?.dateTime) {
          startStr = event.start.dateTime.split('T')[0];
          endStr = event.end.dateTime.split('T')[0];
        }

        return {
          start: startStr,
          end: endStr,
          summary: event.summary || 'Zajęty termin'
        };
      }).filter((r: any) => r.start && r.end);

      setBookedRanges(ranges);
    } catch (err: any) {
      console.error('Fetch Events Error:', err);
      const msg = err.message || '';
      if (msg.includes('referer') || msg.includes('blocked') || msg.includes('API key') || msg.includes('restricted')) {
        setReferrerBlocked(true);
        setBlockedReferrerUrl(window.location.origin);
        setError(`Błąd API Google: Twoja aplikacja próbuje wysłać zapytanie z adresu ${window.location.origin}, który jest zablokowany przez ograniczenia klucza API w Google Cloud Console.`);
      } else {
        setError('Informacja: Nie udało się automatycznie sprawdzić zajętości kalendarza dla tego domku. Możesz nadal wysłać zgłoszenie rezerwacji ręcznie.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if custom range overlaps with existing bookings
  const getOverlapConflict = (): BookedRange | null => {
    if (!checkInDate || !checkOutDate) return null;
    for (const range of bookedRanges) {
      // standard overlap check: range.start < checkOutDate AND checkInDate < range.end
      if (range.start < checkOutDate && checkInDate < range.end) {
        return range;
      }
    }
    return null;
  };

  const conflict = getOverlapConflict();
  const countNights = (): number => {
    if (!checkInDate || !checkOutDate) return 0;
    try {
      const d1 = new Date(checkInDate + 'T12:00:00');
      const d2 = new Date(checkOutDate + 'T12:00:00');
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  };

  const nights = countNights();
  const totalPrice = nights * pricePerDay;
  const isDatesSelected = !!checkInDate && !!checkOutDate && nights > 0 && !conflict;

  // Main Booking Process
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (conflict || !fullName || !email || !phone || !isDatesSelected) return;

    setLoading(true);
    setError(null);

    try {
      if (!(window as any).google?.accounts?.oauth2) {
        throw new Error('Google Identity Services client is not loaded yet. Prosimy spróbować ponownie za chwilę.');
      }

      // Use Google Identity Services to get access token dynamically
      const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar.events',
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error !== undefined) {
            setLoading(false);
            setError(`Logowanie nie powiodło się: ${tokenResponse.error}`);
            return;
          }

          // Save the all-day event using the obtained token via direct REST fetch API
          await createEvent(tokenResponse.access_token);
        },
      });

      // Request token (triggers Google Auth popup for user)
      tokenClient.requestAccessToken({ prompt: 'consent' });

    } catch (err: any) {
      console.error('OAuth tokenClient error:', err);
      setError(err?.message || 'Błąd uwierzytelniania Google. Upewnij się, że podany CLIENT_ID jest poprawny.');
      setLoading(false);
    }
  };

  const createEvent = async (token: string) => {
    try {
      // All-day event starts on checkInDate and ends on checkOutDate
      const event = {
        summary: `${cottageName} - Rezerwacja: ${fullName}`,
        description: `Zgłoszenie rezerwacji noclegu / pobytu hotelowego:\n\n🏠 Wybrany domek: ${cottageName}\n👤 Gość: ${fullName}\n📞 Telefon: ${phone}\n✉️ Email: ${email}\n🏨 Długość pobytu: ${nights} nocy\n📅 Przyjazd: ${checkInDate}\n📅 Odjazd: ${checkOutDate}\n💰 Koszt pobytu: ${totalPrice} zł\n\n📝 Uwagi / Dodatkowe pytania: ${notes || 'Brak'}`,
        start: {
          date: checkInDate,
        },
        end: {
          date: checkOutDate,
        },
        attendees: [{ email: email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24h
            { method: 'popup', minutes: 60 },      // 1h
          ],
        },
      };

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Błąd serwera Google (status ${response.status})`);
      }

      setBookingSuccess(true);
      setLoading(false);
    } catch (err: any) {
      console.error('Insert Event Error:', err);
      setError(`Nie udało się zapisać rezerwacji: ${err.message || 'Brak uprawnień zapisu do wybranego kalendarza'}`);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setCheckInDate('');
    setCheckOutDate('');
    setBookingSuccess(false);

    // Reset flatpickr input visually
    if (fpInstanceRef.current) {
      fpInstanceRef.current.clear();
    }

    fetchBookedEvents();
  };

  return (
    <div className="bg-[#120a06]/95 border border-tawerna-gold/25 rounded-2xl p-5 shadow-lg relative overflow-hidden text-left w-full h-full">
      {/* Custom styles to colorize Flatpickr elements gold and match the Tavern vibe */}
      <style>{`
        .flatpickr-calendar {
          background: #190d07 !important;
          border: 1px solid rgba(197, 168, 128, 0.3) !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.8) !important;
          font-family: 'Inter', sans-serif !important;
        }
        .flatpickr-calendar .flatpickr-months .flatpickr-month {
          background: #190d07 !important;
          color: #f4ece1 !important;
        }
        .flatpickr-calendar .flatpickr-weekday {
          color: #c5a880 !important;
          font-weight: bold !important;
        }
        .flatpickr-day {
          color: #f4ece1 !important;
        }
        .flatpickr-day.today {
          border-color: rgba(197, 168, 128, 0.4) !important;
        }
        .flatpickr-day.selected, 
        .flatpickr-day.startRange, 
        .flatpickr-day.endRange,
        .flatpickr-day.selected.inRange, 
        .flatpickr-day.startRange.inRange, 
        .flatpickr-day.endRange.inRange, 
        .flatpickr-day.selected:focus, 
        .flatpickr-day.startRange:focus, 
        .flatpickr-day.endRange:focus, 
        .flatpickr-day.selected:hover, 
        .flatpickr-day.startRange:hover, 
        .flatpickr-day.endRange:hover {
          background: #c5a880 !important;
          border-color: #c5a880 !important;
          color: #120a06 !important;
          font-weight: bold !important;
        }
        .flatpickr-day.inRange {
          background: rgba(197, 168, 128, 0.18) !important;
          border-color: transparent !important;
          box-shadow: -5px 0 0 rgba(197, 168, 128, 0.18), 5px 0 0 rgba(197, 168, 128, 0.18) !important;
        }
        .flatpickr-day.disabled, .flatpickr-day.disabled:hover {
          color: rgba(244, 236, 225, 0.12) !important;
          text-decoration: line-through !important;
          background: transparent !important;
        }
        .flatpickr-calendar .flatpickr-arrow {
          border-bottom-color: #190d07 !important;
          border-top-color: #190d07 !important;
        }
        .flatpickr-current-month .flatpickr-monthDropdown-months {
          background: #190d07 !important;
          color: #f4ece1 !important;
        }
        .flatpickr-calendar .numInputWrapper span.arrowUp:after {
          border-bottom-color: #c5a880 !important;
        }
        .flatpickr-calendar .numInputWrapper span.arrowDown:after {
          border-top-color: #c5a880 !important;
        }
      `}</style>

      <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-tawerna-gold/15">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-tawerna-gold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-tawerna-gold animate-pulse" />
            REZERWACJA ONLINE
          </span>
          <button
            type="button"
            onClick={fetchBookedEvents}
            className="flex items-center gap-1 bg-tawerna-wood/45 hover:bg-tawerna-gold/15 text-tawerna-sand hover:text-white px-2 py-1 rounded-md text-[10px] font-mono border border-tawerna-gold/10 transition duration-200"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-tawerna-gold' : ''}`} />
            Odśwież
          </button>
        </div>
        <h4 className="font-display font-black text-lg text-white leading-tight">
          Zarezerwuj {cottageName}
        </h4>
        {isPlaceholder && (
          <span className="text-[9px] font-mono text-amber-500/80 italic leading-tight">
            * Tryb demonstracyjny (kalendarz podglądowy PTTK)
          </span>
        )}
      </div>

      {error && (
        <div className="bg-amber-950/40 border border-amber-500/25 text-tawerna-sand text-[11px] rounded-lg p-3.5 mb-4 flex flex-col gap-2 leading-relaxed">
          <div className="flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 text-tawerna-gold shrink-0 mt-0.5" />
            <div className="font-bold text-white">Problem z połączeniem z Kalendarzem Google</div>
          </div>
          <p className="text-[11px]">{error}</p>
          {referrerBlocked && (
            <div className="mt-2 bg-[#1c0f0a] border border-tawerna-gold/20 rounded-md p-3 text-[10px] space-y-2 text-tawerna-sand/90">
              <p className="font-bold text-tawerna-gold uppercase tracking-wider text-[9px] font-mono">Jak to naprawić w Google Cloud Console:</p>
              <ol className="list-decimal pl-4 space-y-1.5 font-sans">
                <li>Wejdź na stronę <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-tawerna-gold underline hover:text-white">Google Cloud Console</a>.</li>
                <li>Przejdź do zakładki <strong>Interfejsy API i usługi (APIs & Services)</strong> &gt; <strong>Dane uwierzytelniające (Credentials)</strong>.</li>
                <li>W sekcji <strong>Klucze API (API Keys)</strong> edytuj swój klucz (kliknij jego nazwę lub ikonę ołówka).</li>
                <li>Przewiń do sekcji <strong>Ograniczenia witryn odsyłających (HTTP)</strong> i kliknij <strong>DODAJ (ADD)</strong>, wprowadzając te adresy URL:
                  <div className="mt-1 bg-black/50 p-2 rounded border border-tawerna-gold/10 select-all font-mono text-[9px] text-white">
                    {blockedReferrerUrl}/*
                  </div>
                  <div className="mt-1 bg-black/50 p-2 rounded border border-tawerna-gold/10 select-all font-mono text-[9px] text-white">
                    https://ais-pre-3eqxq6uelygxeuvhpeeykc-140455367719.europe-west1.run.app/*
                  </div>
                </li>
                <li>Kliknij przycisk <strong>Zapisz (Save)</strong> na samym dole strony.</li>
                <li>Zmiany propagują się w systemie Google przez 2-5 minut. Następnie kliknij przycisk <strong>Odśwież</strong> w prawym górnym rogu widgetu.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {bookingSuccess ? (
        <div className="bg-emerald-950/40 border border-emerald-500/35 rounded-xl p-5 text-center flex flex-col items-center gap-2.5 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-6 h-6" />
          </div>
          <h5 className="font-display font-bold text-base text-white">Zgłoszenie wysłane!</h5>
          <p className="text-xs text-tawerna-sand leading-relaxed">
            Pobyt od <strong>{checkInDate}</strong> do <strong>{checkOutDate}</strong> ({nights} {nights === 1 ? 'doba' : 'doby'}) zarejestrowany.
          </p>
          <div className="bg-tawerna-dark/50 p-3 rounded-lg border border-tawerna-gold/10 text-left w-full text-[10px] font-mono text-tawerna-sand space-y-0.5">
            <p><span className="text-tawerna-gold">GOŚĆ:</span> {fullName}</p>
            <p><span className="text-tawerna-gold">TEL:</span> {phone}</p>
            <p><span className="text-tawerna-gold">KOSZT:</span> {totalPrice} zł</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="w-full mt-2 py-2 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold rounded-lg text-xs transition"
          >
            Rezerwuj inny termin
          </button>
        </div>
      ) : (
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          
          {/* Visual Interactive Date Range Input (Flatpickr) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-tawerna-cream uppercase tracking-wider">
              Termin pobytu (Przyjazd - Odjazd)
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tawerna-gold z-10" />
              <input
                ref={flatpickrInputRef}
                type="text"
                id={`calendar-${cottageKey}`}
                placeholder="Kliknij, aby wybrać termin..."
                className="w-full bg-tawerna-dark border border-tawerna-gold/35 focus:border-tawerna-gold rounded-lg pl-9 pr-3 py-2.5 text-xs text-white font-mono placeholder-white/50 cursor-pointer focus:outline-none focus:ring-1 focus:ring-tawerna-gold transition duration-200"
                readOnly
                required
              />
            </div>
          </div>

          {/* Selected stay summary */}
          {isDatesSelected && (
            <div className="bg-tawerna-gold/15 border border-tawerna-gold/30 p-3 rounded-lg flex justify-between items-center text-xs animate-fadeIn">
              <div className="text-left">
                <p className="text-white font-bold">Podsumowanie pobytu:</p>
                <p className="text-[11px] text-tawerna-cream mt-0.5">
                  Przyjazd: <strong className="text-white">{checkInDate}</strong>
                </p>
                <p className="text-[11px] text-tawerna-cream">
                  Odjazd: <strong className="text-white">{checkOutDate}</strong> ({nights} {nights === 1 ? 'noc' : 'nocy'})
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-tawerna-sand">Cena łączna:</p>
                <strong className="text-tawerna-gold text-sm font-mono font-black">{totalPrice} zł</strong>
              </div>
            </div>
          )}

          {/* Guest Information form - Enabled only when dates are selected */}
          <div className={`space-y-3.5 transition-all duration-300 ${isDatesSelected ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none'}`}>
            <div className="flex items-center gap-1.5 pb-1 border-b border-tawerna-gold/20">
              <span className="text-[10px] font-mono font-bold text-tawerna-gold uppercase tracking-wider">
                Dane osobowe rezerwującego
              </span>
              {!isDatesSelected && <Lock className="w-3.5 h-3.5 text-tawerna-sand/50" />}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-tawerna-cream mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-tawerna-gold" />
                Imię i nazwisko *
              </label>
              <input
                type="text"
                required={isDatesSelected}
                disabled={!isDatesSelected}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isDatesSelected ? "np. Jan Kowalski" : "Zablokowane"}
                className="w-full bg-tawerna-dark border border-tawerna-gold/30 focus:border-tawerna-gold focus:outline-none rounded-lg p-2.5 text-xs text-white placeholder-white/45 transition duration-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-tawerna-cream mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-tawerna-gold" />
                  Telefon *
                </label>
                <input
                  type="tel"
                  required={isDatesSelected}
                  disabled={!isDatesSelected}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isDatesSelected ? "np. 798550017" : "Zablokowane"}
                  className="w-full bg-tawerna-dark border border-tawerna-gold/30 focus:border-tawerna-gold focus:outline-none rounded-lg p-2.5 text-xs text-white font-mono placeholder-white/45 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-tawerna-cream mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-tawerna-gold" />
                  E-mail *
                </label>
                <input
                  type="email"
                  required={isDatesSelected}
                  disabled={!isDatesSelected}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isDatesSelected ? "np. jan@gmail.com" : "Zablokowane"}
                  className="w-full bg-tawerna-dark border border-tawerna-gold/30 focus:border-tawerna-gold focus:outline-none rounded-lg p-2.5 text-xs text-white placeholder-white/45 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-tawerna-cream mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-tawerna-gold" />
                Uwagi do rezerwacji (opcjonalnie)
              </label>
              <textarea
                rows={2}
                disabled={!isDatesSelected}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isDatesSelected ? "np. liczba gości, dzieci, specjalne życzenia..." : "Zablokowane"}
                className="w-full bg-tawerna-dark border border-tawerna-gold/30 focus:border-tawerna-gold focus:outline-none rounded-lg p-2.5 text-xs text-white resize-none placeholder-white/45 transition duration-200"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !isDatesSelected || !fullName || !phone || !email}
            className={`w-full py-3 mt-2 text-center font-sans font-bold text-xs rounded-lg transition duration-200 flex items-center justify-center gap-1.5 ${
              !isDatesSelected || !fullName || !phone || !email || loading
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/30'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg cursor-pointer'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                Trwa zapisywanie...
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                Zarezerwuj {cottageName}
              </>
            )}
          </button>

        </form>
      )}
    </div>
  );
}
