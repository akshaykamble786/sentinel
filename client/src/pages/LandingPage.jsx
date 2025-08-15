import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Pricing from "@/components/Pricing";
import Security from "@/components/Security";
import Faq from "@/components/Faq"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <Features />
      <Security />  
      <Faq />
      <Pricing />
      <Footer />
    </div>
  );
}
