import { ChevronRight } from "lucide-react";

import React from "react";
import Link from "next/link";

import FusionCard from "@/components/ui/FusionCard";

const DashboardGraph = () => {
  const percentage = 34;

  return (
    <FusionCard>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h2>Ethereum Graph</h2>

          <p className="text-2xl font-semibold">
            <span className="text-4xl">{percentage}</span>%
          </p>
        </div>

        <Link
          href="/profile"
          className="rounded-full bg-gray-300 self-start p-2.5 transition-all select-none hover:bg-gray-400 active:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <ChevronRight size={20} />
        </Link>
      </div>
    </FusionCard>
  );
};

export default DashboardGraph;
