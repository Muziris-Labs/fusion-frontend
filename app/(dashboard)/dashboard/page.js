import React from "react";

import Dashboard from "@/components/layout/dashboard/Dashboard";
import DashboardHistory from "@/components/layout/dashboard/transactions/DashboardHistory";

const DashboardPage = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-5">
      <Dashboard />
      <DashboardHistory />
    </div>
  );
};

export default DashboardPage;
