import CampaignCard from "@/components/campaigns/CampaignCard";

interface Campaign {
    id: string;
    title: string;
    description: string;
    image: string;
    raisedAmount: number;
    goalAmount: number;
}

export default function FeaturedCampaigns({ campaigns }: { campaigns: Campaign[] }) {
    if (!campaigns || campaigns.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Featured Campaigns
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        <CampaignCard
                            key={campaign.id}
                            id={campaign.id}
                            title={campaign.title}
                            description={campaign.description}
                            image={campaign.image}
                            raised={campaign.raisedAmount}
                            goal={campaign.goalAmount}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
