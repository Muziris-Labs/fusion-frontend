import React from "react";

import DashboardGraph from "./DashboardGraph";

import DashboardCredit from "./DashboardCredit";
import DashboardButtons from "./DashboardButtons";

const Dashboard = () => {
  return (
    <section className="flex gap-5 justify-center">
      <div className="space-y-2">
        <DashboardCredit />
        <DashboardButtons />
      </div>

      <DashboardGraph />
    </section>
  );
};

export default Dashboard;
