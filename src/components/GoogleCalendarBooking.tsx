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

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Calendar as CalendarIcon, Check, AlertCircle, Sparkles, Phone, Mail, FileText, User, RefreshCw, Lock, CreditCard, ShieldCheck } from 'lucide-react';

// Google Calendar API Configs
const API_KEY = 'AIzaSyAkBPo1RwLm0Uo5BE7YitkQSU8FN2dy1Sw';

// Vercel Payment Backend Endpoint with quote trimming
const RAW_URL = 
  (import.meta as any).env?.VITE_VERCEL_PAYMENT_URL || 
  (import.meta as any).env?.VITE_PAYMENT_API_URL || 
  '/api/create-payment';

const VERCEL_PAYMENT_URL = RAW_URL.replace(/^["']|["']$/g, '').trim();

export const DOMKI_CONFIG = {
  'domek-1': { id: '1', name: 'Domek Dwuosobowy', calendarId: '3456c3102e164848b8c2bced2fe5e7e8af58e2d8ee0639e01a4de2969ac9cb22@group.calendar.google.com' },
  'domek-2': { id: '2', name: 'Domek Trzyosobowy', calendarId: '4b40e3b43b8f637532c2e3b13452ba080ac4ddc7e46b7e090dd35bcd088602b7@group.calendar.google.com' },
  'domek-3': { id: '3', name: 'Domek Trzyosobowy Premium', calendarId: '06e0dad49e31f1bcfb7eb83aa8df07cb71f35787747d99a56bb4c0e883c1986d@group.calendar.google.com' }
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

// Helper to format Date object into YYYY-MM-DD local string
const formatDateStr = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Helper to expand range into individual date strings (nights of stay)
const getDatesInRange = (startDateStr: string, endDateStr: string): string[] => {
  const dates: string[] = [];
  try {
    if (startDateStr === endDateStr) {
      dates.push(startDateStr);
      return dates;
    }
    const current = new Date(startDateStr + 'T12:00:00');
    const end = new Date(endDateStr + 'T12:00:00');
    while (current < end) {
      dates.push(formatDateStr(current));
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
  const [rangeError, setRangeError] = useState<string | null>(null);
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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Calculate all blocked dates into a Fast-lookup Set
  const blockedDatesSet = useMemo(() => {
    const set = new Set<string>();
    bookedRanges.forEach(range => {
      const dates = getDatesInRange(range.start, range.end);
      dates.forEach(d => set.add(d));
    });
    return set;
  }, [bookedRanges]);

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
        try {
          fpInstanceRef.current.destroy();
        } catch {
          // ignore
        }
      }

      // Convert blocked dates to array for Flatpickr
      const disabledDates = Array.from(blockedDatesSet);

      fpInstance = (window as any).flatpickr(flatpickrInputRef.current, {
        mode: 'range',
        minDate: 'today',
        locale: 'pl',
        disable: disabledDates,
        dateFormat: 'Y-m-d',
        theme: 'dark',
        onDayCreate: (_dObj: any, _dStr: any, _fp: any, dayElem: HTMLElement & { dateObj: Date }) => {
          if (!dayElem?.dateObj) return;
          const dateStr = formatDateStr(dayElem.dateObj);
          
          if (blockedDatesSet.has(dateStr)) {
            dayElem.classList.add('booked-day', 'flatpickr-disabled');
            dayElem.setAttribute('title', 'Termin zajęty / Rezerwacja');
            dayElem.setAttribute('aria-label', `${dateStr} - Termin zajęty`);
            dayElem.style.pointerEvents = 'none';
          }
        },
        onChange: (selectedDates: Date[], _dateStr: string, instance: any) => {
          if (selectedDates.length === 2) {
            const start = selectedDates[0];
            const end = selectedDates[1];

            const startStr = formatDateStr(start);
            const endStr = formatDateStr(end);

            // Validation: Check if ANY day within [start, end) is booked
            let hasBlockedDayInside = false;
            const currentCheck = new Date(start.getTime());
            
            while (currentCheck < end) {
              const currentStr = formatDateStr(currentCheck);
              if (blockedDatesSet.has(currentStr)) {
                hasBlockedDayInside = true;
                break;
              }
              currentCheck.setDate(currentCheck.getDate() + 1);
            }

            if (hasBlockedDayInside) {
              setRangeError('Wybrany zakres zawiera już zarezerwowane dni. Wybierz inny termin.');
              setCheckInDate('');
              setCheckOutDate('');
              if (instance) {
                instance.clear();
              }
              return;
            }

            // Valid range selection
            setRangeError(null);
            setCheckInDate(startStr);
            setCheckOutDate(endStr);
          } else if (selectedDates.length === 1) {
            setRangeError(null);
            setCheckInDate('');
            setCheckOutDate('');
          } else {
            setRangeError(null);
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
        try {
          fpInstance.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [blockedDatesSet]);

  const fetchBookedEvents = async () => {
    setLoading(true);
    setError(null);
    setRangeError(null);
    setReferrerBlocked(false);

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const futureLimit = new Date();
      futureLimit.setDate(today.getDate() + 240); // 8 months in advance

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
        setError('Informacja: Nie udało się automatycznie pobrać terminów z Kalendarza Google. Możesz nadal ręcznie wybrać termin i wysłać zapytanie.');
      }
    } finally {
      setLoading(false);
    }
  };

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
  const isPhoneValid = phone.replace(/\D/g, '').length >= 9;
  const isDatesSelected = !!checkInDate && !!checkOutDate && nights > 0 && !rangeError;

  // Main Booking & Payment Process (Vercel Backend Integration)
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rangeError || !fullName || !email || !isPhoneValid || !isDatesSelected || isProcessingPayment) return;

    setIsProcessingPayment(true);
    setError(null);
    setPaymentError(null);

    try {
      // 1. Calculate amount in grosze (e.g. 100 PLN = 10000 groszy)
      const amountInGrosze = Math.round(totalPrice * 100);

      // 2. Identify calendar ID ("1", "2" or "3") based on selected cottage/service
      const calendarNumericId = DOMKI_CONFIG[cottageKey]?.id || (cottageKey === 'domek-2' ? '2' : cottageKey === 'domek-3' ? '3' : '1');

      // 3. Prepare JSON payload according to backend specification
      const requestPayload = {
        bookingData: {
          calendarId: calendarNumericId,
          title: `${cottageName} (${checkInDate} do ${checkOutDate})`,
          date: checkInDate,
          time: '14:00',
          clientName: fullName.trim(),
          clientEmail: email.trim(),
          clientPhone: phone.trim()
        },
        amount: amountInGrosze
      };

      console.log('Inicjalizacja płatności Vercel...', VERCEL_PAYMENT_URL, requestPayload);

      // 4. Send POST request to Vercel backend (/api/create-payment)
      const response = await fetch(VERCEL_PAYMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData?.error || errData?.message || `Błąd serwera płatności (status: ${response.status})`;
        throw new Error(errMsg);
      }

      const data = await response.json();

      // 5. Retrieve paymentUrl and redirect user immediately
      const paymentUrl = data?.paymentUrl || data?.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        throw new Error('Odpowiedź serwera nie zawierała adresu płatności (paymentUrl).');
      }
    } catch (err: any) {
      console.error('Błąd inicjalizacji płatności Vercel:', err);
      const errMsg = err?.message || 'Nie udało się połączyć z systemem płatności. Upewnij się, że backend na Vercel jest aktywny i spróbuj ponownie.';
      setPaymentError(errMsg);
      setError(errMsg);
      alert(`Wystąpił błąd podczas przygotowywania płatności:\n\n${errMsg}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setCheckInDate('');
    setCheckOutDate('');
    setRangeError(null);
    setPaymentError(null);
    setBookingSuccess(false);

    // Reset flatpickr input visually
    if (fpInstanceRef.current) {
      fpInstanceRef.current.clear();
    }

    fetchBookedEvents();
  };

  return (
    <div className="bg-[#120a06]/95 border border-tawerna-gold/25 rounded-2xl p-5 shadow-lg relative overflow-hidden text-left w-full h-full">
      {/* Visual styling for Flatpickr */}
      <style>{`
        .flatpickr-calendar {
          background: #190d07 !important;
          border: 1px solid rgba(197, 168, 128, 0.35) !important;
          box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.85) !important;
          font-family: 'Inter', sans-serif !important;
          border-radius: 12px !important;
          padding: 6px !important;
        }
        .flatpickr-calendar .flatpickr-months .flatpickr-month {
          background: #190d07 !important;
          color: #f4ece1 !important;
        }
        .flatpickr-calendar .flatpickr-weekday {
          color: #c5a880 !important;
          font-weight: bold !important;
          font-size: 11px !important;
        }

        /* Available Dates */
        .flatpickr-day {
          color: #ffffff !important;
          font-weight: 500 !important;
          border-radius: 6px !important;
          transition: all 0.15s ease !important;
        }
        .flatpickr-day:hover:not(.booked-day):not(.flatpickr-disabled) {
          background: rgba(34, 197, 94, 0.22) !important;
          border-color: #22c55e !important;
          color: #ffffff !important;
        }
        .flatpickr-day.today {
          border-color: #cca462 !important;
          font-weight: 700 !important;
        }

        /* Booked Dates */
        .flatpickr-day.booked-day,
        .flatpickr-day.booked-day:hover {
          background-color: #450a0a !important;
          border: 1px solid #ef4444 !important;
          color: #fca5a5 !important;
          text-decoration: line-through !important;
          font-weight: 700 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
          opacity: 0.9 !important;
          position: relative !important;
        }
        .flatpickr-day.booked-day::after {
          content: '' !important;
          position: absolute !important;
          bottom: 2px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 4px !important;
          height: 4px !important;
          border-radius: 50% !important;
          background-color: #ef4444 !important;
          box-shadow: 0 0 5px #ef4444 !important;
        }

        /* Selected Dates */
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
          background: #2563eb !important;
          border-color: #3b82f6 !important;
          color: #ffffff !important;
          font-weight: bold !important;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.6) !important;
        }
        .flatpickr-day.inRange {
          background: rgba(37, 99, 235, 0.28) !important;
          border-color: rgba(59, 130, 246, 0.35) !important;
          color: #ffffff !important;
          box-shadow: -5px 0 0 rgba(37, 99, 235, 0.28), 5px 0 0 rgba(37, 99, 235, 0.28) !important;
        }

        /* Generic past days */
        .flatpickr-day.flatpickr-disabled:not(.booked-day), 
        .flatpickr-day.flatpickr-disabled:not(.booked-day):hover {
          color: rgba(244, 236, 225, 0.2) !important;
          background: transparent !important;
          border-color: transparent !important;
          cursor: not-allowed !important;
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
            disabled={loading}
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

      {/* Loading availability banner */}
      {loading && (
        <div className="bg-tawerna-wood/40 border border-tawerna-gold/25 text-tawerna-cream text-xs rounded-lg p-2.5 mb-3.5 flex items-center gap-2 animate-pulse">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-tawerna-gold shrink-0" />
          <span className="font-mono text-[11px]">Ładowanie dostępności kalendarza Google...</span>
        </div>
      )}

      {/* Range Selection Validation Error Banner */}
      {rangeError && (
        <div className="bg-red-950/80 border border-red-500/60 text-red-200 text-xs rounded-lg p-3 mb-3.5 flex items-start gap-2 shadow-lg animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-100">Błędny zakres dat</p>
            <p className="text-[11px] leading-relaxed mt-0.5">{rangeError}</p>
          </div>
        </div>
      )}

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
          <h5 className="font-display font-bold text-base text-white">Rezerwacja potwierdzona!</h5>
          <p className="text-xs text-tawerna-sand leading-relaxed">
            Pobyt od <strong>{checkInDate}</strong> do <strong>{checkOutDate}</strong> ({nights} {nights === 1 ? 'doba' : 'doby'}) został pomyślnie zarezerwowany.
          </p>
          <div className="flex items-center gap-2 p-2 bg-emerald-900/40 border border-emerald-400/30 rounded-lg text-xs text-emerald-200 w-full text-left">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] leading-tight">
              Potwierdzenie ze szczegółami wysłaliśmy na adres: <strong>{email}</strong>
            </span>
          </div>
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
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          
          {/* Visual Interactive Date Range Input (Flatpickr) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-tawerna-cream uppercase tracking-wider">
              Termin pobytu (Przyjazd - Odjazd)
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tawerna-gold z-10 pointer-events-none" />
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

          {/* Aesthetic Calendar Legend */}
          <div className="bg-tawerna-dark/70 border border-tawerna-gold/20 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px]">
            <div className="flex items-center gap-1.5" title="Dni dostępne do wyboru">
              <span className="w-3 h-3 rounded-full border border-emerald-400 bg-emerald-950/70 inline-flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              </span>
              <span className="text-emerald-300 font-medium">Wolny termin</span>
            </div>

            <div className="flex items-center gap-1.5" title="Dni zablokowane w Kalendarzu Google">
              <span className="w-3 h-3 rounded bg-red-950 border border-red-500 inline-flex items-center justify-center text-[8px] text-red-300 font-bold line-through">
                ✕
              </span>
              <span className="text-red-300 font-medium">Termin zajęty</span>
            </div>

            <div className="flex items-center gap-1.5" title="Twój wybrany przedział czasu">
              <span className="w-3 h-3 rounded bg-blue-600 border border-blue-400 shadow-[0_0_5px_rgba(59,130,246,0.6)]"></span>
              <span className="text-blue-300 font-medium">Twój zakres (Pobyt)</span>
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

          {/* Guest Information form */}
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
                disabled={!isDatesSelected || isProcessingPayment}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isDatesSelected ? "np. Jan Kowalski" : "Wybierz najpierw termin"}
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
                  minLength={9}
                  disabled={!isDatesSelected || isProcessingPayment}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isDatesSelected ? "np. 798550017" : "Wybierz termin"}
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
                  disabled={!isDatesSelected || isProcessingPayment}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isDatesSelected ? "np. jan@gmail.com" : "Wybierz termin"}
                  className="w-full bg-tawerna-dark border border-tawerna-gold/30 focus:border-tawerna-gold focus:outline-none rounded-lg p-2.5 text-xs text-white placeholder-white/45 transition duration-200"
                />
                <span className="text-[10px] text-tawerna-sand/75 block mt-1">
                  Na ten adres wyślemy potwierdzenie rezerwacji
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-tawerna-cream mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-tawerna-gold" />
                Uwagi do rezerwacji (opcjonalnie)
              </label>
              <textarea
                rows={2}
                disabled={!isDatesSelected || isProcessingPayment}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isDatesSelected ? "np. liczba gości, dzieci, specjalne życzenia..." : "Wybierz najpierw termin"}
                className="w-full bg-tawerna-dark border border-tawerna-gold/30 focus:border-tawerna-gold focus:outline-none rounded-lg p-2.5 text-xs text-white resize-none placeholder-white/45 transition duration-200"
              />
            </div>
          </div>

          {/* Email confirmation info banner */}
          <div className="flex items-start gap-2 p-2.5 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-emerald-200">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-snug text-emerald-200/90 text-left">
              <strong className="text-emerald-300">Potwierdzenie e-mail:</strong> Po opłaceniu rezerwacji natychmiast otrzymasz wiadomość e-mail z potwierdzeniem i szczegółami pobytu.
            </p>
          </div>

          {/* Payment Error Feedback Alert */}
          {paymentError && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-200 flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-red-300">Błąd połączenia z płatnością</p>
                <p className="text-[11px] text-red-200/90 leading-tight mt-0.5">{paymentError}</p>
              </div>
            </div>
          )}

          {/* Submit & Pay button */}
          <div className="space-y-2 pt-1">
            <button
              type="submit"
              disabled={isProcessingPayment || !isDatesSelected || !fullName.trim() || !isPhoneValid || !email.trim()}
              className={`w-full py-3.5 text-center font-sans font-bold text-xs rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg ${
                !isDatesSelected || !fullName.trim() || !isPhoneValid || !email.trim() || isProcessingPayment
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/30'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white cursor-pointer active:scale-[0.99] border border-emerald-400/40 shadow-emerald-950/50'
              }`}
            >
              {isProcessingPayment ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Przetwarzanie płatności i przekierowanie...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>Zarezerwuj i zapłać online ({totalPrice > 0 ? `${totalPrice} zł` : 'Wybierz termin'})</span>
                </>
              )}
            </button>

            {/* Payment security & methods badges */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 px-1 text-[10px] text-tawerna-sand/80">
              <div className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Bezpieczna płatność online</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-tawerna-cream">
                <span className="px-1.5 py-0.5 bg-tawerna-dark rounded border border-tawerna-gold/20">BLIK</span>
                <span className="px-1.5 py-0.5 bg-tawerna-dark rounded border border-tawerna-gold/20">imoje</span>
                <span className="px-1.5 py-0.5 bg-tawerna-dark rounded border border-tawerna-gold/20">Karta / Przelew</span>
              </div>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}