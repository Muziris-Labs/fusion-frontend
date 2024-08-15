"use client";

import { setTxProof } from "@/redux/slice/proofSlice";
import { useSelector, useDispatch } from "react-redux";

export default function ProofFooter({ children, disabled = false }) {
  const dispatch = useDispatch();

  const txProof = useSelector((state) => state.proof.txProof);
  const currentChain = useSelector((state) => state.chain.currentChain);

  return (
    <div className="flex flex-col gap-2">
      {children}

      {txProof && !disabled && (
        <p className="text-gray-600 text-sm">
          Approval has been granted.{" "}
          <span
            className="hover:cursor-pointer hover:underline"
            style={{
              color: currentChain.style.colorLight,
            }}
            onClick={() => {
              dispatch(setTxProof(null));
            }}
          >
            Remove Approval
          </span>
        </p>
      )}
    </div>
  );
}
