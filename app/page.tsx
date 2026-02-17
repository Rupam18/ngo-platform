import StickyHeader from "@/components/home/StickyHeader";
import HeroSlider from "@/components/home/HeroSlider";
import ImpactStats from "@/components/home/ImpactStats";
import KeyInitiatives from "@/components/home/KeyInitiatives";
import AboutRiso from "@/components/home/AboutRiso";
import VideoSection from "@/components/home/VideoSection";
import OurWork from "@/components/home/OurWork";
import EventsGallery from "@/components/home/EventsGallery";
import CTASection from "@/components/home/CTASection";
import CSRPartners from "@/components/home/CSRPartners";
import Footer from "@/components/home/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // Disable static caching for now

export default async function Home() {
  // Keeping prisma fetch in case we need it later or for other components, 
  // though currently unused in the visual list provided.
  // const campaigns = await prisma.campaign.findMany({
  //   take: 3,
  //   orderBy: { createdAt: "desc" },
  // });

  return (
    <main className="min-h-screen bg-white">
      <StickyHeader />
      <HeroSlider />
      <ImpactStats />
      <KeyInitiatives />
      <AboutRiso />
      <VideoSection />
      <OurWork />
      <EventsGallery />
      <CTASection />
      <CSRPartners />
      <Footer />
    </main>
  );
}
