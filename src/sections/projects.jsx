import { useGSAP } from '@gsap/react';
import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { lazy, Suspense, useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { TbArrowUpRight } from 'react-icons/tb';
import CanvasLoader from '../components/loader.jsx';
import { myProjects } from '../constants/index.js';
import { IfElse } from '../helper/IfElse.tsx';
import { useGsapHover } from '../hooks/use-gsap-hover';

// Lazy load the 3D computer model
const DemoComputer = lazy(() => import('../components/demo-computer.jsx'));

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const isTouch = isTouchDevice();
  const leftArrowRef = useGsapHover(isTouch ? {} : { scale: 1.15, rotation: -10, duration: 0.3 });
  const rightArrowRef = useGsapHover(isTouch ? {} : { scale: 1.15, rotation: 10, duration: 0.3 });

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20">
      <p className="head-text">My Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" loading="lazy" />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-xl sm:text-2xl font-semibold animatedText">{currentProject.title}</p>
            <p className="animatedText text-sm sm:text-base">{currentProject.desc}</p>
            <p className="animatedText text-sm sm:text-base">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} loading="lazy" />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.live ? currentProject.href : ''}
              target="_blank"
              rel="noreferrer">
              <p>
                <IfElse condition={currentProject.live}>
                  <div className="flex items-center gap-2">
                    <span>Check Live Site</span>
                    <TbArrowUpRight className="size-4 text-white" />
                  </div>
                  <span>Coming Soon</span>
                </IfElse>
              </p>
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              ref={leftArrowRef}
              className="arrow-btn hover-glow"
              onClick={() => handleNavigation('previous')}
              aria-label="Previous project">
              <FaArrowLeft className="text-white" />
            </button>
            <button
              ref={rightArrowRef}
              className="arrow-btn hover-glow"
              onClick={() => handleNavigation('next')}
              aria-label="Next project">
              <FaArrowRight className="text-white" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full min-h-[300px]">
          <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
