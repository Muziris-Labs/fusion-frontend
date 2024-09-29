import React from "react";

import SignupFooter from "@/components/ui/footer/SignupFooter";

const StepContainer = ({ title, description, children }) => {
  return (
    <div className="flex w-full flex-col z-10 px-4 sm:px-8 py-8 sm:w-[450px] rounded-xl ">
      <h2 className="font-semibold text-3xl dark:text-white">{title}</h2>

      <p className="mt-2 font-noto text-sm text-gray-600">{description}</p>

      {children}

      <SignupFooter />
    </div>
  );
};

export default StepContainer;
