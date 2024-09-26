"use client";

import { Moon } from "lucide-react";
import { useState } from "react";
import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";

export default function ThemeChanger() {
  const [theme, setTheme] = useState("Light");
  return (
    <SettingItem
      title="Theme"
      description="Change the theme of the dashboard"
      icon={<Moon size={22} className="mt-1" />}
    >
      <div className="flex items-center">
        <ThemeButton theme={theme} onClick={() => {}} name="System" />
        <ThemeButton theme={theme} onClick={() => {}} name="Light" />
        <ThemeButton theme={theme} onClick={() => {}} name="Dark" />
      </div>
    </SettingItem>
  );
}
