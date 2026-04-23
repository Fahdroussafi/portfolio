import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../components/button.jsx';
import { useGsapHover } from '../hooks/use-gsap-hover';

gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const Globe = lazy(() => import('react-globe.gl'));

const GlobeSection = () => {
  const labelsData = useMemo(() => [{ lat: 40, lng: -100, text: 'Rabat, Morocco', color: 'white', size: 15 }], []);
  const globeSize = isTouchDevice() ? Math.min(280, window.innerWidth - 40) : 326;
  return (
    <Suspense
      fallback={
        <div className="w-full sm:h-[326px] h-[280px] flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      }>
      <Globe
        height={globeSize}
        width={globeSize}
        backgroundColor="rgba(0, 0, 0, 0)"
        backgroundImageOpacity={0.5}
        showAtmosphere
        showGraticules
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        labelsData={labelsData}
      />
    </Suspense>
  );
};

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const isTouch = isTouchDevice();
  const hoverCfg = isTouch
    ? { scale: 1, y: 0, duration: 0 }
    : { scale: 1.05, y: -10, duration: 0.4, ease: 'back.out(1.7)' };
  const gridRef1 = useGsapHover(hoverCfg);
  const gridRef2 = useGsapHover(hoverCfg);
  const gridRef3 = useGsapHover(hoverCfg);
  const gridRef4 = useGsapHover(hoverCfg);
  const gridRef5 = useGsapHover(hoverCfg);

  useGSAP(
    () => {
      const grids = gsap.utils.toArray('.grid-container');
      grids.forEach((grid, i) => {
        gsap.fromTo(
          grid,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none reverse' },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const handleCopy = () => {
    navigator.clipboard.writeText('roussafifahd@gmail.com');
    setHasCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHasCopied(false);
      timeoutRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="c-space my-20" id="about" ref={containerRef}>
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div
            ref={gridRef1}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col justify-between p-4 sm:p-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-[200px] object-contain mx-auto"
              loading="lazy"
              decoding="async"
            />
            <div className="mt-4">
              <p className="grid-headtext text-xl sm:text-2xl font-bold text-white mb-2">Hi, I&apos;m Fahd Roussafi</p>
              <p className="grid-subtext text-gray-400 text-sm sm:text-base">
                I have honed my skills in both frontend and backend dev, creating dynamic and responsive websites.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div
            ref={gridRef2}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col justify-between p-4 sm:p-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-[200px] object-contain mx-auto"
              loading="lazy"
              decoding="async"
            />
            <div className="mt-4">
              <p className="grid-headtext text-xl sm:text-2xl font-bold text-white mb-2">Tech Stack</p>
              <p className="grid-subtext text-gray-400 text-sm sm:text-base">
                I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
                applications
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div
            ref={gridRef3}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col p-4 sm:p-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="rounded-3xl w-full sm:h-[326px] h-[280px] flex justify-center items-center my-auto">
              <GlobeSection />
            </div>
            <div className="mt-4">
              <p className="grid-headtext text-xl sm:text-2xl font-bold text-white mb-2">
                I&apos;m very flexible with time zone communications &amp; locations
              </p>
              <p className="grid-subtext text-gray-400 text-sm sm:text-base">
                I&apos;m based in Rabat, Morocco and open to remote work worldwide.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div
            ref={gridRef4}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col md:flex-row items-center p-4 sm:p-6 gap-4 sm:gap-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full md:w-1/2 sm:h-[266px] h-[180px] object-contain"
              loading="lazy"
              decoding="async"
            />
            <div className="flex-1">
              <p className="grid-headtext text-xl sm:text-2xl font-bold text-white mb-2">My Passion for Coding</p>
              <p className="grid-subtext text-gray-400 text-sm sm:text-base">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div
            ref={gridRef5}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col justify-center p-4 sm:p-6 gap-4 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-[140px] object-cover sm:object-top rounded-lg"
              loading="lazy"
              decoding="async"
            />
            <div className="space-y-2 text-center">
              <p className="grid-subtext text-gray-400">Contact me</p>
              <div
                className="copy-container flex items-center justify-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={handleCopy}>
                <img
                  src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'}
                  alt="copy"
                  loading="lazy"
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                />
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-medium text-gray_gradient text-white break-all sm:break-normal">
                  {hasCopied ? 'Copied' : 'roussafifahd@gmail.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
