import { SpeedInsights } from '@vercel/speed-insights/react';
import { lazy, Suspense } from 'react';

import MouseFollower from './components/mouse-follower';
import Hero from './sections/hero';
import Navbar from './sections/navbar';

const About = lazy(() => import('./sections/about'));
const Footer = lazy(() => import('./sections/footer'));
const Projects = lazy(() => import('./sections/projects'));
const WorkExperience = lazy(() => import('./sections/experience'));
const Contact = lazy(() => import('./sections/contact'));

function App() {
  return (
    <main className="max-w-7xl mx-auto relative">
      <MouseFollower />
      <Navbar />
      <Hero />

      <Suspense fallback={<div>Loading content...</div>}>
        <About />
        <WorkExperience />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
      <SpeedInsights />
    </main>
  );
}

export default App;
