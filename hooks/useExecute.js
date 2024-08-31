"use client";

import { clearAll, setGasAmount } from "@/redux/slice/transferSlice";
import { useDispatch } from "react-redux";
import useWallet from "./useWallet";
import { ethers } from "ethers";
import axios from "axios";
import { useSelector } from "react-redux";
import { setIsRunning } from "@/redux/slice/TxSlice";
import { useConfetti } from "@/components/ui/fireConfetti";
import { toast } from "sonner";
import { clearTxProof } from "@/redux/slice/proofSlice";

export default function useExecute() {
  const dispatch = useDispatch();
  const {
    getDomain,
    initializeProofWallet,
    getNonce,
    getFusionAddress,
    reloadTransaction,
  } = useWallet();
  const domain = getDomain();
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const recipient = useSelector((state) => state.transfer.recipient);
  const amount = useSelector((state) => state.transfer.amount);
  const txProof = useSelector((state) => state.proof.txProof);
  const { fireMultiple } = useConfetti();

  const estimateGas = async () => {
    try {
      const wallet = initializeProofWallet();

      const fusionAddress = await getFusionAddress(selectedChain, domain);

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
        };
      }

      const FusionForwarder = new ethers.Contract(
        selectedChain.deployments.FusionForwarder.address,
        selectedChain.deployments.FusionForwarder.abi,
        provider
      );

      const rawForwardExexuteData = {
        from: wallet.address,
        recipient: fusionAddress,
        deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
        nonce: Number(await FusionForwarder.nonces(wallet.address)),
        gas: 2000000,
        proof: txProof,
        txData: txData,
      };

      const data712 = {
        types: {
          Transaction: [
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "data", type: "bytes" },
            { name: "operation", type: "uint8" },
          ],
          ForwardExecute: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "txData", type: "Transaction" },
          ],
        },
        domain: {
          name: "Fusion Forwarder",
          version: "1",
          chainId: selectedChain.chainId,
          verifyingContract: selectedChain.deployments.FusionForwarder.address,
        },
        message: rawForwardExexuteData,
      };

      const signature = await wallet._signTypedData(
        data712.domain,
        data712.types,
        data712.message
      );

      const forwardRequest = {
        from: rawForwardExexuteData.from,
        recipient: rawForwardExexuteData.recipient,
        deadline: rawForwardExexuteData.deadline,
        gas: rawForwardExexuteData.gas,
        proof: rawForwardExexuteData.proof,
        txData: rawForwardExexuteData.txData,
        signature: signature,
      };

      if (selectedToken.address === ethers.constants.AddressZero) {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/execute/estimate/native/` +
            selectedChain.chainId,
          {
            forwardRequest,
          }
        );

        dispatch(setGasAmount(payloadResponse.data.estimateFees));
      } else {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/execute/estimate/erc20/` +
            selectedChain.chainId +
            "/" +
            selectedToken.address,
          {
            forwardRequest,
          }
        );

        dispatch(setGasAmount(payloadResponse.data.estimateFees));
      }
    } catch (error) {
      dispatch(setGasAmount(null));
      console.error(error);
    }
  };

  const execute = async () => {
    try {
      dispatch(setIsRunning(true));

      const wallet = initializeProofWallet();

      const fusionAddress = await getFusionAddress(selectedChain, domain);

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
        };
      }

      const FusionForwarder = new ethers.Contract(
        selectedChain.deployments.FusionForwarder.address,
        selectedChain.deployments.FusionForwarder.abi,
        provider
      );

      const rawForwardExexuteData = {
        from: wallet.address,
        recipient: fusionAddress,
        deadline: Number((Date.now() / 1000).toFixed(0)) + 2000,
        nonce: Number(await FusionForwarder.nonces(wallet.address)),
        gas: 2000000,
        proof: txProof,
        txData: txData,
      };

      const data712 = {
        types: {
          Transaction: [
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
            { name: "data", type: "bytes" },
            { name: "operation", type: "uint8" },
          ],
          ForwardExecute: [
            { name: "from", type: "address" },
            { name: "recipient", type: "address" },
            { name: "deadline", type: "uint256" },
            { name: "gas", type: "uint256" },
            { name: "proof", type: "bytes" },
            { name: "txData", type: "Transaction" },
          ],
        },
        domain: {
          name: "Fusion Forwarder",
          version: "1",
          chainId: selectedChain.chainId,
          verifyingContract: selectedChain.deployments.FusionForwarder.address,
        },
        message: rawForwardExexuteData,
      };

      const signature = await wallet._signTypedData(
        data712.domain,
        data712.types,
        data712.message
      );

      const forwardRequest = {
        from: rawForwardExexuteData.from,
        recipient: rawForwardExexuteData.recipient,
        deadline: rawForwardExexuteData.deadline,
        gas: rawForwardExexuteData.gas,
        proof: rawForwardExexuteData.proof,
        txData: rawForwardExexuteData.txData,
        signature: signature,
      };

      if (selectedToken.address === ethers.constants.AddressZero) {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/execute/native/` +
            selectedChain.chainId,
          {
            forwardRequest,
          }
        );

        if (payloadResponse.data.success) {
          fireMultiple();
          toast.success("Transaction Successful");
          dispatch(clearAll());
          dispatch(clearTxProof());
          reloadTransaction(selectedChain.chainId);
        } else {
          toast.error("Transaction Failed");
        }
      } else {
        const payloadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/execute/erc20/` +
            selectedChain.chainId +
            "/" +
            selectedToken.address,
          {
            forwardRequest,
          }
        );

        if (payloadResponse.data.success) {
          fireMultiple();
          toast.success("Transaction Successful");
          dispatch(clearAll());
          dispatch(clearTxProof());
          reloadTransaction(selectedChain.chainId);
        } else {
          toast.error("Transaction Failed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Transaction Failed");
    } finally {
      dispatch(setIsRunning(false));
    }
  };

  return { estimateGas, execute };
}
