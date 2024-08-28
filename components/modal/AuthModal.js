"use client";

import useProof from "@/hooks/useProof";
import { toggleProofDrawer } from "@/redux/slice/proofSlice";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { Fingerprint, Loader2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Auth0Client } from "auth0-spa-js";

export default function AuthModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.proof.proofDrawer);
  const loading = useSelector((state) => state.proof.isLoading);
  const { generateProofWithPasskey, generateProofWithEmail } = useProof();
  const message = useSelector((state) => state.proof.message);
  const user = useSelector((state) => state.user.mailUser);

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
      {!loading && (
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
            disabled={loading}
          >
            <Fingerprint className="text-black" size={80} />
          </Button>

          {user && (
            <div className="w-full border-[1px] border-black flex border-dashed rounded-xl mt-8 p-5 gap-5">
              <Image
                src={user.picture}
                width={50}
                height={40}
                className="rounded-full"
                alt="profilepic"
              />
              <div className="flex flex-col justify-between items-start ">
                <p className="font-semibold text-lg">{user.nickname}</p>
                <p className="font-outfit text-sm text-gray-600">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {user && (
            <p
              className="mt-2 -mb-5 text-center w-full text-xs text-gray-500 hover:cursor-pointer hover:underline"
              onClick={() => {
                const auth0 = new Auth0Client({
                  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
                  client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
                  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                  scope: "read:current_user",
                });

                auth0.logout();
              }}
            >
              Logout
            </p>
          )}

          <div className="flex flex-col gap-2 mt-10 w-full">
            <Button
              className=" w-full p-5 font-semibold rounded-full text-sm font-outfit normal-case border-black border-[1px]"
              onClick={() => {
                generateProofWithEmail();
              }}
              disabled={loading}
            >
              Use E-mail instead
            </Button>
            <Button
              className=" w-full p-5 font-semibold border-[1px] border-black rounded-full text-sm font-outfit normal-case"
              color="white"
              onClick={() => {
                dispatch(toggleProofDrawer());
              }}
              disabled={loading}
            >
              Back
            </Button>
          </div>
        </DialogBody>
      )}
      {loading && (
        <DialogBody className="text-center gap-y-4 font-outfit text-black bg-white rounded-3xl w-full max-w-[32rem] p-10">
          <div className="flex flex-col gap-1 w-full items-start">
            <h1 className="text-2xl font-semibold">{message}.</h1>
            <p className="text-sm text-gray-500">
              Please wait while we generate the proof
            </p>
          </div>

          <Loader2Icon className="text-black animate-spin mt-10" size={80} />
        </DialogBody>
      )}
    </Dialog>
  );
}
