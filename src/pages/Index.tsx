import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CabServices from "@/components/CabServices";
import TourPackages from "@/components/TourPackages";
import BookingForm from "@/components/BookingForm";
import AboutSection from "@/components/AboutSection";
import FleetSection from "@/components/FleetSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen overflow-x-hidden">
    <TopBar />
    <Navbar />
    <HeroSection />
    <CabServices />
    <TourPackages />
    <BookingForm />
    <AboutSection />
    <FleetSection />
    <StatsSection />
    <TestimonialsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
