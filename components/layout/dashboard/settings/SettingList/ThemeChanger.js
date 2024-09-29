"use client";

import { Moon } from "lucide-react";
import { useState } from "react";
import SettingItem from "@/components/ui/SettingItem";
import ThemeButton from "@/components/ui/ThemeButton";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  return (
    <SettingItem
      title="Theme"
      description="Change the theme of the dashboard"
      icon={<Moon size={22} className="mt-1 dark:invert" />}
    >
      <div className="flex items-center">
        <ThemeButton
          theme={theme}
          onClick={() => {
            setTheme("system");
          }}
          name="system"
        />
        <ThemeButton
          theme={theme}
          onClick={() => {
            setTheme("light");
          }}
          name="light"
        />
        <ThemeButton
          theme={theme}
          onClick={() => {
            setTheme("dark");
          }}
          name="dark"
        />
      </div>
    </SettingItem>
  );
}
