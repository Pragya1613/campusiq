import PublicLayout from "../layouts/PublicLayout";

import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ResumePreviewSection from "../components/home/ResumePreviewSection";

import Footer from "../components/home/Footer";

function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ResumePreviewSection />
      <Footer />
    </PublicLayout>
  );
}

export default HomePage;