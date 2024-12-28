"use client";

import {
  setEmail,
  setIsLoading,
  setPasskey,
  setRequestTime,
  setStep,
  toggleChangeDrawer,
} from "@/redux/slice/changeSlice";
import useWallet from "./useWallet";
import { client } from "@passwordless-id/webauthn";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { Auth0Client } from "auth0-spa-js";
import { setMailUser } from "@/redux/slice/UserSlice";
import axios from "axios";
import { toast } from "sonner";
import { useConfetti } from "@/components/ui/fireConfetti";

export default function useChange() {
  const { getDomain } = useWallet();
  const domain = getDomain();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.change.email);
  const passkey = useSelector((state) => state.change.passkey);
  const { fireMultiple } = useConfetti();

  const handlePasskey = async () => {
    const challengeData = await axios.post(
      `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/challenge/generate`
    );

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

    registration.challengeId = challengeData.data.challengeId;

    dispatch(setPasskey(registration));
  };

  const requestCode = async (email) => {
    try {
      const options = {
        method: "POST",
        url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/passwordless/start`,
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        data: {
          client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
          connection: "email",
          email: email,
          send: "code",
        },
      };

      axios.defaults.withCredentials = false;
      await axios.request(options);

      dispatch(setRequestTime(new Date().getTime()));
    } catch (error) {
      toast.error("Failed to send code to email.");
      console.error(error);
    }
  };

  const verifyCode = async (email, code) => {
    try {
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
      const response = await axios.request(options);

      dispatch(setEmail(response.data.access_token));

      dispatch(setStep(2));
    } catch (error) {
      toast.error("Failed to verify code.");
      console.error(error);
    }
  };

  const handleRecovery = async () => {
    try {
      dispatch(setIsLoading(true));

      axios.defaults.withCredentials = true;
      const initResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/recover/email/passkey`,
        {
          domain: domain + ".fusion.id",
          registration: passkey,
          challengeId: passkey.challengeId,
        },
        {
          headers: {
            Authorization: `Bearer ${email}`,
          },
        }
      );

      if (!initResponse.data.success) {
        throw new Error("Failed to Authenticate");
      }

      toast.success("Successfully Recovered Passkey");
      dispatch(toggleChangeDrawer());
      fireMultiple();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { handlePasskey, requestCode, verifyCode, handleRecovery };
}
