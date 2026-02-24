import CampaignCard from "@/components/campaigns/CampaignCard";

export const revalidate = 0;

export default async function CampaignsPage() {
  let campaigns: any[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const res = await fetch(`${baseUrl}/campaign`, { cache: 'no-store' });
    const json = await res.json();

    if (json.success) {
      campaigns = json.data;
    }
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
  }

  const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE');

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">Our Campaigns</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore our active campaigns and make a difference today. Every contribution counts towards a better future.</p>
      </div>

      {activeCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeCampaigns.map((campaign: any) => {
            const raisedAmount = campaign.donations?.reduce((sum: number, d: any) => sum + d.amount, 0) || 0;
            return (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                description={campaign.description || "A wonderful campaign to support."}
                image={campaign.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"}
                raised={raisedAmount}
                goal={campaign.goal}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No active campaigns</h3>
          <p className="text-gray-500">There are currently no active campaigns available. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
