import React from "react";

import NavBar from "@/components/navigation/NavBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="relative m-4 z-10">
      <NavBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
