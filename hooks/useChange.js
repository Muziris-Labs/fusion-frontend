"use client";

import {
  setEmail,
  setIsLoading,
  setPasskey,
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

  const handleVerification = async () => {
    try {
      dispatch(setIsLoading(true));
      const auth0 = new Auth0Client({
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });

      await auth0.loginWithPopup();

      const token = await auth0.getTokenSilently();

      dispatch(setEmail(token));

      const user = await auth0.getUser();

      dispatch(setMailUser(user));

      dispatch(setStep(2));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleRecovery = async () => {
    try {
      dispatch(setIsLoading(true));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/recover`,
        {
          domain: domain + ".fusion.id",
          registration: passkey,
          challenge: passkey.challenge,
        },
        {
          headers: {
            Authorization: `Bearer ${email}`,
          },
        }
      );

      if (!res.data.success) {
        throw new Error("Failed to Authenticate");
      }

      localStorage.setItem(`${domain}.fusion.id`, res.data.key);
      toast.success("Successfully Recovered Passkey");
      dispatch(toggleChangeDrawer());
      fireMultiple();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { handlePasskey, handleVerification, handleRecovery };
}
