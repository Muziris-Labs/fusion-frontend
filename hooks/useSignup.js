"use client";

import { useDispatch, useSelector } from "react-redux";
import { client } from "@passwordless-id/webauthn";
import {
  setEmail,
  setPasskey,
  setStep,
  setUser,
} from "@/redux/slice/SignupSlice";
import { v4 } from "uuid";
import { Auth0Client } from "auth0-spa-js";
import { toast } from "sonner";
import axios from "axios";
import { ethers } from "ethers";
import baseConfig from "@/lib/baseConfig";
import { useConfetti } from "@/components/ui/fireConfetti";

export default function useSignup() {
  const domain = useSelector((state) => state.signup.domain);
  const passkey = useSelector((state) => state.signup.passkey);
  const email = useSelector((state) => state.signup.email);
  const { fireMultiple } = useConfetti();

  const dispatch = useDispatch();
  const handlePasskey = async () => {
    const challenge = v4();

    const registration = await client.register(
      domain + ".fusion.id",
      challenge,
      {
        authenticatorType: "auto",
        userVerification: "required",
        timeout: 60000,
        debug: false,
      }
    );

    registration.challenge = challenge;

    dispatch(setPasskey(registration));
  };

  const handleEmail = async () => {
    const auth0 = new Auth0Client({
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      scope: "read:current_user",
    });

    await auth0.loginWithPopup();

    const token = await auth0.getTokenSilently();

    const user = await auth0.getUser();

    dispatch(setEmail(token));
    dispatch(setUser(user));
  };

  const deployWallet = async (setIsLoading, setIsSuccess, setMessage) => {
    try {
      setIsLoading(true);
      setMessage("Initializing wallet deployment...");

      const kmsResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/init/passkey`,
        {
          domain: domain + ".fusion.id",
          registration: passkey,
          challenge: passkey.challenge,
          payload: "FUSION_SIGN_UP",
        },
        {
          headers: {
            Authorization: `Bearer ${email}`,
          },
        }
      );

      if (!kmsResponse.data.success) {
        throw new Error("Failed to initialize wallet deployment.");
      }

      localStorage.setItem(`${domain}.fusion.id`, kmsResponse.data.key);
      const signature = kmsResponse.data.signature;

      const pubKey_uncompressed = ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage("FUSION_SIGN_UP"),
        signature
      );

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);
      let pub_key_y = pubKey.substring(64);

      setMessage("Deploying your smart wallet...");

      const hashresponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/getPubkeyHash`,
        {
          pub_key_x: Array.from(ethers.utils.arrayify("0x" + pub_key_x)),
          pub_key_y: Array.from(ethers.utils.arrayify("0x" + pub_key_y)),
        }
      );

      if (!hashresponse.data.success) {
        throw new Error("Failed to deploy wallet.");
      }

      const txVerifier = baseConfig.deployments.UltraVerifier.address;

      const deploymentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/deploy/base`,
        {
          domain: domain + ".fusion.id",
          txHash: hashresponse.data.pubkeyHash,
          txVerifier,
        }
      );

      if (!deploymentResponse.data.success) {
        throw new Error("Failed to deploy wallet.");
      } else {
        setIsSuccess(true);
        setMessage("Wallet deployed successfully.");
        fireMultiple();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to deploy wallet. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePasskey,
    handleEmail,
    deployWallet,
  };
}
