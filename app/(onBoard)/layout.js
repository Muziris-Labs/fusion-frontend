import DesignSection from "@/components/layout/onBoard/DesignSection";
import MainSection from "@/components/layout/onBoard/MainSection";
import BackgroundAnimation from "@/components/ui/BackgroundAnimation";

export const metadata = {
  title: "Valerium | OnBoard",
  description: "Valerium - ZK-based Smart Contract Wallet | OnBoard Page",
};

const LoginLayout = ({ children }) => {
  return (
    <main className="h-screen w-screen flex bg-white font-noto">
      <BackgroundAnimation />

      <DesignSection />

      <MainSection>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[70%] flex gap-20">{children}</div>
        </div>
      </MainSection>
    </main>
  );
};

export default LoginLayout;
