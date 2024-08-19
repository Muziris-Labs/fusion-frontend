import React from "react";

import NavBar from "@/components/navigation/NavBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="m-4">
      <NavBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
