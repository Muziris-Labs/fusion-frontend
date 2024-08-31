import React, { Suspense } from "react";

import NavBar from "@/components/navigation/NavBar";
import WalletProvider from "@/provider/WalletProvider";
import AuthModal from "@/components/modal/AuthModal";
import TxLoadModal from "@/components/modal/TxLoadModal";
import ChangePasskeyModal from "@/components/modal/ChangePasskeyModal";
import DeployModal from "@/components/modal/DeployModal";
import Image from "next/image";

export const metadata = {
  title: "Fusion Wallet",
  description: "Fusion Wallet : Zk-based Multi-Chain Smart Contract Wallet",
};

const DashboardLayout = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <Image
            src="/fusion-logo.svg"
            width={100}
            height={100}
            className="animate-ping"
          />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default DashboardLayout;
