import Hero from "@/components/home/Hero";
import ImpactStats from "@/components/home/ImpactStats";
import FeaturedCampaigns from "@/components/home/FeaturedCampaigns";
import { prisma } from "@/lib/prisma";
import Banner from "@/components/home/Banner";
import About from "@/components/home/About";
import OurWings from "@/components/home/OurWings";
import Events from "@/components/home/Events";
import Partners from "@/components/home/Partners";


export const revalidate = 0; // Disable static caching for now

export default async function Home() {
  const campaigns = await prisma.campaign.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Banner />
      <Hero />
      <About />
      <OurWings />
      <ImpactStats />
      <FeaturedCampaigns campaigns={campaigns} />
      <Events />
      <Partners />
    </main>
  );
}
