"use client";

import {
  setLoading,
  setMessage,
  setTxProof,
  toggleProofDrawer,
} from "@/redux/slice/proofSlice";
import { Auth0Client } from "auth0-spa-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useWallet from "./useWallet";
import { ethers } from "ethers";
import useCircuit from "./useCircuit";
import { client } from "@passwordless-id/webauthn";
import { setMailUser } from "@/redux/slice/UserSlice";

export default function useProof() {
  const dispatch = useDispatch();
  const { getDomain, initializeProofWallet, getNonce } = useWallet();
  const domain = getDomain();
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const recipient = useSelector((state) => state.transfer.recipient);
  const amount = useSelector((state) => state.transfer.amount);
  const { prove } = useCircuit();

  const getChallenge = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/challenge/${domain}.fusion.id`
    );

    if (!res.data.success) throw new Error("Failed to Authenticate");

    return res.data.challenge;
  };

  const getCredentials = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/credential/${domain}.fusion.id`
    );

    if (!res.data.success) throw new Error("Failed to Authenticate");

    return res.data.credential;
  };

  const generateProofWithPasskey = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setMessage("Authenticating..."));

      const challenge = await getChallenge();

      const credential = await getCredentials();

      const authentication = await client.authenticate(
        [credential],
        challenge,
        {
          authenticatorType: "auto",
          userVerification: "required",
          timeout: 60000,
        }
      );

      const wallet = await initializeProofWallet();

      const nonce = await getNonce(selectedChain);

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
        const provider = new ethers.providers.JsonRpcProvider(
          selectedChain.rpcUrl
        );

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

      const abiCoder = new ethers.utils.AbiCoder();

      const message = abiCoder.encode(
        ["address", "uint256", "bytes", "uint8", "uint256", "uint256"],
        [
          txData.to,
          txData.value,
          txData.data,
          txData.operation,
          nonce,
          selectedChain.chainId,
        ]
      );

      const txHash = ethers.utils.keccak256(message);

      const key = localStorage.getItem(`${domain}.fusion.id`);

      const tokenResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/token`,
        {
          key: key,
        }
      );

      if (!tokenResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/sign`,
        {
          domain: domain + ".fusion.id",
          authentication,
          payload: ethers.utils.arrayify(txHash),
        },
        {
          headers: {
            "x-api-key": tokenResponse.data.token,
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to Authenticate");
      }

      const signature = response.data.signature;

      const signerResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/signer`
      );

      if (!signerResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      dispatch(setMessage("Generating Proof..."));

      const signing_address = signerResponse.data.signer;

      const proof = await prove(
        message,
        signature,
        wallet.address,
        signing_address
      );

      dispatch(setTxProof(proof));
    } catch (error) {
      toast.error("Failed to Authenticate");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(toggleProofDrawer());
    }
  };

  const generateProofWithEmail = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setMessage("Authenticating..."));

      const wallet = await initializeProofWallet();

      const nonce = await getNonce(selectedChain);

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
        const provider = new ethers.providers.JsonRpcProvider(
          selectedChain.rpcUrl
        );

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

      const abiCoder = new ethers.utils.AbiCoder();

      const message = abiCoder.encode(
        ["address", "uint256", "bytes", "uint8", "uint256", "uint256"],
        [
          txData.to,
          txData.value,
          txData.data,
          txData.operation,
          nonce,
          selectedChain.chainId,
        ]
      );

      const txHash = ethers.utils.keccak256(message);

      const auth0 = new Auth0Client({
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });

      await auth0.loginWithPopup();

      const token = await auth0.getTokenSilently();

      const user = await auth0.getUser();

      dispatch(setMailUser(user));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/sign/email`,
        {
          domain: `${domain}.fusion.id`,
          payload: ethers.utils.arrayify(txHash),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to Authenticate");
      }

      const signature = response.data.signature;

      const signerResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/signer`
      );

      if (!signerResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      const signing_address = signerResponse.data.signer;

      dispatch(setMessage("Generating Proof..."));

      const proof = await prove(
        message,
        signature,
        wallet.address,
        signing_address
      );

      dispatch(setTxProof(proof));
    } catch (error) {
      toast.error("Failed to Authenticate");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(toggleProofDrawer());
    }
  };

  return { generateProofWithPasskey, generateProofWithEmail };
}
