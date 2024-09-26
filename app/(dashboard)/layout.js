import React, { Suspense } from "react";

import NavBar from "@/components/navigation/NavBar";
import WalletProvider from "@/provider/WalletProvider";
import AuthModal from "@/components/modal/AuthModal";
import TxLoadModal from "@/components/modal/TxLoadModal";
import ChangePasskeyModal from "@/components/modal/ChangePasskeyModal";
import DeployModal from "@/components/modal/DeployModal";
import Image from "next/image";
import TopBar from "@/components/layout/dashboard/TopBar";
import FusionHolder from "@/components/ui/FusionHolder";

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
        <div className="relative flex min-h-screen">
          <NavBar />
          <div className="flex-1 px-20">
            <div className="flex flex-col h-full w-full relative">
              <TopBar />
              <FusionHolder>{children}</FusionHolder>
            </div>
          </div>
        </div>
      </WalletProvider>
    </Suspense>
  );
};

export default DashboardLayout;
