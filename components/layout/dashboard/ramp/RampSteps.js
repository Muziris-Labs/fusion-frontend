"use client";

import { useSelector } from "react-redux";
import RampStep0 from "./RampStep0";
import RampStep1 from "./RampStep1";
import RampStep2 from "./RampStep2";

const RampSteps = () => {
  const step = useSelector((state) => state.ramp.step);

  return (
    <>
      {step === 0 && <RampStep0 />}
      {step === 1 && <RampStep1 />}
      {step === 2 && <RampStep2 />}
    </>
  );
};

export default RampSteps;
