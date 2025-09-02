"use client";
import TopBar from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import ExampleSection from "@/components/home/ExampleSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main>
      <TopBar />
      <HeroSection />
      <IntroSection />
      <ExampleSection />
      <CTASection />
      <Footer />
    </main>
  );
}
