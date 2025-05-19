import About from './sections/about';
import Footer from './sections/footer';
import Hero from './sections/hero';
import Navbar from './sections/navbar';
import Projects from './sections/projects';
import WorkExperience from './sections/experience';
import Contact from './sections/contact';

function App() {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero />
      <About />
      <WorkExperience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
