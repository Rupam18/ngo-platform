
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
}

export default function CampaignCard({
  id,
  title,
  description,
  image,
  raised,
  goal,
}: CampaignCardProps) {
  const progress = (raised / goal) * 100;

  return (
    <Card className="overflow-hidden bg-white shadow-md rounded-xl">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm mt-2 text-gray-700">
            <span className="font-bold text-blue-600">₹{raised.toLocaleString("en-IN")}</span> raised of ₹{goal.toLocaleString("en-IN")}
          </p>
        </div>

        <Link href={`/campaigns/${id}`}>
          <Button variant="primary" className="w-full mt-4">
            Donate Now
          </Button>
        </Link>
      </div>
    </Card>
  );
}
