import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import KnowledgeBaseSection from "@/components/KnowledgeBaseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <AboutSection />
        <SpecializationsSection />
        <TestimonialsSection />
        <PricingSection />
        <KnowledgeBaseSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
