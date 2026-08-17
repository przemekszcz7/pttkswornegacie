import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, Clock, Mail, Phone, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PaymentStatusType = 'success' | 'failure';

interface PaymentStatusModalProps {
  onClose?: () => void;
}

export default function PaymentStatusModal({ onClose }: PaymentStatusModalProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: PaymentStatusType;
  } | null>(null);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      // Check standard and imoje status parameters
      const statusParam = (
        urlParams.get('status') ||
        urlParams.get('payment_status') ||
        urlParams.get('imoje_status') ||
        urlParams.get('paymentStatus')
      )?.toLowerCase();

      if (statusParam) {
        const failureStatuses = ['failure', 'cancelled', 'canceled', 'rejected', 'error', 'failed', 'declined'];
        const successStatuses = ['success', 'settled', 'paid', 'approved', 'completed'];

        if (failureStatuses.includes(statusParam)) {
          setModalState({
            isOpen: true,
            type: 'failure',
          });
        } else if (successStatuses.includes(statusParam)) {
          setModalState({
            isOpen: true,
            type: 'success',
          });
        }

        // Clean URL parameters without reloading the page
        const cleanUrl = window.location.pathname + (window.location.hash || '');
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (e) {
      console.error('Error parsing payment status from URL:', e);
    }
  }, []);

  const handleClose = () => {
    setModalState(null);
    if (onClose) onClose();
  };

  if (!modalState || !modalState.isOpen) {
    return null;
  }

  const isSuccess = modalState.type === 'success';

  return (
    <AnimatePresence>
      <div 
        id="payment-status-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-2 text-left ${
            isSuccess 
              ? 'bg-[#121c15] border-emerald-500/40 text-tawerna-cream shadow-emerald-950/50' 
              : 'bg-[#1e130c] border-amber-500/40 text-tawerna-cream shadow-amber-950/50'
          }`}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Zamknij powiadomienie"
            className="absolute top-4 right-4 p-2 text-tawerna-sand hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
              isSuccess 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <AlertTriangle className="w-8 h-8" />
              )}
            </div>
            <div>
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                isSuccess ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {isSuccess ? 'Płatność i rezerwacja' : 'Status płatności'}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {isSuccess ? 'Dziękujemy za wpłatę!' : 'Płatność nie została sfinalizowana'}
              </h3>
            </div>
          </div>

          {/* Core Content */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-tawerna-cream/95">
            {isSuccess ? (
              <>
                <p className="font-serif italic text-emerald-200">
                  Twoja płatność została pomyślnie zrealizowana, a pobyt w Stanicy Wodnej Swornegacie został zarezerwowany.
                </p>

                {/* Success info card */}
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5 text-emerald-200">
                    <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Potwierdzenie e-mail:</strong> Na Twój adres wysłaliśmy wiadomość ze szczegółami rezerwacji, godzinami zameldowania oraz wskazówkami dojazdu.
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-emerald-200 pt-1 border-t border-emerald-500/20">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Twój termin został zablokowany w naszym grafiku. Do zobaczenia na Kaszubach!</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Failure main required message */}
                <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/35 space-y-3">
                  <p className="font-sans font-medium text-amber-100 text-sm sm:text-base leading-relaxed">
                    Płatność nie została sfinalizowana. Na Twój adres e-mail wysłaliśmy wiadomość z linkiem do dokończenia płatności. Masz 10 minut na opłacenie rezerwacji, po tym czasie termin zostanie zwolniony.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-amber-500/20 text-amber-200">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Czas na opłacenie:</strong> 10 minut</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-amber-500/20 text-amber-200">
                      <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Sprawdź skrzynkę e-mail</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-tawerna-sand">
                  Jeśli napotkasz trudności z płatnością online lub nie widzisz wiadomości w skrzynce (sprawdź też folder SPAM), skontaktuj się z nami bezpośrednio.
                </p>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-tawerna-gold/20 flex flex-col sm:flex-row gap-3 items-center justify-end">
            {!isSuccess && (
              <a
                href="tel:+48798550017"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-tawerna-wood/80 hover:bg-tawerna-wood border border-tawerna-gold/30 text-tawerna-cream text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-tawerna-gold" />
                <span>Zadzwoń do nas: 798 550 017</span>
              </a>
            )}

            <button
              onClick={handleClose}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-sans font-bold text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                isSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              <span>{isSuccess ? 'Przejdź do strony głównej' : 'Rozumiem'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
