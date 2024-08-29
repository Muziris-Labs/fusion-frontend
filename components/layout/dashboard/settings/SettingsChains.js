"use client";

import SettingChainsItem from "./SettingChainsItem";

const SettingsChains = () => {
  return (
    <div className="flex items-center -space-x-4">
      {["", "", ""].map((chain, index) => (
        <SettingChainsItem key={index} chain={chain} />
      ))}
    </div>
  );
};

export default SettingsChains;
