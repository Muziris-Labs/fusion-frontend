import React from "react";

import NavBar from "@/components/navigation/NavBar";
import WalletProvider from "@/provider/WalletProvider";
import AuthModal from "@/components/modal/AuthModal";

const DashboardLayout = ({ children }) => {
  return (
    <WalletProvider>
      <AuthModal />
      <div className="relative p-4 z-10 min-h-screen">
        <NavBar />
        {children}
      </div>
    </WalletProvider>
  );
};

export default DashboardLayout;
