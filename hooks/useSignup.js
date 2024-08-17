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

export default function useSignup() {
  const domain = useSelector((state) => state.signup.domain);
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

  return {
    handlePasskey,
    handleEmail,
  };
}
