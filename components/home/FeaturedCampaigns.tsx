import CampaignCard from "@/components/campaigns/CampaignCard";

export default function FeaturedCampaigns() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Campaigns
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CampaignCard
            title="Help Children Education"
            description="Support education for underprivileged children."
            image="https://images.unsplash.com/photo-1588072432836-e10032774350"
            raised={50000}
            goal={100000}
          />

          <CampaignCard
            title="Tree Plantation Drive"
            description="Join us in making the earth greener."
            image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            raised={30000}
            goal={80000}
          />

          <CampaignCard
            title="Food for Needy Families"
            description="Help provide meals to struggling families."
            image="https://images.unsplash.com/photo-1469571486292-b5360101037e"
            raised={20000}
            goal={60000}
          />
        </div>
      </div>
    </section>
  );
}
