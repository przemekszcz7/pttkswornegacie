import { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Facebook } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#o-nas', label: 'O nas' },
    { href: '#domki', label: 'Noclegi' },
    { href: '#atrakcje', label: 'Atrakcje' },
    { href: '#tawerna', label: 'Tawerna' },
    { href: '#kalkulator', label: 'Kalkulator Pobytu' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-tawerna-dark/95 border-b border-tawerna-gold/20 shadow-lg backdrop-blur-md py-2'
          : 'bg-gradient-to-b from-tawerna-dark/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo and Brand Title */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="https://i.ibb.co/TxnBQf0H/613302369-122168003180823864-3793124179119175346-n.jpg"
            alt="PTTK Swornegacie Logo"
            className="w-12 h-12 md:w-14 h-14 rounded-full border-2 border-tawerna-gold object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm md:text-md tracking-wider text-tawerna-gold group-hover:text-tawerna-gold-hover transition-colors">
              P T T K
            </span>
            <span className="font-serif font-bold text-xs md:text-sm text-tawerna-cream tracking-normal -mt-1">
              Swornegacie
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans font-medium text-xs xl:text-sm tracking-wide text-tawerna-sand hover:text-tawerna-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/profile.php?id=61574715944986"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-tawerna-gold/30 text-tawerna-sand hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-white/5 transition-all duration-300"
            title="Odwiedź nas na Facebooku"
          >
            <Facebook className="w-4 h-4" />
          </a>

          {/* Booking Button */}
          <a
            href="https://www.booking.com/hotel/pl/stanica-wodna-swornegacie-pttk.pl.html?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZHRFUUZ5UkJOeUNvNDF6WHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7m9PavEFXFD2BdhVWaFKkMYUuFrqymsA8SejjI2MOdusXFqqKZ4y2mGns6TQ_aem_9L2AcMXvUiZt6Fx13IJByA&chal_t=1779527224279&force_referer="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-[#003580] hover:bg-[#002244] text-white text-xs font-bold px-3 py-1.5 rounded-md border border-light transition-all shadow-md"
          >
            <Calendar className="w-3.5 h-3.5" />
            Booking.com
          </a>

          {/* Call Button */}
          <a
            href="tel:+48798550017"
            className="flex items-center gap-1.5 bg-tawerna-gold hover:bg-tawerna-gold-hover text-tawerna-dark font-sans font-bold text-xs px-3 py-1.5 rounded-md transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            798 550 017
          </a>
        </div>

        {/* Mobile Burger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-md border border-tawerna-gold/30 text-tawerna-sand hover:text-tawerna-gold focus:outline-none transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[64px] md:top-[72px] bg-tawerna-dark/98 backdrop-blur-lg z-40 transition-all duration-350 transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } lg:hidden flex flex-col justify-between`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-serif font-bold text-lg tracking-wide text-tawerna-cream hover:text-tawerna-gold transition"
            >
              • {link.label}
            </a>
          ))}
        </div>

        <div className="bg-tawerna-wood/80 p-6 border-t border-tawerna-gold/10 flex flex-col gap-4">
          <p className="text-xs font-serif text-tawerna-sand text-center italic">
            Stanica pod nowym zarządem od 4 kwietnia 2025. Zapraszamy!
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://www.booking.com/hotel/pl/stanica-wodna-swornegacie-pttk.pl.html?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZHRFUUZ5UkJOeUNvNDF6WHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7m9PavEFXFD2BdhVWaFKkMYUuFrqymsA8SejjI2MOdusXFqqKZ4y2mGns6TQ_aem_9L2AcMXvUiZt6Fx13IJByA&chal_t=1779527224279&force_referer="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#003580] text-white text-xs font-bold py-2.5 rounded-md text-center"
            >
              <Calendar className="w-4 h-4" />
              Booking.com
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61574715944986"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#1877F2] text-white text-xs font-bold py-2.5 rounded-md text-center"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
          </div>
          <a
            href="tel:+48798550017"
            className="flex items-center justify-center gap-2 bg-tawerna-gold text-tawerna-dark font-bold py-3 rounded-md text-center shadow-md transition"
          >
            <Phone className="w-4 h-4" />
            Zadzwoń: 798 550 017
          </a>
        </div>
      </div>
    </header>
  );
}
