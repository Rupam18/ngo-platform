"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CampaignCardProps {
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
}

export default function CampaignCard({
  title,
  description,
  image,
  raised,
  goal,
}: CampaignCardProps) {
  const progress = (raised / goal) * 100;

  return (
    <Card className="overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-sm text-gray-600 mt-2">
          {description}
        </p>

        <div className="mt-4">
          <Progress value={progress} />
          <p className="text-sm mt-2">
            ₹{raised} raised of ₹{goal}
          </p>
        </div>

        <Button className="w-full mt-4">
          Donate Now
        </Button>
      </div>
    </Card>
  );
}
