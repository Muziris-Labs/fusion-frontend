"use client";

import {
  setInitializer,
  setLoading,
  setProof,
  setStep,
} from "@/redux/slice/deploySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useWallet from "./useWallet";
import useCircuit from "./useCircuit";
import axios from "axios";
import { client } from "@passwordless-id/webauthn";
import { ethers } from "ethers";
import baseConfig from "@/lib/baseConfig";
import { Auth0Client } from "auth0-spa-js";
import { setMailUser } from "@/redux/slice/UserSlice";
import { useConfetti } from "@/components/ui/fireConfetti";

export default function useDeploy() {
  const dispatch = useDispatch();
  const { getDomain } = useWallet();
  const domain = getDomain();
  const { prove } = useCircuit();
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const selectedChain = useSelector((state) => state.deploy.selectedChain);
  const proof = useSelector((state) => state.deploy.proof);
  const initializer = useSelector((state) => state.deploy.initializer);
  const { fireMultiple } = useConfetti();
  const { getFusionAddress } = useWallet();

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

  const handlePasskeyProof = async () => {
    try {
      dispatch(setLoading(true));

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

      const provider = new ethers.providers.JsonRpcProvider(baseConfig.rpcUrl);

      const fusion = new ethers.Contract(
        walletAddress,
        baseConfig.deployments.Fusion.abi,
        provider
      );

      const TxHash = await fusion.TxHash();
      const TxVerifier = await fusion.TxVerifier();

      const initializer = fusion.interface.encodeFunctionData("setupFusion", [
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domain + ".fusion.id")),
        TxVerifier,
        selectedChain.deployments.FusionForwarder.address,
        selectedChain.deployments.GasTank.address,
        TxHash,
      ]);

      const deployData = ethers.utils.solidityPack(
        ["string", "bytes", "uint16", "address"],
        [
          domain + ".fusion.id",
          initializer,
          selectedChain.wormhole.chainId,
          selectedChain.deployments.FusionProxyFactory.address,
        ]
      );

      const hash = ethers.utils.keccak256(deployData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/sign`,
        {
          domain: domain + ".fusion.id",
          authentication,
          payload: ethers.utils.arrayify(hash),
        },
        {
          headers: {
            "x-api-key": localStorage.getItem(`${domain}.fusion.id`),
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

      const proof = await prove(
        deployData,
        signature,
        baseConfig.deployments.FusionProxyFactory.address,
        signing_address,
        baseConfig
      );

      dispatch(setInitializer(initializer));
      dispatch(setProof(proof));
      dispatch(setStep(2));
    } catch (error) {
      console.log(error);
      toast.error("Failed to Authenticate");
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleEmailProof = async () => {
    try {
      dispatch(setLoading(true));

      const provider = new ethers.providers.JsonRpcProvider(baseConfig.rpcUrl);

      const fusion = new ethers.Contract(
        walletAddress,
        baseConfig.deployments.Fusion.abi,
        provider
      );

      const TxHash = await fusion.TxHash();
      const TxVerifier = await fusion.TxVerifier();

      const initializer = fusion.interface.encodeFunctionData("setupFusion", [
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domain + ".fusion.id")),
        TxVerifier,
        selectedChain.deployments.FusionForwarder.address,
        selectedChain.deployments.GasTank.address,
        TxHash,
      ]);

      const deployData = ethers.utils.solidityPack(
        ["string", "bytes", "uint16", "address"],
        [
          domain + ".fusion.id",
          initializer,
          selectedChain.wormhole.chainId,
          selectedChain.deployments.FusionProxyFactory.address,
        ]
      );

      const hash = ethers.utils.keccak256(deployData);

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
          payload: ethers.utils.arrayify(hash),
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

      const proof = await prove(
        deployData,
        signature,
        baseConfig.deployments.FusionProxyFactory.address,
        signing_address,
        baseConfig
      );

      dispatch(setInitializer(initializer));
      dispatch(setProof(proof));
      dispatch(setStep(2));
    } catch (error) {
      console.log(error);
      toast.error("Failed to Authenticate");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deployWalletExternal = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/deployExternal/${selectedChain.chainId}`,
        {
          domain: domain + ".fusion.id",
          proof: proof,
          initializer: initializer,
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to Deploy Wallet");
      }

      const wsProvider = new ethers.providers.WebSocketProvider(
        selectedChain.wsUrl
      );

      const factory = new ethers.Contract(
        selectedChain.deployments.FusionProxyFactory.address,
        selectedChain.deployments.FusionProxyFactory.abi,
        wsProvider
      );

      factory.on("ProxyCreation", async () => {
        const fusionAddress = await getFusionAddress(
          selectedChain,
          domain + ".fusion.id"
        );

        if (fusionAddress !== ethers.constants.AddressZero) {
          fireMultiple();

          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to Deploy Wallet");
      dispatch(setLoading(false));
    }
  };

  return {
    handlePasskeyProof,
    handleEmailProof,
    deployWalletExternal,
  };
}
