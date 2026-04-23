import { useEffect, useRef, useState } from 'react';
import Button from '../components/button.jsx';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// ─── Mobile 3D Text Component ────────────────────────────────────────────────
// Uses device gyroscope to tilt the text in 3D space with a deep extruded shadow.
// Falls back to a gentle floating animation if gyroscope is unavailable.
const Mobile3DText = () => {
  const containerRef = useRef(null);
  const gyroAvailable = useRef(false);
  const rotX = useRef(0);
  const rotY = useRef(0);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Smooth lerp loop for gyro input
    const animate = () => {
      rotX.current += (targetRotX.current - rotX.current) * 0.08;
      rotY.current += (targetRotY.current - rotY.current) * 0.08;

      const rx = rotX.current;
      const ry = rotY.current;

      // Dynamic 3D extrusion shadow that shifts with tilt direction
      const shadowX = ry * -0.6;
      const shadowY = rx * 0.6;
      const layers = 8;
      let shadow = '';
      for (let i = 1; i <= layers; i++) {
        const depth = i * 1.5;
        const opacity = 0.35 - i * 0.035;
        shadow += `${shadowX * depth}px ${shadowY * depth}px 0 rgba(100, 100, 120, ${opacity})`;
        if (i < layers) shadow += ', ';
      }
      // Add a glow at the end
      shadow += `, ${shadowX * 2}px ${shadowY * 2}px 30px rgba(190, 193, 207, 0.15)`;

      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.textShadow = shadow;

      rafId.current = requestAnimationFrame(animate);
    };

    const handleOrientation = (e) => {
      gyroAvailable.current = true;
      el.classList.remove('hero-3d-float');

      // beta = front-back tilt (-180→180), gamma = left-right tilt (-90→90)
      const beta = Math.max(-30, Math.min(30, e.beta || 0));
      const gamma = Math.max(-30, Math.min(30, e.gamma || 0));

      // Map to gentle rotation range
      targetRotX.current = beta * -0.25;
      targetRotY.current = gamma * 0.3;
    };

    // Try to get gyroscope permission (iOS 13+)
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      // iOS — will need a user gesture to request
      const requestGyro = () => {
        DeviceOrientationEvent.requestPermission()
          .then((state) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            }
          })
          .catch(() => {});
        // Only try once
        window.removeEventListener('touchstart', requestGyro);
      };
      window.addEventListener('touchstart', requestGyro, { once: true, passive: true });
    } else if (typeof DeviceOrientationEvent !== 'undefined') {
      // Android / others — just listen
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    // If gyro doesn't fire within 1s, keep the CSS float animation
    const fallbackTimer = setTimeout(() => {
      if (!gyroAvailable.current) {
        el.classList.add('hero-3d-float');
      }
    }, 1000);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      clearTimeout(fallbackTimer);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-3d-float hero-3d-mobile"
      style={{
        fontSize: 'clamp(2.4rem, 11vw, 5rem)',
        lineHeight: 1.05,
        marginTop: '1.2rem',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}>
      <span className="hero-3d-text">Building</span>
      <br />
      <span className="hero-3d-text">Products</span>
    </div>
  );
};

// ─── Main Hero Component ─────────────────────────────────────────────────────
const Hero = () => {
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [isTouch] = useState(isTouchDevice);

  // Interactive text effect — desktop only
  useEffect(() => {
    if (isTouch) return;

    const textContainer = textRef.current;
    if (!textContainer) return;

    const text = 'Building Products';
    textContainer.innerHTML = '';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'hero-char inline-block relative select-none';
      span.style.color = 'transparent';
      span.style.backgroundClip = 'text';
      span.style.webkitBackgroundClip = 'text';
      span.style.backgroundImage =
        'radial-gradient(circle at var(--x, 50%) var(--y, 50%), #ffffff 15%, #808080 30%, #333333 100%)';
      span.style.transition = 'transform 0.1s';
      textContainer.appendChild(span);
      return span;
    });

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      if (textContainer) {
        textContainer.style.transform = `perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
      }

      chars.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 1000);

        const maxRadius = 30;
        const moveX = 50 + Math.cos(angle) * maxRadius * (distance / 1000);
        const moveY = 50 + Math.sin(angle) * maxRadius * (distance / 1000);

        span.style.setProperty('--x', `${moveX}%`);
        span.style.setProperty('--y', `${moveY}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch]);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = isTouch ? 20 : 50;
    const connectionDistance = isTouch ? 100 : 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(190, 193, 207, 0.5)';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.update();
        p.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(190, 193, 207, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouch]);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div className="w-full mx-auto flex flex-col flex-1 justify-center sm:justify-start sm:mt-36 mt-0 c-space gap-3 z-10">
        <div className="flex flex-col items-center">
          <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
            Hello, I&apos;m Fahd<span className="waving-hand">👋</span>
          </p>

          {/* Desktop: per-char radial gradient with mouse tracking */}
          {!isTouch && (
            <div
              ref={textRef}
              className="hero_tag text-center cursor-pointer font-black tracking-tighter text-gray_gradient"
              style={{
                fontSize: 'clamp(2.2rem, 9vw, 9rem)',
                lineHeight: 1.1,
                marginTop: '1rem',
              }}>
              Building Products
            </div>
          )}

          {/* Mobile: 3D gyroscope-driven text with extruded shadow */}
          {isTouch && <Mobile3DText />}
        </div>

        {/* Mobile: button in flow, right after text */}
        <div className="sm:hidden mt-10 w-full z-10 c-space">
          <a href="#contact" className="w-fit">
            <Button name="Let's work together" isBeam containerClass="w-full" />
          </a>
        </div>
      </div>

      {/* Desktop: button pinned to bottom */}
      <div className="hidden sm:block absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#contact" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit sm:min-w-96" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
