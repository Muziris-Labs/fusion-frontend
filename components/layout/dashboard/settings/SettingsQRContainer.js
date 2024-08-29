import React from "react";

import SettingsProfile from "./SettingsProfile";
import Image from "next/image";

import FusionCard from "@/components/ui/FusionCard";

const SettingsQRContainer = () => {
  return (
    <FusionCard className="p-6 shadow text-center flex flex-col gap-3 items-center overflow-hidden relative">
      <Image
        src="/fusion-logo.svg"
        alt="Settings"
        width={400}
        height={400}
        className="absolute -top-1/3 -right-1/3 opacity-5 z-0"
      />
      <SettingsProfile />
    </FusionCard>
  );
};

export default SettingsQRContainer;
