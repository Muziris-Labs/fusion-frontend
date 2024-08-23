import React from "react";

import DashboardCredit from "./DashboardCredit";
import DashboardButtons from "./buttons/DashboardButtons";
import DashboardGraphContainer from "./graph/DashboardGraphContainer";
import DashboardProfile from "./DashboardProfile";

const Dashboard = () => {
  return (
    <section className="flex gap-5 justify-center">
      <div className="flex-1">
        <div className="h-full w-full flex flex-col gap-y-4">
          <DashboardCredit />
          <div className="space-y-1 flex-1 flex flex-col">
            <DashboardProfile />
            <DashboardButtons />
          </div>
        </div>
      </div>

      <DashboardGraphContainer />
    </section>
  );
};

export default Dashboard;
