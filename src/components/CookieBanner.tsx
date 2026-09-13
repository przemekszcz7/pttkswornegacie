import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CookieBannerProps {
  onOpenCookies?: () => void;
}

export const COOKIE_CONSENT_KEY = 'pttk-cookie-consent';

export default function CookieBanner({ onOpenCookies }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Small delay for smooth entry after initial page load
        const timer = setTimeout(() => setIsVisible(true), 400);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is disabled/restricted in some iframe sandbox
      setIsVisible(false);
    }
  }, []);

  const handleConsent = (type: 'necessary' | 'all') => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, type);
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleCookiesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onOpenCookies) {
      e.preventDefault();
      onOpenCookies();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto bg-[#180d07]/95 backdrop-blur-md border-2 border-tawerna-gold/40 rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] text-left pointer-events-auto relative overflow-hidden">
            {/* Subtle glow decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-tawerna-gold/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6 relative z-10">
              
              {/* Information text with Cookie icon */}
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-xl bg-tawerna-gold/15 border border-tawerna-gold/30 flex items-center justify-center text-tawerna-gold shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-sm md:text-base text-white">
                      Dbamy o Twoją prywatność i pliki cookies
                    </h4>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                      <ShieldCheck className="w-3 h-3" /> Zgodne z RODO
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-tawerna-cream leading-relaxed">
                    Nasz serwis korzysta z plików cookies w celu zapewnienia prawidłowego działania witryny, bezpiecznej obsługi formularzy rezerwacji oraz płatności elektronicznych ING Pay. Szczegółowe zasady oraz rodzaje ciasteczek opisaliśmy w naszej{' '}
                    <a
                      href="polityka-cookies.html"
                      onClick={handleCookiesClick}
                      className="text-tawerna-gold font-bold underline hover:text-white transition cursor-pointer"
                    >
                      Polityce Cookies
                    </a>.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleConsent('necessary')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-tawerna-gold/35 bg-tawerna-dark/80 hover:bg-tawerna-wood/60 text-tawerna-sand hover:text-white font-sans font-semibold text-xs sm:text-sm transition-all duration-150 cursor-pointer text-center"
                >
                  Tylko niezbędne
                </button>
                <button
                  type="button"
                  onClick={() => handleConsent('all')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-xs sm:text-sm transition-all duration-150 shadow-md hover:scale-[1.02] cursor-pointer text-center"
                >
                  Akceptuję wszystkie
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
