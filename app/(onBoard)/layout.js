import DesignSection from "@/components/layout/onBoard/DesignSection";
import MainSection from "@/components/layout/onBoard/MainSection";

export const metadata = {
  title: "Onboard | Fusion",
  description: "Fusion Wallet : Zk-based Multi-Chain Smart Contract Wallet",
};

const LoginLayout = ({ children }) => {
  return (
    <main className="h-screen w-screen flex bg-white font-noto">
      <DesignSection />

      <MainSection>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-fit sm:w-[80%] h-full justify-center flex flex-col lg:items-start items-center">
            {children}
          </div>
        </div>
      </MainSection>
    </main>
  );
};

export default LoginLayout;
