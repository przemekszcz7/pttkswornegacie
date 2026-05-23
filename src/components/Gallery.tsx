import { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { X, ChevronLeft, ChevronRight, Maximize2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'rooms' | 'tavern' | 'nature' | 'activities'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { value: 'all', label: 'Wszystkie zdjęcia' },
    { value: 'rooms', label: 'Domki i Camping' },
    { value: 'tavern', label: 'Tawerna i Taras' },
    { value: 'activities', label: 'Spływy i Aktywności' },
    { value: 'nature', label: 'Przyroda wokół nas' },
  ];

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    const prevIndex = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIndex);
  };

  return (
    <section id="galeria" className="py-20 bg-tawerna-dark relative overflow-hidden organic-bg">
      {/* Decorative foliage shadows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-tawerna-forest/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-tawerna-clay/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-tawerna-gold mb-3">
            <Layers className="w-5 h-5" />
            <span className="font-display tracking-widest text-xs font-bold uppercase">Fotorelacja Swornegacie</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-tawerna-cream tracking-tight mb-4">
            Galeria Naszej Stanicy
          </h2>
          <div className="w-24 h-1 bg-tawerna-gold mx-auto rounded-full"></div>
          <p className="max-w-xl mx-auto text-tawerna-sand text-sm md:text-base mt-4 font-serif italic text-balance">
            Zobacz na własne oczy urok naszych zmodernizowanych domków, sielankowe pole namiotowe, klimatyczną tawernę oraz meandry rzek.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 pb-2 border-b border-tawerna-gold/10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setFilter(cat.value as any);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 font-sans font-semibold text-xs md:text-sm tracking-wide transition-all rounded-md cursor-pointer ${
                filter === cat.value
                  ? 'bg-tawerna-gold text-tawerna-dark font-bold shadow-md'
                  : 'text-tawerna-sand hover:text-tawerna-gold hover:bg-tawerna-wood/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // find the actual global index in filteredItems
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative cursor-pointer overflow-hidden rounded-lg aspect-[4/3] wood-card-border"
                  onClick={() => setLightboxIndex(index)}
                >
                  {/* Photo itself */}
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Wood overlay gradient for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-tawerna-dark via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Interactive icon & content overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-display font-medium text-tawerna-gold tracking-widest uppercase">
                          {categories.find(c => c.value === item.category)?.label}
                        </span>
                        <h3 className="font-serif text-sm font-bold text-tawerna-cream tracking-wide group-hover:text-tawerna-gold transition">
                          {item.title}
                        </h3>
                      </div>
                      <div className="p-1.5 rounded-full bg-tawerna-dark/80 border border-tawerna-gold/30 text-tawerna-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* No images fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-tawerna-sand font-serif">Brak zdjęć w wybranej kategorii.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between p-4 md:p-8 select-none"
          >
            {/* Header controls */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto text-tawerna-cream z-10">
              <span className="font-mono text-xs text-tawerna-sand">
                {lightboxIndex + 1} / {filteredItems.length} — {categories.find(c => c.value === filteredItems[lightboxIndex].category)?.label}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full hover:bg-tawerna-wood/60 border border-tawerna-gold/20 text-tawerna-cream hover:text-tawerna-gold cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle slider content */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto my-auto relative py-4">
              {/* Left arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-12 p-3 rounded-full bg-tawerna-wood/80 hover:bg-tawerna-gold/90 hover:text-tawerna-dark border border-tawerna-gold/30 text-tawerna-gold cursor-pointer transition z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central high resolution display */}
              <div className="w-full h-[65vh] flex items-center justify-center pointer-events-none p-2">
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-full rounded-md shadow-2xl border-4 border-tawerna-wood object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-12 p-3 rounded-full bg-tawerna-wood/80 hover:bg-tawerna-gold/90 hover:text-tawerna-dark border border-tawerna-gold/30 text-tawerna-gold cursor-pointer transition z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom descriptions */}
            <div className="w-full max-w-3xl mx-auto text-center pb-4 z-10">
              <h4 className="font-display text-lg md:text-2xl font-bold text-tawerna-gold glow-gold mb-1">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="font-serif text-sm md:text-base text-tawerna-sand italic">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
