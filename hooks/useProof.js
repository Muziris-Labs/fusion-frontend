"use client";

import { setLoading } from "@/redux/slice/proofSlice";
import { Auth0Client } from "auth0-spa-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useWallet from "./useWallet";

export default function useProof() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.proof.isLoading);
  const { getDomain } = useWallet();
  const domain = getDomain();

  const generateProofWithPasskey = async () => {
    try {
      dispatch(setLoading(true));
    } catch (error) {
      toast.error("Failed to Authenticate");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const generateProofWithEmail = async () => {
    try {
      dispatch(setLoading(true));

      const auth0 = new Auth0Client({
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });

      await auth0.loginWithPopup();

      const token = await auth0.getTokenSilently();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/sign/email`,
        {
          domain: `${domain}.fusion.id`,
          payload: "test",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      toast.error("Failed to Authenticate");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { generateProofWithPasskey, generateProofWithEmail };
}
