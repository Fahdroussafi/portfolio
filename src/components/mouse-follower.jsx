import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const MouseFollower = () => {
  const followerRef = useRef(null);
  const trailRefs = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const isTouch = useRef(isTouchDevice());

  useEffect(() => {
    // Don't render mouse follower on touch devices — it's pointless and wastes GPU cycles
    if (isTouch.current) return;

    const follower = followerRef.current;
    if (!follower) return;

    // Initialize positions to center
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    followerPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animateFollower = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15;

      gsap.set(follower, {
        x: followerPos.current.x,
        y: followerPos.current.y,
      });

      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          const delay = (index + 1) * 0.05;
          const targetX = followerPos.current.x + (mousePos.current.x - followerPos.current.x) * delay;
          const targetY = followerPos.current.y + (mousePos.current.y - followerPos.current.y) * delay;

          gsap.set(trail, {
            x: targetX,
            y: targetY,
          });
        }
      });

      animationFrameId.current = requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animateFollower();

    // Throttled particle creation to reduce DOM thrashing
    let lastParticleTime = 0;
    const createParticle = (e) => {
      const now = Date.now();
      if (now - lastParticleTime < 80) return; // Throttle to ~12fps for particles
      lastParticleTime = now;

      const particle = document.createElement('div');
      particle.className = 'mouse-particle';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      document.body.appendChild(particle);

      gsap.to(particle, {
        opacity: 0,
        scale: 2,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    };

    window.addEventListener('mousemove', createParticle, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', createParticle);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Don't render anything on touch devices
  if (isTouch.current) return null;

  return (
    <>
      <div
        ref={followerRef}
        className="mouse-follower"
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190, 193, 207, 0.6), rgba(213, 216, 234, 0.3))',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'screen',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(8px)',
          willChange: 'transform',
        }}
      />
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="mouse-trail"
          style={{
            position: 'fixed',
            width: `${30 - i * 6}px`,
            height: `${30 - i * 6}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(190, 193, 207, ${0.4 - i * 0.08}), rgba(213, 216, 234, ${0.2 - i * 0.05}))`,
            pointerEvents: 'none',
            zIndex: 99998 - i,
            mixBlendMode: 'screen',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(6px)',
            willChange: 'transform',
          }}
        />
      ))}
    </>
  );
};

export default MouseFollower;
