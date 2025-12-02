import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const MouseFollower = () => {
  const followerRef = useRef(null);
  const trailRefs = useRef([]);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const followerPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

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

    window.addEventListener('mousemove', handleMouseMove);
    animateFollower();

    let particleTimeout;
    const createParticle = (e) => {
      clearTimeout(particleTimeout);
      particleTimeout = setTimeout(() => {
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
      }, 50);
    };

    window.addEventListener('mousemove', createParticle);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', createParticle);
      clearTimeout(particleTimeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

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
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="mouse-trail"
          style={{
            position: 'fixed',
            width: `${30 - i * 4}px`,
            height: `${30 - i * 4}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(190, 193, 207, ${0.4 - i * 0.05}), rgba(213, 216, 234, ${0.2 - i * 0.03}))`,
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
