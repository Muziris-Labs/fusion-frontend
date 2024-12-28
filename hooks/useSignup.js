"use client";

import { useDispatch, useSelector } from "react-redux";
import { client } from "@passwordless-id/webauthn";
import {
  setEmail,
  setPasskey,
  setStep,
  setUser,
} from "@/redux/slice/SignupSlice";
import { Auth0Client } from "auth0-spa-js";
import { toast } from "sonner";
import axios from "axios";
import { useConfetti } from "@/components/ui/fireConfetti";

export default function useSignup() {
  const domain = useSelector((state) => state.signup.domain);
  const passkey = useSelector((state) => state.signup.passkey);
  const { fireMultiple } = useConfetti();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.signup.accessToken);

  const handlePasskey = async () => {
    const challengeData = await axios.post(
      `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/challenge/generate`
    );

    if (!challengeData.data.success) {
      throw new Error("Failed to generate challenge.");
    }

    const challenge = challengeData.data.challenge;

    const registration = await client.register(
      domain + ".fusion.id",
      challenge,
      {
        authenticatorType: "auto",
        userVerification: "required",
        timeout: 60000,
        debug: false,
        domain: window.location.hostname,
      }
    );

    registration.challenge = challenge;
    registration.challengeId = challengeData.data.challengeId;

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
      setMessage("Indexing your domain...");

      if (!accessToken) {
        axios.defaults.withCredentials = true;
        const kmsResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/init/passkey`,
          {
            domain: domain + ".fusion.id",
            registration: passkey,
            challengeId: passkey.challengeId,
          }
        );

        if (!kmsResponse.data.success) {
          throw new Error("Failed to deploy wallet.");
        } else {
          const backendResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/index/${
              domain + ".fusion.id"
            }`
          );

          if (!backendResponse.data.success) {
            throw new Error("Failed to deploy wallet.");
          }

          setIsSuccess(true);
          setMessage("Wallet deployed successfully.");
          fireMultiple();
        }
      } else {
        axios.defaults.withCredentials = true;
        const kmsResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/init/complete/passkey/email`,
          {
            domain: domain + ".fusion.id",
            registration: passkey,
            challengeId: passkey.challengeId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!kmsResponse.data.success) {
          throw new Error("Failed to deploy wallet.");
        } else {
          const backendResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/index/${
              domain + ".fusion.id"
            }`
          );

          if (!backendResponse.data.success) {
            throw new Error("Failed to deploy wallet.");
          }

          setIsSuccess(true);
          setMessage("Wallet deployed successfully.");
          fireMultiple();
        }
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
