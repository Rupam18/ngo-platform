"use client";

import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function CampaignDetails() {
  const params = useParams();

  // Temporary static data (later from DB)
  const campaign = {
    title: "Help Children Education",
    description:
      "This campaign supports education for underprivileged children by providing books, school supplies, and scholarships.",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350",
    raised: 50000,
    goal: 100000,
  };

  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">{campaign.title}</h1>

      <p className="text-gray-600 mt-4">{campaign.description}</p>

      <div className="mt-6">
        <Progress value={progress} />
        <p className="mt-2 text-sm">
          ₹{campaign.raised} raised of ₹{campaign.goal}
        </p>
      </div>

      <Button className="mt-6 px-8 py-3 text-lg">
        Donate Now
      </Button>
    </div>
  );
}
