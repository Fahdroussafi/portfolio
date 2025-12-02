import gsap from 'gsap';
import { useEffect, useRef } from 'react';

/**
 * Custom hook for GSAP hover animations
 * @param {Object} options - Animation options
 * @param {number} options.scale - Scale factor on hover (default: 1.05)
 * @param {number} options.y - Y translation on hover (default: -5)
 * @param {number} options.rotation - Rotation on hover (default: 0)
 * @param {number} options.duration - Animation duration (default: 0.4)
 * @param {string} options.ease - GSAP easing function (default: 'power2.out')
 */
export const useGsapHover = (options = {}) => {
  const elementRef = useRef(null);

  const { scale = 1.05, y = -5, rotation = 0, duration = 0.4, ease = 'power2.out' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        y,
        rotation,
        duration,
        ease,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration,
        ease,
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale, y, rotation, duration, ease]);

  return elementRef;
};
