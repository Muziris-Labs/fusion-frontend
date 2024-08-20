import React from "react";

import SendButton from "./SendButton";
import ReceiveButton from "./ReceiveButton";

import FusionCard from "@/components/ui/FusionCard";

const DashboardButtons = () => {
  return (
    <FusionCard className="flex justify-between p-0 px-0 py-0 rounded-t-none overflow-hidden">
      <SendButton />
      <ReceiveButton />
    </FusionCard>
  );
};

export default DashboardButtons;
