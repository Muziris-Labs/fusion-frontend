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
import { client } from "@passwordless-id/webauthn";
import { setMailUser } from "@/redux/slice/UserSlice";
import {
  setAccessToken,
  setAuthentication,
  setRefreshTime,
  setWalletData,
} from "@/redux/slice/transferSlice";

export default function useProof() {
  const dispatch = useDispatch();
  const { getDomain, initializeProofWallet, getNonce } = useWallet();
  const domain = getDomain();
  const selectedChain = useSelector((state) => state.transfer.selectedChain);
  const selectedToken = useSelector((state) => state.transfer.selectedToken);
  const recipient = useSelector((state) => state.transfer.recipient);
  const amount = useSelector((state) => state.transfer.amount);

  const generateProofWithPasskey = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setMessage("Authenticating..."));

      const challengeData = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/challenge/generate`
      );

      const challenge = challengeData.data.challenge;

      const passkeyResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/credential/` +
          domain +
          ".fusion.id"
      );

      const authentication = await client.authenticate(
        [passkeyResponse.data.credential],
        challenge,
        {
          authenticatorType: "auto",
          userVerification: "required",
          timeout: 60000,
        }
      );

      authentication.challengeId = challengeData.data.challengeId;

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

      const walletDataResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/submit/walletData/` +
          selectedChain.chainId
      );

      if (!walletDataResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      const walletData = walletDataResponse.data.walletData;

      dispatch(setWalletData(walletData));

      axios.defaults.withCredentials = true;
      const initResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/proof/passkey`,
        {
          domain: domain + ".fusion.id",
          authentication: authentication,
          challengeId: challengeData.data.challengeId,
          txData: txData,
          nonce: nonce,
          chainId: selectedChain.chainId,
          token:
            !selectedToken.address ||
            selectedToken.address === ethers.constants.AddressZero
              ? ethers.constants.AddressZero
              : selectedToken.address,
          signingAddress: walletData.address,
          verifyingAddress: wallet.address,
        }
      );

      if (!initResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      dispatch(setTxProof(initResponse.data.proof));
      dispatch(setAuthentication(authentication));
    } catch (error) {
      toast.error("Failed to Authenticate");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(toggleProofDrawer());
    }
  };

  const requestCode = async (email) => {
    try {
      const options = {
        method: "POST",
        url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/passwordless/start`,
        headers: { "content-type": "application/json" },
        data: {
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
          connection: "email",
          email: email,
          send: "code",
        },
      };

      axios.defaults.withCredentials = false;
      await axios.request(options);

      dispatch(setRefreshTime(new Date().getTime()));
    } catch (error) {
      toast.error("Failed to send code to email.");
      console.error(error);
    }
  };

  const verifyCode = async (email, code) => {
    try {
      dispatch(setLoading(true));
      dispatch(setMessage("Authenticating..."));

      const options = {
        method: "POST",
        url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
        headers: { "content-type": "application/json" },
        data: {
          grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
          client_id: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
          audience: `${process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}`,
          username: email,
          otp: code,
          realm: "email",
          scope: "read:current_user",
        },
      };

      axios.defaults.withCredentials = false;
      const backendResponse = await axios.request(options);

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

      const walletDataResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/submit/walletData/` +
          selectedChain.chainId
      );

      if (!walletDataResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      const walletData = walletDataResponse.data.walletData;

      dispatch(setWalletData(walletData));

      axios.defaults.withCredentials = true;
      const initResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/proof/recovery/email`,
        {
          domain: domain + ".fusion.id",
          txData: txData,
          nonce: nonce,
          chainId: selectedChain.chainId,
          token:
            !selectedToken.address ||
            selectedToken.address === ethers.constants.AddressZero
              ? ethers.constants.AddressZero
              : selectedToken.address,
          signingAddress: walletData.address,
          verifyingAddress: wallet.address,
        },
        {
          headers: {
            Authorization: `Bearer ${backendResponse.data.access_token}`,
          },
        }
      );

      if (!initResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      dispatch(setTxProof(initResponse.data.proof));
      dispatch(setAccessToken(backendResponse.data.access_token));
    } catch (error) {
      toast.error("Failed to Authenticate");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
      dispatch(toggleProofDrawer());
    }
  };

  return { generateProofWithPasskey, verifyCode, requestCode };
}
