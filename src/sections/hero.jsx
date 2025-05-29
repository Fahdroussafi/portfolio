import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';

import Button from '../components/button.jsx';
import Cube from '../components/cube.jsx';
import { HackerRoom } from '../components/hacker-room.jsx';
import HeroCamera from '../components/hero-camera.jsx';
import CanvasLoader from '../components/loader.jsx';
import ReactLogo from '../components/react-logo.jsx';
import Rings from '../components/rings.jsx';
import Target from '../components/target.jsx';
import { calculateSizes } from '../constants/index.js';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <div className="flex flex-col items-center">
          <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
            Hello, I&apos;m Fahd<span className="waving-hand">👋</span>
          </p>
          <p className="hero_tag text-gray_gradient">Building Products</p>
        </div>
      </div>
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full mt-10">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0.1, -Math.PI, 0]} />
            </HeroCamera>
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Rings position={sizes.ringPosition} />
              <Cube position={sizes.cubePosition} />
            </group>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
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
