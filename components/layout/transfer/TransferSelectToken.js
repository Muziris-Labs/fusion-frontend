import React from "react";

import FusionCard from "@/components/ui/FusionCard";
import TokenSelector from "@/components/ui/TokenSelector";

const TransferSelectToken = () => {
  return (
    <FusionCard className="rounded-t-none px-6 py-8 shadow space-y-5">
      <div className="flex w-full items-center justify-center space-x-4 -mt-1">
        <div className="mt-2 h-0.5 w-full bg-gray-400"></div>

        <p className="mt-2 text-xs text-gray-600 whitespace-nowrap">
          Select Token
        </p>

        <div className="mt-2 h-0.5 w-full bg-gray-400"></div>
      </div>

      <TokenSelector index={0} className="mt-1" />
    </FusionCard>
  );
};

export default TransferSelectToken;
