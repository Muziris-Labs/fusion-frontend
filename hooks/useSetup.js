"use client";

import {
  setAccessToken,
  setAuthentication,
  setIsLoading,
  setRequestTime,
  setStep,
  toggleSetupDrawer,
} from "@/redux/slice/setupSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useWallet from "./useWallet";
import { client } from "@passwordless-id/webauthn";
import { useConfetti } from "@/components/ui/fireConfetti";

export default function useSetup() {
  const dispatch = useDispatch();
  const { getDomain } = useWallet();
  const domain = getDomain();
  const authentication = useSelector((state) => state.setup.authentication);
  const accessToken = useSelector((state) => state.setup.accessToken);
  const { loadUser } = useWallet();
  const { fireMultiple } = useConfetti();
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

      dispatch(setAccessToken(response.data.access_token));

      dispatch(setStep(1));
    } catch (error) {
      toast.error("Failed to verify code.");
      console.error(error);
    }
  };

  const handlePasskey = async () => {
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
        domain: window.location.hostname,
      }
    );

    authentication.challengeId = challengeData.data.challengeId;

    dispatch(setAuthentication(authentication));
  };

  const addEmail = async () => {
    try {
      dispatch(setIsLoading(true));

      axios.defaults.withCredentials = true;
      const initResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/init/add/passkey/email`,
        {
          domain: domain + ".fusion.id",
          authentication: authentication,
          challengeId: authentication.challengeId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (initResponse.data.success) {
        await loadUser();
        toast.success("Email added successfully.");
        dispatch(toggleSetupDrawer());
        dispatch(setStep(0));
        dispatch(setAccessToken(null));
        dispatch(setAuthentication(null));
        dispatch(setRequestTime(null));
        fireMultiple();
        await loadUser();
      } else {
        toast.error("Failed to add email.");
      }
    } catch (error) {
      toast.error("Failed to add email.");
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { requestCode, verifyCode, handlePasskey, addEmail };
}
