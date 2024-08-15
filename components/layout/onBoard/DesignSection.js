import Image from "next/image";
import Alpha from "@/components/ui/Alpha";

const DesignSection = () => {
  return (
    <section
      className="bg-gray-100 flex w-4/12 flex-col justify-between bg-cover p-12 relative overflow-hidden"
      style={{
        backgroundImage: "url(/backgrounds/background-grid.svg)",
        backgroundSize: "cover",
        backgroundPosition: "start",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center space-x-1">
        <Image
          width={44}
          height={44}
          src="/fusion-logo.svg"
          alt="Fusion Logo"
        />

        <span className="text-2xl tracking-wide"> Fusion</span>
      </div>

      <div className="-translate-x-3 translate-y-5">
        <Alpha size="text-sm" />
      </div>
    </section>
  );
};

export default DesignSection;
