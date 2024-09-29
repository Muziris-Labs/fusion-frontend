"use client";

import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";
import { toggleDeployDrawer } from "@/redux/slice/deploySlice";
import { Waypoints } from "lucide-react";
import { useDispatch } from "react-redux";
import SettingsChains from "../SettingsChains";

export default function Deployments() {
  const dispatch = useDispatch();
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
        <ThemeButton
          theme="View Deployments"
          onClick={() => {
            dispatch(toggleDeployDrawer());
          }}
          name="View Deployments"
        />
      </div>
    </SettingItem>
  );
}
