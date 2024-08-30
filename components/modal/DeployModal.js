"use client";

import { Dialog, DialogBody } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeployDrawer } from "@/redux/slice/deploySlice";
import DeployStepper from "./deploy/Stepper";
import DeployStep1 from "./deploy/DeployStep1";
import DeployStep2 from "./deploy/DeployStep2";
import DeployStep3 from "./deploy/DeployStep3";

export default function DeployModal() {
  const open = useSelector((state) => state.deploy.open);
  const isLoading = useSelector((state) => state.deploy.isLoading);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.deploy.step);

  const handleDrawer = () => {
    if (isLoading) return;
    dispatch(toggleDeployDrawer());
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={() => {
        handleDrawer();
      }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="font-outfit bg-transparent items-center justify-center flex shadow-none"
    >
      <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
        <section className="flex flex-col h-full gap-10 justify-between items-center">
          {step === 0 && <DeployStep1 />}
          {step === 1 && <DeployStep2 />}
          {step === 2 && <DeployStep3 />}
        </section>
        <div className="w-full flex justify-center mt-3">
          <DeployStepper />
        </div>
      </DialogBody>
    </Dialog>
  );
}
