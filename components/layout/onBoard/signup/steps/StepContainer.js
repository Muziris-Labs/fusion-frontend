import React from "react";

import SignupFooter from "@/components/ui/footer/SignupFooter";

const StepContainer = ({ title, description, children }) => {
  return (
    <div className="flex flex-col z-10 px-4 sm:px-8 py-8 w-[350px] sm:w-[450px] rounded-xl ">
      <h2 className="font-semibold text-2xl sm:text-3xl dark:text-white">
        {title}
      </h2>

      <p className="mt-2 font-noto text-sm text-gray-600">{description}</p>

      {children}

      <SignupFooter />
    </div>
  );
};

export default StepContainer;
