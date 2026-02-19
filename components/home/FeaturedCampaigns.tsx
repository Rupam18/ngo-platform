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
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                        Get Involved
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
                        Featured <span className="text-yellow-500">Campaigns</span>
                    </h2>
                    <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
                        Supporting education, environment, and empowerment through impactful community-driven programs.
                    </p>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
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
