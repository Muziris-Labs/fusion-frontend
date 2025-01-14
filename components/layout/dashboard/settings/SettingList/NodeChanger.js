"use client";

import { GitBranch } from "lucide-react";
import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";
import config from "@/lib/config";

export default function NodeChanger() {
  const node = config.chains[0].isMainnet ? "Mainnet" : "Testnet";

  return (
    <SettingItem
      title="Change Node type"
      description="
      Change the Wallet node type to Mainnet or Testnet. Mainnet is where real transactions are made, while Testnet is for testing purposes.
      "
      icon={<GitBranch size={22} className="mt-1 dark:invert" />}
    >
      <div className="flex items-center">
        <ThemeButton
          theme={node}
          onClick={() => {
            if (node === "Mainnet") return;
            window.open("https://app.getfusion.tech", "_blank");
          }}
          name="Mainnet"
        />
        <ThemeButton
          theme={node}
          onClick={() => {
            if (node === "Testnet") return;
            window.open("https://testnet.getfusion.tech", "_blank");
          }}
          name="Testnet"
        />
      </div>
    </SettingItem>
  );
}
