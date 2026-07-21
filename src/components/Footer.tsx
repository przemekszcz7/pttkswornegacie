import { Phone, Mail, MapPin, Facebook, Compass, Calendar } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tawerna-dark text-tawerna-sand px-4 md:px-8 py-12 border-t border-tawerna-gold/15 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-tawerna-gold/2 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Brand & Management */}
        <div className="md:col-span-5 flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/TxnBQf0H/613302369-122168003180823864-3793124179119175346-n.jpg"
              alt="PTTK Logo"
              className="w-12 h-12 rounded-full border border-tawerna-gold object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-display font-black text-sm tracking-widest text-tawerna-gold">STANICA WODNA</p>
              <p className="font-serif font-bold text-xs text-tawerna-cream">i Tawerna PTTK Swornegacie</p>
            </div>
          </div>
          <p className="text-xs font-serif italic text-left leading-relaxed text-tawerna-cream">
            Stanica Wodna PTTK pod nowym zarządem od 4 kwietnia 2025 roku. Oferujemy noclegi w odnowionych domkach letniskowych z aneksami kuchennymi i prywatnymi łazienkami. Do dyspozycji gości przygotowaliśmy trawiaste pole namiotowe, prywatne pomosty, spływy kajakowe oraz przytulną tawernę z wyśmienitym jedzeniem.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3 flex flex-col gap-3 text-left">
          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-tawerna-gold">Szybkie linki</h4>
          <div className="flex flex-col gap-2 text-xs">
            <a href="#o-nas" className="hover:text-tawerna-gold transition">O nas & Nowy Zarząd</a>
            <a href="#domki" className="hover:text-tawerna-gold transition">Domki & Kemping</a>
            <a href="#atrakcje" className="hover:text-tawerna-gold transition">Atrakcje & Spływy</a>
            <a href="#tawerna" className="hover:text-tawerna-gold transition">Tawerna Gastronomia</a>
            <a href="#kalkulator" className="hover:text-tawerna-gold transition">Kalkulator wyceny</a>
            <a href="#kontakt" className="hover:text-tawerna-gold transition">Kontakt i FAQ</a>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="md:col-span-4 flex flex-col gap-4 text-left">
          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-tawerna-gold">Informacje kontaktowe</h4>
          <div className="flex flex-col gap-3 text-xs font-serif">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-tawerna-gold flex-shrink-0" />
              <span>Zbrzyca 17, Swornegacie 89-608</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-tawerna-gold flex-shrink-0" />
              <a href="tel:+48798550017" className="hover:text-tawerna-gold transition font-sans font-bold">798 550 017</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-tawerna-gold flex-shrink-0" />
              <a href="mailto:pttkswornegacie@gmail.com" className="hover:text-tawerna-gold transition">pttkswornegacie@gmail.com</a>
            </div>
          </div>

          {/* Social Platforms Links */}
          <div className="flex gap-2.5 mt-2">
            <a
              href="https://www.facebook.com/profile.php?id=61574715944986"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 px-3 py-1.5 rounded text-xs font-bold transition"
            >
              <Facebook className="w-3.5 h-3.5" />
              Nasz Facebook
            </a>
            <a
              href="https://www.booking.com/hotel/pl/stanica-wodna-swornegacie-pttk.pl.html?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZHRFUUZ5UkJOeUNvNDF6WHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7m9PavEFXFD2BdhVWaFKkMYUuFrqymsA8SejjI2MOdusXFqqKZ4y2mGns6TQ_aem_9L2AcMXvUiZt6Fx13IJByA&chal_t=1779527224279&force_referer="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-[#003580]/15 hover:bg-[#003580]/25 text-[#003580] hover:text-[#4a90e2] border border-[#003580]/30 px-3 py-1.5 rounded text-xs font-bold transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              Booking.com
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-tawerna-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-tawerna-sand/60">
          &copy; {currentYear} Stanica Wodna i Tawerna PTTK Swornegacie. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
