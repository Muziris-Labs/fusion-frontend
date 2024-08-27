import FusionCard from "@/components/ui/FusionCard";
import TransferSteps from "./TransferSteps";
import TransferStepper from "./TransferStepper";

export default function TransferContainer() {
  return (
    <FusionCard className="flex flex-col gap-5 justify-between p-10 items-center">
      <TransferSteps />
      <TransferStepper />
    </FusionCard>
  );
}
