"use client";

// Force editor re-check
import { Campaign } from "@prisma/client";
import CampaignCard from "@/components/campaigns/CampaignCard";

interface FeaturedCampaignsProps {
    campaigns: Campaign[];
}

export default function FeaturedCampaigns({ campaigns }: FeaturedCampaignsProps) {
    return (
        <section className="w-full py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Our Key Initiatives
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Supporting education, environment, and empowerment through impactful community-driven programs.
                    </p>
                </div>

                {/* Campaign Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {campaigns.length > 0 ? (
                        campaigns.map((campaign) => (
                            <CampaignCard
                                key={campaign.id}
                                id={campaign.id}
                                title={campaign.title}
                                description={campaign.description}
                                image={campaign.image}
                                raised={campaign.raisedAmount}
                                goal={campaign.goalAmount}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No active campaigns at the moment.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
