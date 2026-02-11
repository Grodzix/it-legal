import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SmoothAnchorScroll from "@/components/SmoothAnchorScroll";

const SplashScreen = dynamic(() => import("@/components/SplashScreen"));
const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection")
);
const SpecializationsSection = dynamic(
  () => import("@/components/SpecializationsSection")
);
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const KnowledgeBaseSection = dynamic(
  () => import("@/components/KnowledgeBaseSection")
);
const ContactSection = dynamic(() => import("@/components/ContactSection"));

export default function Home() {
  return (
    <>
      <SmoothAnchorScroll />
      <SplashScreen />
      <Header />
      <main id="main">
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
