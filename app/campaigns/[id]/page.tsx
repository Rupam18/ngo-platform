import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                <Link href="/">
                    <Button variant="outline" className="mb-6">← Back to Campaigns</Button>
                </Link>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <img
                        src={(campaign as any).image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"}
                        alt={campaign.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="p-8">
                        <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>

                        <div className="mb-6">
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-gray-600">
                                <span>Raised: <span className="font-bold text-black">₹{raisedAmount.toLocaleString('en-IN')}</span></span>
                                <span>Goal: <span className="font-bold text-black">₹{campaign.goal.toLocaleString('en-IN')}</span></span>
                            </div>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                            {(campaign as any).description || "A wonderful campaign to support."}
                        </p>

                        <Button className="w-full py-6 text-xl bg-blue-600 hover:bg-blue-700">
                            Donate Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
