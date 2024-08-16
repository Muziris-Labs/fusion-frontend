import React from "react";

import SignupFooter from "@/components/ui/footer/SignupFooter";

const StepContainer = ({ title, description, children }) => {
  return (
    <div className="flex flex-col z-10 sm:p-8 w-[450px] rounded-xl ">
      <h2 className="font-semibold text-3xl">{title}</h2>

      <p className="mt-2 font-noto text-sm text-gray-600">{description}</p>

      {children}

      <SignupFooter />
    </div>
  );
};

export default StepContainer;
