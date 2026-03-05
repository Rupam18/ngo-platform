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
    const { prisma } = await import("@/lib/prisma");
    const dbCampaigns = await prisma.campaign.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        _count: { select: { donations: true } },
        donations: true
      }
    });

    // Map them to the component's expected format just to be safe with image types
    activeCampaigns = dbCampaigns.map(c => ({
      ...c,
      image: c.coverImage
    }));
  } catch (error) {
    console.error("Failed to fetch featured campaigns from DB:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <StickyHeader />
      <HeroSlider />
      <AboutRiso />
      <FeaturedCampaigns campaigns={activeCampaigns} />
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
