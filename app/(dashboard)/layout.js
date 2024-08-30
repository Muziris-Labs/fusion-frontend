import React from "react";

import NavBar from "@/components/navigation/NavBar";
import WalletProvider from "@/provider/WalletProvider";
import AuthModal from "@/components/modal/AuthModal";
import TxLoadModal from "@/components/modal/TxLoadModal";
import ChangePasskeyModal from "@/components/modal/ChangePasskeyModal";
import DeployModal from "@/components/modal/DeployModal";

const DashboardLayout = ({ children }) => {
  return (
    <WalletProvider>
      <ChangePasskeyModal />
      <DeployModal />
      <AuthModal />
      <TxLoadModal />
      <div className="relative p-4 z-10 min-h-screen">
        <NavBar />
        {children}
      </div>
    </WalletProvider>
  );
};

export default DashboardLayout;
