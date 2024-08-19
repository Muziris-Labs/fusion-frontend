import { ChevronRight } from "lucide-react";

import React from "react";
import Link from "next/link";

import FusionCard from "@/components/ui/FusionCard";

const DashboardCredit = () => {
  const price = 100;
  const token = "USDT";
  const InDollarPrice = price * 1;

  return (
    <FusionCard className="flex justify-between rounded-b-none">
      <div className="space-y-2">
        <h2>Active Credit</h2>

        <div>
          <p className="text-4xl font-semibold">
            {price.toFixed(1)}{" "}
            <span className="uppercase text-2xl font-normal">{token}</span>
          </p>

          <p className="text-sm text-gray-700">$ {InDollarPrice.toFixed(2)}</p>
        </div>
      </div>

      <Link
        href="/profile"
        className="rounded-full bg-gray-300 self-start p-2.5 transition-all select-none hover:bg-gray-400 active:bg-gray-400/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <ChevronRight size={20} />
      </Link>
    </FusionCard>
  );
};

export default DashboardCredit;
