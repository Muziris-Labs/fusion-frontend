"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useWallet from "./useWallet";
import { JSONRPCClient } from "json-rpc-2.0";
import oracleProve from "@/lib/circuits/oracle_prove.json";

export default function useCircuit() {
  const { getFusionHash, getDomain } = useWallet();
  const domain = getDomain();
  const [noir, setNoir] = useState(null);
  const [backend, setBackend] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initializeNoir = async () => {
      try {
        // Dynamic imports using await import()
        const [noirModule, barretenbergModule] = await Promise.all([
          import("@noir-lang/noir_js"),
          import("@noir-lang/backend_barretenberg"),
        ]);

        if (!isMounted) return;

        const { Noir } = noirModule;
        const { BarretenbergBackend } = barretenbergModule;

        const newBackend = new BarretenbergBackend(oracleProve);
        const newNoir = new Noir(oracleProve, newBackend);

        setBackend(newBackend);
        setNoir(newNoir);
      } catch (error) {
        console.error("Error initializing Noir and Barretenberg:", error);
      }
    };

    initializeNoir();

    return () => {
      isMounted = false;
    };
  }, []);

  const prove = async (
    message,
    signature,
    verifying_address = ethers.constants.AddressZero,
    signing_address = ethers.constants.AddressZero
  ) => {
    if (!noir || !backend) {
      throw new Error("Noir or Backend not initialized");
    }

    const hash = ethers.utils.keccak256(message);
    const pub_key_uncompressed = ethers.utils.recoverPublicKey(
      ethers.utils.hashMessage(ethers.utils.arrayify(hash)),
      signature
    );
    let pubKey = pub_key_uncompressed.slice(4);
    let pub_key_x = pubKey.substring(0, 64);
    let pub_key_y = pubKey.substring(64);
    const sig = Array.from(ethers.utils.arrayify(signature));
    sig.pop();
    const txHash = await getFusionHash(domain);
    const inputs = {
      pub_key_x: Array.from(ethers.utils.arrayify("0x" + pub_key_x)),
      pub_key_y: Array.from(ethers.utils.arrayify("0x" + pub_key_y)),
      signature: sig,
      hashed_message: Array.from(
        ethers.utils.arrayify(
          ethers.utils.hashMessage(ethers.utils.arrayify(hash))
        )
      ),
      tx_hash: txHash,
      verifying_address: ethers.utils.hexZeroPad(verifying_address, 32),
      signing_address: ethers.utils.hexZeroPad(signing_address, 32),
    };

    const { witness } = await noir.execute(inputs, foreignCallHandler);
    const rawProof = await backend.generateProof(witness);
    const proof = ethers.utils.hexlify(rawProof.proof);
    return proof;
  };

  const client = new JSONRPCClient((jsonRPCRequest) => {
    return fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jsonRPCRequest),
    }).then((response) => {
      if (response.status === 200) {
        return response
          .json()
          .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
      } else if (jsonRPCRequest.id !== undefined) {
        return Promise.reject(new Error(response.statusText));
      }
    });
  });

  const foreignCallHandler = async (name, input) => {
    if (name === "print") {
      return [];
    }
    const oracleReturn = await client.request(name, [
      { Array: input[0].map((i) => i.toString("hex")) },
      { Array: input[1].map((i) => i.toString("hex")) },
      { Array: input[2].map((i) => i.toString("hex")) },
      { Array: input[3].map((i) => i.toString("hex")) },
    ]);
    return [oracleReturn.values[0].Single];
  };

  return {
    prove,
  };
}
