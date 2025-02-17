"use client";

import useWallet from "@/hooks/useWallet";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import config from "@/lib/config";

export default function WalletProvider({ children }) {
  const {
    getDomain,
    loadAddresses,
    loadTransactions,
    loadConversionData,
    listenForBalance,
    loadUser,
    checkForDefaultToken,
  } = useWallet();
  const walletAddress = useSelector((state) => state.user.walletAddress);

  useEffect(() => {
    if (config.chains.length === 0) return;

    const domain = getDomain();

    if (domain) {
      loadAddresses();
      loadUser();
      checkForDefaultToken();
    }
  }, [config]);

  useEffect(() => {
    if (config.chains.length === 0) return;

    if (walletAddress) {
      loadTransactions();
      loadConversionData();
      listenForBalance();
    }
  }, [walletAddress, config]);

  if (config.chains.length === 0) return null;

  return children;
}
