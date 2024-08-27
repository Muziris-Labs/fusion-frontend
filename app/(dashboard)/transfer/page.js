import React from "react";
import TokenContainer from "@/components/layout/transfer/TokenContainer";
import TransferContainer from "@/components/layout/transfer/TransferContainer";
import DashboardCredit from "@/components/layout/dashboard/DashboardCredit";

const DashboardPage = () => {
  return (
    <section className="mt-5 max-w-4xl mx-auto space-y-5">
      <section className="flex gap-5 justify-center">
        <div className="gap-y-4 flex flex-col">
          <DashboardCredit />
          <TokenContainer />
        </div>
        <TransferContainer />
      </section>
    </section>
  );
};

export default DashboardPage;
