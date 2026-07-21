import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, Phone } from 'lucide-react';

interface MiniCalendarProps {
  cottageName: string;
  bookedDays: number[]; // pre-booked days in August 2026
  pricePerDay: number;
  onSelectRange: (start: number | null, end: number | null, month: 'July' | 'August') => void;
}

export default function MiniCalendar({ cottageName, bookedDays, pricePerDay, onSelectRange }: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<'July' | 'August'>('August');
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Month configurations for 2026
  // July 2026 starts on Wednesday (3) - 31 days
  // August 2026 starts on Saturday (6) - 31 days
  const monthData = {
    July: {
      name: 'Lipiec 2026',
      days: 31,
      startOffset: 2, // Wednesday is index 2 (0-indexed: Mon=0, Tue=1, Wed=2...)
      booked: [1, 2, 8, 9, 15, 16, 21, 22], // Some pre-booked days
    },
    August: {
      name: 'Sierpień 2026',
      days: 31,
      startOffset: 5, // Saturday is index 5
      booked: bookedDays,
    },
  };

  const activeMonth = monthData[currentMonth];

  const handleDateClick = (day: number) => {
    // If day is booked, do nothing
    if (activeMonth.booked.includes(day)) return;

    if (startDate === null || (startDate !== null && endDate !== null)) {
      setStartDate(day);
      setEndDate(null);
      onSelectRange(day, null, currentMonth);
    } else if (day > startDate) {
      setEndDate(day);
      onSelectRange(startDate, day, currentMonth);
    } else {
      // If clicked day is before start date, reset start date to this day
      setStartDate(day);
      setEndDate(null);
      onSelectRange(day, null, currentMonth);
    }
  };

  const handleMonthToggle = (month: 'July' | 'August') => {
    setCurrentMonth(month);
    setStartDate(null);
    setEndDate(null);
    onSelectRange(null, null, month);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setBookingSuccess(true);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setPhoneNumber('');
    setShowBookingForm(false);
    setBookingSuccess(false);
    onSelectRange(null, null, currentMonth);
  };

  // Helper to determine day styling
  const getDayClass = (day: number) => {
    const isBooked = activeMonth.booked.includes(day);
    if (isBooked) {
      return 'bg-neutral-800 text-neutral-500 cursor-not-allowed line-through';
    }

    const isStart = startDate === day;
    const isEnd = endDate === day;
    const isBetween = startDate !== null && endDate !== null && day > startDate && day < endDate;

    if (isStart || isEnd) {
      return 'bg-tawerna-gold text-tawerna-dark font-black scale-105 shadow-md z-10 cursor-pointer';
    }
    if (isBetween) {
      return 'bg-tawerna-gold/30 text-white font-bold cursor-pointer';
    }

    return 'bg-tawerna-wood/40 hover:bg-tawerna-gold/25 hover:text-white text-tawerna-cream cursor-pointer';
  };

  // Generate blank squares for calendar offset
  const blanks = Array(activeMonth.startOffset).fill(null);
  const daysArray = Array.from({ length: activeMonth.days }, (_, i) => i + 1);

  const totalNights = startDate !== null && endDate !== null ? endDate - startDate : 0;
  const totalPrice = totalNights * pricePerDay;

  return (
    <div className="bg-[#120703] border-2 border-tawerna-gold/30 p-5 rounded-2xl shadow-xl flex flex-col gap-4 w-full">
      {/* Month selectors - Super simple and big */}
      <div className="flex justify-between items-center bg-tawerna-dark/50 p-1.5 rounded-xl border border-tawerna-gold/15">
        <button
          type="button"
          onClick={() => handleMonthToggle('July')}
          className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${
            currentMonth === 'July'
              ? 'bg-tawerna-gold text-tawerna-dark shadow'
              : 'text-tawerna-sand hover:text-white'
          }`}
        >
          Lipiec
        </button>
        <button
          type="button"
          onClick={() => handleMonthToggle('August')}
          className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${
            currentMonth === 'August'
              ? 'bg-tawerna-gold text-tawerna-dark shadow'
              : 'text-tawerna-sand hover:text-white'
          }`}
        >
          Sierpień 2026
        </button>
      </div>

      {/* Week days labels */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-tawerna-gold uppercase tracking-wider pb-1">
        <div>Pn</div>
        <div>Wt</div>
        <div>Śr</div>
        <div>Cz</div>
        <div>Pt</div>
        <div className="text-amber-500">Sb</div>
        <div className="text-amber-500">Nd</div>
      </div>

      {/* Days Grid - Large, tap-friendly buttons */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, idx) => (
          <div key={`blank-${idx}`} className="aspect-square bg-transparent"></div>
        ))}
        {daysArray.map((day) => {
          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => handleDateClick(day)}
              className={`aspect-square flex items-center justify-center text-sm md:text-base font-bold rounded-lg transition-all ${getDayClass(
                day
              )}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-[11px] text-tawerna-sand font-serif italic border-t border-tawerna-gold/10 pt-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-tawerna-wood/40 border border-tawerna-gold/10 inline-block"></span>
          <span>Wolny</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-neutral-800 line-through inline-block"></span>
          <span>Zajęty</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-tawerna-gold inline-block"></span>
          <span>Twój wybór</span>
        </div>
      </div>

      {/* Booking summary box */}
      <div className="bg-tawerna-dark/80 rounded-xl p-3 border border-tawerna-gold/15 text-center min-h-[70px] flex flex-col justify-center">
        {startDate === null ? (
          <p className="text-xs md:text-sm font-serif italic text-tawerna-sand">
            Krok 1: Kliknij na kalendarzu dzień przyjazdu, a potem dzień wyjazdu.
          </p>
        ) : endDate === null ? (
          <p className="text-xs md:text-sm font-semibold text-tawerna-gold animate-pulse">
            Wybrano przyjazd: {startDate} {currentMonth === 'July' ? 'lipca' : 'sierpnia'}. Kliknij dzień wyjazdu.
          </p>
        ) : (
          <div className="text-left px-1">
            <p className="text-xs font-mono text-tawerna-sand uppercase tracking-wider">PODSUMOWANIE WYBORU:</p>
            <p className="text-sm font-serif font-bold text-white">
              {startDate} - {endDate} {currentMonth === 'July' ? 'lipca' : 'sierpnia'} 2026 ({totalNights} {totalNights === 1 ? 'noc' : totalNights < 5 ? 'noce' : 'nocy'})
            </p>
            <p className="text-xs text-tawerna-gold font-bold mt-1">
              Orientacyjny koszt: {totalPrice} zł
            </p>
          </div>
        )}
      </div>

      {/* Large visual actions */}
      {!showBookingForm ? (
        <button
          type="button"
          disabled={startDate === null || endDate === null}
          onClick={() => setShowBookingForm(true)}
          className={`w-full py-3.5 rounded-xl font-sans font-black text-base transition-all flex items-center justify-center gap-2 ${
            startDate !== null && endDate !== null
              ? 'bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark hover:scale-[1.02] shadow-lg cursor-pointer'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
          }`}
        >
          <CalendarIcon className="w-5 h-5" />
          Zarezerwuj ten domek
        </button>
      ) : (
        <div className="border-t border-tawerna-gold/25 pt-3 flex flex-col gap-3">
          {!bookingSuccess ? (
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-2">
              <label className="block text-xs font-bold text-tawerna-sand text-left">
                Wpisz swój numer telefonu - nasza obsługa oddzwoni, by zatwierdzić rezerwację:
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  required
                  placeholder="np. 798 550 017"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-tawerna-dark/90 border border-tawerna-gold/30 rounded-xl p-3 text-sm focus:outline-none focus:border-tawerna-gold text-white font-mono font-bold"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold px-4 rounded-xl text-sm transition"
                >
                  Wyślij
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-tawerna-sand/80">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Lub zadzwoń sam bezpośrednio: <strong>798 550 017</strong></span>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 text-center flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h5 className="font-serif font-black text-white text-md">Zapytanie wysłane!</h5>
              <p className="text-xs text-tawerna-sand max-w-xs">
                Dziękujemy! Otrzymaliśmy zgłoszenie rezerwacji domku <strong>{cottageName}</strong> w terminie <strong>{startDate} - {endDate} {currentMonth === 'July' ? 'lipca' : 'sierpnia'}</strong>. Oddzwonimy na numer <strong>{phoneNumber}</strong> w ciągu kilku minut!
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-tawerna-gold hover:underline mt-2"
              >
                Zamknij lub wybierz inny termin
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
