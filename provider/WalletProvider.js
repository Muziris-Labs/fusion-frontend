"use client";

import useWallet from "@/hooks/useWallet";
import { useEffect } from "react";

export default function WalletProvider({ children }) {
  const {
    getDomain,
    loadAddresses,
    loadTransactions,
    loadMarketData,
    loadConversionData,
    listenForBalance,
  } = useWallet();

  useEffect(() => {
    const domain = getDomain();

    if (domain) {
      loadAddresses();
      loadTransactions();
      loadMarketData();
      loadConversionData();
      listenForBalance();
    }
  }, []);

  return children;
}
