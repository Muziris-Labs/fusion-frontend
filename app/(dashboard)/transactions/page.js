import React from "react";

import FusionCard from "@/components/ui/FusionCard";
import DashboardTable from "@/components/layout/dashboard/transactions/DashboardTable";

const TransactionsPage = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-2">
      <FusionCard className="rounded-b-none p-6 shadow space-y-3 text-center">
        Your Transactions
      </FusionCard>

      <FusionCard className="rounded-t-none px-6 shadow text-center">
        <DashboardTable />
      </FusionCard>
    </div>
  );
};

export default TransactionsPage;
