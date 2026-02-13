import CampaignCard from "@/components/campaigns/CampaignCard";

export default function CampaignsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
