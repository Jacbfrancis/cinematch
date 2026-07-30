import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import PopularMatches from "../components/PopularMatches";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PopularMatches />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
