import DesignSection from "@/components/layout/onBoard/DesignSection";
import MainSection from "@/components/layout/onBoard/MainSection";
import { Suspense } from "react";
import Image from "next/image";

export const metadata = {
  title: "Fusion | Onboard",
  description: "Fusion Wallet : Zk-based Multi-Chain Smart Contract Wallet",
};

const LoginLayout = ({ children }) => {
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
      <main className="relative h-screen w-screen flex bg-white font-noto z-10">
        <DesignSection />

        <MainSection>
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-fit sm:w-[80%] h-full justify-center flex flex-col lg:items-start items-center">
              {children}
            </div>
          </div>
        </MainSection>
      </main>
    </Suspense>
  );
};

export default LoginLayout;
