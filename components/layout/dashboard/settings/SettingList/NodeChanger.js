"use client";

import { GitBranch } from "lucide-react";
import { useState } from "react";
import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";

export default function NodeChanger() {
  const [node, setNode] = useState("Testnet");
  return (
    <SettingItem
      title="Change Node type"
      description="
      Change the Wallet node type to Mainnet or Testnet. Mainnet is where real transactions are made, while Testnet is for testing purposes.
      "
      icon={<GitBranch size={22} className="mt-1 dark:invert" />}
    >
      <div className="flex items-center">
        <ThemeButton theme={node} onClick={() => {}} name="Mainnet" />
        <ThemeButton theme={node} onClick={() => {}} name="Testnet" />
      </div>
    </SettingItem>
  );
}
