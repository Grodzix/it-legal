import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import PricingSection from "@/components/PricingSection";
import KnowledgeBaseSection from "@/components/KnowledgeBaseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <AboutSection />
        <TestimonialsSection />
        <SpecializationsSection />
        <PricingSection />
        <KnowledgeBaseSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
