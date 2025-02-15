"use client";

import {
  clearAll,
  setGasAmount,
  setGasEstimate,
} from "@/redux/slice/transferSlice";
import { useDispatch } from "react-redux";
import useWallet from "./useWallet";
import { ethers } from "ethers";
import axios from "axios";
import { useSelector } from "react-redux";
import { setIsRunning } from "@/redux/slice/TxSlice";
import { useConfetti } from "@/components/ui/fireConfetti";
import { toast } from "sonner";
import { clearTxProof, setTxProof } from "@/redux/slice/proofSlice";
import useProof from "./useProof";

export default function useExecute() {
  const dispatch = useDispatch();
  const {
    getDomain,
    initializeProofWallet,
    getFusionHash,
    getFusionAddress,
    reloadTransaction,
    loadTransactions,
  } = useWallet();
  const requestId = useSelector((state) => state.proof.requestId);
  const { getFinalProof } = useProof();
  const domain = getDomain();
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const recipient = useSelector((state) => state.transfer.recipient);
  const amount = useSelector((state) => state.transfer.amount);
  const txProof = useSelector((state) => state.proof.txProof);
  const { fireMultiple } = useConfetti();
  const walletData = useSelector((state) => state.transfer.walletData);
  const gasEstimate = useSelector((state) => state.transfer.gasEstimate);
  const deadline = useSelector((state) => state.proof.deadline);

  const estimateGas = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        selectedChain.rpcUrl
      );

      let txData;
      if (
        !selectedToken.address ||
        selectedToken.address === ethers.constants.AddressZero
      ) {
        txData = {
          to: recipient,
          value: ethers.utils.parseEther(amount.toFixed(18)).toString(),
          data: "0x",
          operation: 0,
          gasLimit: 2000000,
        };
      } else {
        const erc20Contract = new ethers.Contract(
          selectedToken.address,
          ["function transfer(address to, uint256 value) returns (bool)"],
          provider
        );

        txData = {
          to: selectedToken.address,
          value: 0,
          data: erc20Contract.interface.encodeFunctionData("transfer", [
            recipient,
            ethers.utils
              .parseUnits(
                amount.toFixed(selectedToken.decimals),
                selectedToken.decimals
              )
              .toString(),
          ]),
          operation: 0,
          gasLimit: 2000000,
        };
      }

      const request = {
        proof: txProof,
        deadline: deadline,
        txData: txData,
      };

      if (selectedToken.address === ethers.constants.AddressZero) {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/estimate/execute/native/` +
            selectedChain.chainId,
          {
            request,
            domain: domain + ".fusion.id",
          }
        );

        dispatch(setGasEstimate(payloadResponse.data));

        dispatch(setGasAmount(payloadResponse.data.estimateFees));
      } else {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/estimate/execute/token/` +
            selectedChain.chainId +
            "/" +
            selectedToken.address,
          {
            request,
            domain: domain + ".fusion.id",
          }
        );

        dispatch(setGasEstimate(payloadResponse.data));

        dispatch(setGasAmount(payloadResponse.data.estimateFees));
      }
    } catch (error) {
      dispatch(setGasAmount(null));
      console.error(error);
      toast.error("Error Estimating Gas");
    }
  };

  const execute = async () => {
    try {
      dispatch(setIsRunning(true));

      const finalProof = await getFinalProof(
        requestId,
        gasEstimate.gasPrice,
        gasEstimate.baseGas,
        txProof
      );

      const provider = new ethers.providers.JsonRpcProvider(
        selectedChain.rpcUrl
      );

      let txData;
      if (
        !selectedToken.address ||
        selectedToken.address === ethers.constants.AddressZero
      ) {
        txData = {
          to: recipient,
          value: ethers.utils.parseEther(amount.toFixed(18)).toString(),
          data: "0x",
          operation: 0,
          gasLimit: 2000000,
        };
      } else {
        const erc20Contract = new ethers.Contract(
          selectedToken.address,
          ["function transfer(address to, uint256 value) returns (bool)"],
          provider
        );

        txData = {
          to: selectedToken.address,
          value: 0,
          data: erc20Contract.interface.encodeFunctionData("transfer", [
            recipient,
            ethers.utils
              .parseUnits(
                amount.toFixed(selectedToken.decimals),
                selectedToken.decimals
              )
              .toString(),
          ]),
          operation: 0,
          gasLimit: 2000000,
        };
      }

      const request = {
        proof: finalProof,
        txData: txData,
        deadline: deadline,
      };

      if (selectedToken.address === ethers.constants.AddressZero) {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/submit/execute/native`,
          {
            request,
            domain: domain + ".fusion.id",
            gasEstimateId: gasEstimate.gasEstimateId,
          }
        );

        if (!payloadResponse.data.success) {
          throw new Error("Transaction Failed");
        }

        const txId = payloadResponse.data.txId;

        try {
          await checkTransaction(txId);
          fireMultiple();
          loadTransactions();
          dispatch(clearAll());
          dispatch(clearTxProof());
          toast.success("Transaction Successful");
        } catch (error) {
          throw new Error("Transaction Failed");
        }
      } else {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/submit/execute/token`,
          {
            request,
            domain: domain + ".fusion.id",
            gasEstimateId: gasEstimate.gasEstimateId,
          }
        );

        if (!payloadResponse.data.success) {
          throw new Error("Transaction Failed");
        }

        const txId = payloadResponse.data.txId;

        try {
          await checkTransaction(txId);
          fireMultiple();
          loadTransactions();
          dispatch(clearAll());
          dispatch(clearTxProof());
          toast.success("Transaction Successful");
        } catch (error) {
          throw new Error("Transaction Failed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Transaction Failed");
      dispatch(setTxProof(null));
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  return { estimateGas, execute };
}

const checkTransaction = (txId) => {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const transactionData = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/transactions/byId/${txId}`
        );

        if (!transactionData.data.success) {
          clearInterval(intervalId);
          reject(new Error("Error Fetching Transaction"));
          return;
        }

        const transaction = transactionData.data.transaction;

        if (transaction.status === "success") {
          clearInterval(intervalId);
          resolve(transaction);
        } else if (transaction.status === "failed") {
          clearInterval(intervalId);
          reject(new Error("Transaction Failed"));
        }
        // If status is pending or any other status, continue checking
      } catch (error) {
        clearInterval(intervalId);
        reject(error);
      }
    }, 1000);
  });
};
