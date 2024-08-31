"use client";

import { Tooltip } from "@material-tailwind/react";

const FusionTooltip = ({ label }) => {
  return (
    <Tooltip
      className="bg-white"
      content={
        <div>
          <p className="text-sm text-gray-900">{label}</p>
        </div>
      }
    >
      {label.length > 10 ? label.slice(0, 10) + "..." : label}
    </Tooltip>
  );
};

export default FusionTooltip;
