"use client";

import useProof from "@/hooks/useProof";
import { toggleProofDrawer } from "@/redux/slice/proofSlice";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { Fingerprint, Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.proof.proofDrawer);
  const loading = useSelector((state) => state.proof.isLoading);
  const { generateProofWithPasskey, generateProofWithEmail } = useProof();

  const handleDrawer = () => {
    if (loading) return;
    dispatch(toggleProofDrawer());
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={handleDrawer}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="font-outfit bg-transparent items-center justify-center flex shadow-none"
    >
      <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
        <div className="flex flex-col gap-1 w-full items-start">
          <h1 className="text-2xl font-semibold">Approval Required</h1>
          <p className="text-sm text-gray-500">
            Generate a proof to sign the transaction
          </p>
        </div>

        <Button
          color="white"
          className="mt-10 flex h-40 w-full rounded-full border-px items-center justify-center border-black border-[1px] bg-white px-3"
          onClick={() => {
            generateProofWithPasskey();
          }}
        >
          <Fingerprint className="text-black" size={80} />
        </Button>

        <div className="flex flex-col gap-2 mt-10 w-full">
          <Button
            className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case border-black border-[1px]"
            onClick={() => {
              generateProofWithEmail();
            }}
          >
            Use E-mail instead
          </Button>
          <Button
            className=" w-full p-5 font-semibold border-[1px] border-black rounded-full text-sm font-outfit normal-case"
            color="white"
            onClick={() => {
              dispatch(toggleProofDrawer());
            }}
          >
            Back
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
