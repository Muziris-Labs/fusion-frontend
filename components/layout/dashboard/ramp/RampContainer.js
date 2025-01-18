import RampStepper from "./RampStepper";
import RampSteps from "./RampSteps";

export default function RampContainer() {
  return (
    <div className="flex flex-col w-full ">
      <RampStepper />
      <RampSteps />
    </div>
  );
}
