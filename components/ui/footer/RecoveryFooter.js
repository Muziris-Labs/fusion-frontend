"use client";

import { useSelector, useDispatch } from "react-redux";

import { setRecoveryProof } from "@/redux/slice/proofSlice";

export default function RecoveryFooter({ children, disabled = false }) {
  const dispatch = useDispatch();

  const currentChain = useSelector((state) => state.chain.currentChain);
  const recoveryProof = useSelector((state) => state.proof.recoveryProof);

  return (
    <div className="flex flex-col gap-2">
      {children}

      {recoveryProof && !disabled && (
        <p className="text-gray-600 text-sm">
          Approval has been granted.{" "}
          <span
            className="hover:cursor-pointer hover:underline"
            style={{
              color: currentChain.style.colorLight,
            }}
            onClick={() => {
              dispatch(setRecoveryProof(null));
            }}
          >
            Remove Approval
          </span>
        </p>
      )}
    </div>
  );
}
