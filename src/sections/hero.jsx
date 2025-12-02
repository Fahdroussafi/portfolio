import { useEffect, useRef } from 'react';
import Button from '../components/button.jsx';

const Hero = () => {
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
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

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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
      for (let i = 0; i < 50; i++) {
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

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(190, 193, 207, ${1 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 z-10">
        <div className="flex flex-col items-center">
          <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
            Hello, I&apos;m Fahd<span className="waving-hand">👋</span>
          </p>
          <div
            ref={textRef}
            className="hero_tag text-center cursor-pointer font-black tracking-tighter"
            style={{
              fontSize: 'clamp(3rem, 9vw, 9rem)',
              lineHeight: 1.1,
              marginTop: '1rem',
            }}>
            Building Products
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#contact" className="w-fit">
          <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
