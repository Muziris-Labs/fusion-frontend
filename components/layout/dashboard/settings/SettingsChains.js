"use client";

import config from "@/lib/config";
import SettingChainsItem from "./SettingChainsItem";

const SettingsChains = () => {
  return (
    <div className="flex items-center justify-center -space-x-4">
      {config.chains.map((chain, index) => (
        <SettingChainsItem key={index} chain={chain} />
      ))}
    </div>
  );
};

export default SettingsChains;
