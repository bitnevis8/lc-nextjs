'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function Slider({ images, autoAdvanceMs = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const safeImages = useMemo(() => Array.isArray(images) ? images.filter(Boolean) : [], [images]);
  const hasImages = safeImages.length > 0;

  const goTo = (index) => {
    if (!hasImages) return;
    const lastIndex = safeImages.length - 1;
    if (index < 0) setCurrentIndex(lastIndex);
    else if (index > lastIndex) setCurrentIndex(0);
    else setCurrentIndex(index);
  };

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  useEffect(() => {
    if (!hasImages) return;
    timerRef.current = setInterval(goNext, autoAdvanceMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasImages, currentIndex, autoAdvanceMs]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    if (!hasImages) return;
    timerRef.current = setInterval(goNext, autoAdvanceMs);
  };

  if (!hasImages) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative h-[220px] sm:h-[320px] md:h-[420px]">
        {safeImages.map((img, idx) => (
          <div
            key={img.src || idx}
            className={`absolute inset-0 transition-opacity duration-500 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        className="absolute top-1/2 -translate-y-1/2 right-3 md:right-4 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 border border-gray-300 shadow"
        onClick={goPrev}
      >
        ◀
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute top-1/2 -translate-y-1/2 left-3 md:left-4 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 border border-gray-300 shadow"
        onClick={goNext}
      >
        ▶
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {safeImages.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${idx === currentIndex ? 'bg-rose-600' : 'bg-gray-300'}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}


