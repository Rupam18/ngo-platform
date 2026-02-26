import { prisma } from "@/lib/prisma";
import StickyHeader from "@/components/home/StickyHeader";
import Footer from "@/components/home/Footer";
import CampaignDetailsClient from "./CampaignDetailsClient";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const campaign = await prisma.campaign.findUnique({
        where: { id: resolvedParams.id },
        include: {
            donations: {
                where: { status: "SUCCESS" }
            }
        }
    });

    if (!campaign) {
        notFound();
    }

    const raisedAmount = campaign.donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
    const progress = (raisedAmount / campaign.goal) * 100;

    return (
        <main className="min-h-screen flex flex-col bg-gray-50/50">
            <StickyHeader />
            <section className="flex-grow py-12">
                <CampaignDetailsClient
                    campaign={campaign}
                    progress={progress}
                    raisedAmount={raisedAmount}
                />
            </section>
            <Footer />
        </main>
    );
}
