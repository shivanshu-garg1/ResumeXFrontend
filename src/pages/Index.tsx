import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <div id="features">
          <Features />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;