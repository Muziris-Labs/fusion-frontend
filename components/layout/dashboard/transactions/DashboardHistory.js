import { ChevronRight } from "lucide-react";

import React from "react";
import Link from "next/link";

import DashboardTable from "./DashboardTable";

import FusionCard from "@/components/ui/FusionCard";

const DashboardHistory = () => {
  return (
    <FusionCard className="p-6">
      <div className="flex justify-between">
        <h2>Recent Payments</h2>

        <Link
          href="/transactions"
          className="rounded-full bg-gray-300 self-start p-2.5 transition-all select-none hover:bg-gray-400 active:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <ChevronRight size={20} />
        </Link>
      </div>

      <DashboardTable />
    </FusionCard>
  );
};

export default DashboardHistory;
