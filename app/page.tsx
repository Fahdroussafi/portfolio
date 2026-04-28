import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { PortfolioSection } from "@/components/portfolio-section";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ServicesSection } from "@/components/services-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ExperienceSection />
      <PortfolioSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
