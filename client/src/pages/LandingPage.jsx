import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Features />
      <Footer />
    </div>
  );
}
