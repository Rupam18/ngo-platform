import StickyHeader from "@/components/home/StickyHeader";
import HeroSlider from "@/components/home/HeroSlider";
import ImpactAreas from "@/components/home/ImpactAreas";
import ImpactStats from "@/components/home/ImpactStats";
import KeyInitiatives from "@/components/home/KeyInitiatives";
import AboutRiso from "@/components/home/AboutRiso";
import VideoSection from "@/components/home/VideoSection";
import OurWork from "@/components/home/OurWork";
import SustainableGoalsSection from "@/components/home/SustainableGoalsSection";
import LatestUpdates from "@/components/home/LatestUpdates";
import ImpactStories from "@/components/home/ImpactStories";
import EventsGallery from "@/components/home/EventsGallery";
import CTASection from "@/components/home/CTASection";
import CSRPartners from "@/components/home/CSRPartners";
import Footer from "@/components/home/Footer";
import FeaturedCampaigns from "@/components/home/FeaturedCampaigns";

export const revalidate = 0; // Disable static caching for now

export default async function Home() {
  let activeCampaigns: any[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const res = await fetch(`${baseUrl}/campaign`, { cache: 'no-store' });
    const json = await res.json();

    if (json.success) {
      activeCampaigns = json.data
        .filter((c: any) => c.status === 'ACTIVE')
        .slice(0, 3);
    }
  } catch (error) {
    console.error("Failed to fetch featured campaigns:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <StickyHeader />
      <HeroSlider />
      <FeaturedCampaigns campaigns={activeCampaigns} />
      <div className="mt-16">
        <AboutRiso />
      </div>
      <ImpactStats />
      <ImpactAreas />
      <KeyInitiatives />
      <SustainableGoalsSection />
      <LatestUpdates />
      <ImpactStories />
      <CTASection />
      <CSRPartners />
      <Footer />
    </main>
  );
}
