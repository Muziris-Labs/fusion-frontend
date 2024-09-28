import TransferSteps from "./TransferSteps";
import TransferStepper from "./TransferStepper";

export default function TransferContainer() {
  return (
    <div className="flex flex-col w-full ">
      <TransferStepper />
      <TransferSteps />
    </div>
  );
}
