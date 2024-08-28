import React from "react";

import FusionCard from "@/components/ui/FusionCard";
import DashboardTable from "@/components/layout/dashboard/transactions/DashboardTable";
import DashboardCredit from "@/components/layout/dashboard/DashboardCredit";
import { ArrowUpDown } from "lucide-react";

const TransactionsPage = () => {
  return (
    <div className="mt-5 max-w-4xl mx-auto space-y-5 mb-5">
      <section className="flex gap-5 justify-center ">
        <div className="flex-1">
          <FusionCard className="p-6 shadow h-full relative overflow-hidden">
            <h2 className="text-4xl font-semibold flex justify-start">
              Transactions
            </h2>
            <p className="text-gray-500 text-">
              View 10 of your most recent transactions
            </p>

            <ArrowUpDown
              size={180}
              className="absolute -right-5 -bottom-5 opacity-10 rotate-45"
            />
          </FusionCard>
        </div>
        <div className="flex-1">
          <DashboardCredit />
        </div>
      </section>
      <FusionCard className="p-6 shadow text-center">
        <DashboardTable size={10} />
      </FusionCard>
    </div>
  );
};

export default TransactionsPage;
