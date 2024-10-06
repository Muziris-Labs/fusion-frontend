import SettingItem from "@/components/ui/SettingItem";
import { Waypoints } from "lucide-react";
import SettingsChains from "../SettingsChains";

export default function Deployments() {
  return (
    <SettingItem
      title="Deployments"
      description="
       Manage your deployments and view their status
      "
      icon={<Waypoints size={22} className="mt-1 dark:invert" />}
      isLast
    >
      <div className="flex items-center gap-10">
        <SettingsChains />
      </div>
    </SettingItem>
  );
}
