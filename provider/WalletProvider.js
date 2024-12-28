"use client";

import useWallet from "@/hooks/useWallet";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function WalletProvider({ children }) {
  const {
    getDomain,
    loadAddresses,
    loadTransactions,
    loadConversionData,
    listenForBalance,
    loadUser,
  } = useWallet();
  const walletAddress = useSelector((state) => state.user.walletAddress);

  useEffect(() => {
    const domain = getDomain();

    if (domain) {
      loadAddresses();
      loadUser();
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      loadTransactions();
      loadConversionData();
      listenForBalance();
    }
  }, [walletAddress]);

  return children;
}
