import { useRef } from 'react';
import { useSmoothScroll } from '../hooks/use-smooth-scroll';

export function SmoothScroll({ children }) {
  const wrapperRef = useRef(null);

  useSmoothScroll();

  return (
    <div ref={wrapperRef} className="smooth-scroll-container">
      {children}
    </div>
  );
}
