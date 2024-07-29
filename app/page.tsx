"use client";

import { navItems } from "@/data";

import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home = () => {
  return (
    <div className="mx-auto sm:px-10 px-5">
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden">
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={navItems} />
          <Hero />
          <Grid />
          <RecentProjects />
          <Experience />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
