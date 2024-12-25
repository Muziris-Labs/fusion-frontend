"use client";

import {
  setAccessToken,
  setRequestTime,
  setStep,
} from "@/redux/slice/SignupSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function useEmail() {
  const dispatch = useDispatch();
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

      const response = await axios.request(options);

      dispatch(setAccessToken(response.data.access_token));

      dispatch(setStep(3));
    } catch (error) {
      toast.error("Failed to verify code.");
      console.error(error);
    }
  };

  return { requestCode, verifyCode };
}
