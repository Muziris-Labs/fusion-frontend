import React from "react";

import ReceiveQRContainer from "@/components/layout/dashboard/receive/ReceiveQRContainer";
import TokenContainer from "@/components/layout/transfer/TokenContainer";

const ReceivePage = () => {
  return (
    <div className="mt-5 max-w-4xl mx-auto space-y-2">
      <div className="flex gap-5">
        <div className="w-1/2 space-y-5">
          <TokenContainer height="h-[474px]" selectable={false} />
        </div>

        <div className="w-1/2">
          <ReceiveQRContainer />
        </div>
      </div>
    </div>
  );
};

export default ReceivePage;
