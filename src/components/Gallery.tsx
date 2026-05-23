import { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { X, ChevronLeft, ChevronRight, Maximize2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    const prevIndex = lightboxIndex === 0 ? GALLERY_ITEMS.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex === GALLERY_ITEMS.length - 1 ? 0 : lightboxIndex + 1;
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

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {GALLERY_ITEMS.map((item, index) => {
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

                  {/* Wood overlay gradient and zoom icon on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="p-2.5 rounded-full bg-tawerna-dark/90 border border-tawerna-gold/40 text-tawerna-gold transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* No images fallback */}
         {GALLERY_ITEMS.length === 0 && (
          <div className="text-center py-12">
            <p className="text-tawerna-sand font-serif">Brak zdjęć w galerii.</p>
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
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
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
                  src={GALLERY_ITEMS[lightboxIndex].url}
                  alt={GALLERY_ITEMS[lightboxIndex].title}
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

            {/* No text footer */}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
