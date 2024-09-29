import Deployments from "./SettingList/Deployments";
import NodeChanger from "./SettingList/NodeChanger";
import PasskeyChanger from "./SettingList/PasskeyChanger";
import ThemeChanger from "./SettingList/ThemeChanger";

export default function SettingsMain() {
  return (
    <div className="flex flex-col w-full gap-10">
      <h1 className="text-2xl font-normal mb-5 dark:text-white">Settings</h1>

      <ThemeChanger />
      <NodeChanger />
      <PasskeyChanger />
      <Deployments />
    </div>
  );
}
