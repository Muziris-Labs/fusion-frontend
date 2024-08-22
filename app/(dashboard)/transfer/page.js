import React from "react";

import FusionCard from "@/components/ui/FusionCard";
import FusionInput from "@/components/ui/FusionInput";
import TransferStepper from "@/components/layout/transfer/TransferStepper";
import TransferSteps from "@/components/layout/transfer/TransferSteps";

const DashboardPage = () => {
  return (
    <div className="mt-12 max-w-xl mx-auto space-y-2">
      <FusionCard className="rounded-b-none p-6 shadow space-y-3 text-center">
        <h2 className="font-semibold">Transfer Token</h2>

        <TransferStepper />
      </FusionCard>

      <FusionCard className="rounded-t-none px-6 py-8 shadow">
        <TransferSteps />
      </FusionCard>
    </div>
  );
};

export default DashboardPage;
