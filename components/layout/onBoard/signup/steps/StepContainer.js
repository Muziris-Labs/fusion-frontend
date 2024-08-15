import React from "react";

import SignupFooter from "@/components/ui/footer/SignupFooter";

const StepContainer = ({ title, description, children }) => {
  return (
    <div className="flex flex-col z-10">
      <h2 className="font-gloock text-4xl">{title}</h2>

      <p className="mt-2 font-noto text-sm text-gray-600">{description}</p>

      {children}

      <SignupFooter />
    </div>
  );
};

export default StepContainer;
