import React from "react";

import NavBar from "@/components/navigation/NavBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="relative p-4 z-10 min-h-screen">
      <NavBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
