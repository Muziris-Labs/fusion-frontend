import React from "react";

import NavBar from "@/components/navigation/NavBar";
import WalletProvider from "@/provider/WalletProvider";

const DashboardLayout = ({ children }) => {
  return (
    <WalletProvider>
      <div className="relative m-4 z-10">
        <NavBar />
        {children}
      </div>
    </WalletProvider>
  );
};

export default DashboardLayout;
