import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { onboardingSlides } from '../../data/onboardingSlides';
import { cn } from '../../utils/classNames';
function HeroSlideshow({ interval = 4500 }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    onboardingSlides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);
  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % onboardingSlides.length),
      interval
    );
    return () => window.clearInterval(id);
  }, [interval]);
  const slide = onboardingSlides[index];
  return (
    <>
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: '0%' }}
            exit={reduceMotion ? { opacity: 0 } : { x: '-30%' }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.img
              src={slide.src}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: slide.position }}
              initial={{ scale: 1.08 }}
              animate={{ scale: reduceMotion ? 1.08 : 1 }}
              transition={{ duration: interval / 1e3 + 1, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div
        className="absolute bottom-6 right-6 z-10 flex gap-1.5 md:bottom-12 md:right-12"
        role="tablist"
        aria-label="Background photos"
      >
        {onboardingSlides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className="grid h-6 place-items-center"
          >
            <span
              className={cn(
                'block h-1.5 rounded-full transition-all duration-300',
                i === index ? 'w-6 bg-highlight' : 'w-1.5 bg-white/50 hover:bg-white/80'
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
export { HeroSlideshow };
