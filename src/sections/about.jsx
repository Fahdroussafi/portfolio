import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/button.jsx';
import { useGsapHover } from '../hooks/use-gsap-hover';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Enhanced hover effects
  const gridRef1 = useGsapHover({ scale: 1.05, y: -10, duration: 0.4, ease: 'back.out(1.7)' });
  const gridRef2 = useGsapHover({ scale: 1.05, y: -10, duration: 0.4, ease: 'back.out(1.7)' });
  const gridRef3 = useGsapHover({ scale: 1.05, y: -10, duration: 0.4, ease: 'back.out(1.7)' });
  const gridRef4 = useGsapHover({ scale: 1.05, y: -10, duration: 0.4, ease: 'back.out(1.7)' });
  const gridRef5 = useGsapHover({ scale: 1.05, y: -10, duration: 0.4, ease: 'back.out(1.7)' });

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
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const handleCopy = () => {
    navigator.clipboard.writeText('roussafifahd@gmail.com');
    setHasCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setHasCopied(false);
      timeoutRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const labelsData = useMemo(() => [{ lat: 40, lng: -100, text: 'Rabat, Morocco', color: 'white', size: 15 }], []);

  return (
    <section className="c-space my-20" id="about" ref={containerRef}>
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div
            ref={gridRef1}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col justify-between p-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain mx-auto"
              loading="lazy"
            />

            <div className="mt-4">
              <p className="grid-headtext text-2xl font-bold text-white mb-2">Hi, I&apos;m Fahd Roussafi</p>
              <p className="grid-subtext text-gray-400 text-base">
                I have honed my skills in both frontend and backend dev, creating dynamic and responsive websites.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div
            ref={gridRef2}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col justify-between p-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain mx-auto"
              loading="lazy"
            />

            <div className="mt-4">
              <p className="grid-headtext text-2xl font-bold text-white mb-2">Tech Stack</p>
              <p className="grid-subtext text-gray-400 text-base">
                I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
                applications
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div
            ref={gridRef3}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col p-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center my-auto">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={labelsData}
              />
            </div>
            <div className="mt-4">
              <p className="grid-headtext text-2xl font-bold text-white mb-2">
                I&apos;m very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext text-gray-400 text-base">
                I&apos;m based in Rabat, Morocco and open to remote work worldwide.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div
            ref={gridRef4}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col md:flex-row items-center p-6 gap-6 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full md:w-1/2 sm:h-[266px] h-fit object-contain"
              loading="lazy"
            />

            <div className="flex-1">
              <p className="grid-headtext text-2xl font-bold text-white mb-2">My Passion for Coding</p>
              <p className="grid-subtext text-gray-400 text-base">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div
            ref={gridRef5}
            className="grid-container hover-glow border border-black-300 bg-black-200 rounded-3xl h-full flex flex-col justify-center p-6 gap-4 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top rounded-lg"
              loading="lazy"
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
                  className="w-6 h-6"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
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
