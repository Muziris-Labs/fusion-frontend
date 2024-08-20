import { ChevronRight } from "lucide-react";

import React from "react";
import Link from "next/link";

import DashboardGraph from "./DashboardGraph";
import FusionCard from "@/components/ui/FusionCard";

const DashboardGraphContainer = () => {
  const percentage = 34;

  return (
    <FusionCard>
      <div className="flex justify-between p-6">
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

      <DashboardGraph />
    </FusionCard>
  );
};

export default DashboardGraphContainer;
