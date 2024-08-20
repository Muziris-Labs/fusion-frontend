import React from "react";

import DashboardCredit from "./DashboardCredit";
import DashboardButtons from "./buttons/DashboardButtons";
import DashboardGraphContainer from "./graph/DashboardGraphContainer";

const Dashboard = () => {
  return (
    <section className="flex gap-5 justify-center">
      <div className="space-y-2 flex-1">
        <DashboardCredit />
        <DashboardButtons />
      </div>

      <DashboardGraphContainer />
    </section>
  );
};

export default Dashboard;
