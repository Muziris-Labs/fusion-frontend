import { ethers } from "ethers";
import baseConfig from "@/lib/baseConfig";
import { useSearchParams } from "next/navigation";
import config from "@/lib/config";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeployed,
  setHistory,
  setMarketData,
  setTokenBalanceData,
  setTokenConversionData,
  setWalletAddress,
  setWalletAddresses,
} from "@/redux/slice/UserSlice";
import axios from "axios";

export default function useWallet() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const history = useSelector((state) => state.user.history);

  const getDomain = () => {
    const domain = searchParams.get("domain");
    return domain;
  };

  const getFusion = async (domain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(baseConfig.rpcUrl);

      const factory = new ethers.Contract(
        baseConfig.deployments.FusionProxyFactory.address,
        baseConfig.deployments.FusionProxyFactory.abi,
        provider
      );

      const fusionProxy = await factory.getFusionProxy(domain + ".fusion.id");

      return fusionProxy;
    } catch (error) {
      console.log(error);
      return ethers.constants.AddressZero;
    }
  };

  const getFusionAddress = async (chain, domain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

      const factory = new ethers.Contract(
        chain.deployments.FusionProxyFactory.address,
        chain.deployments.FusionProxyFactory.abi,
        provider
      );

      const fusionProxy = await factory.getFusionProxy(domain + ".fusion.id");

      return fusionProxy;
    } catch {
      return ethers.constants.AddressZero;
    }
  };

  const loadAddresses = async () => {
    const domain = getDomain();

    if (!domain) return;

    let addresses = [];

    await Promise.all(
      config.chains.map(async (chain) => {
        const address = await getFusionAddress(chain, domain);

        const isBase = chain.chainId === baseConfig.chainId;

        if (isBase && address !== ethers.constants.AddressZero) {
          console.log(address);
          dispatch(setWalletAddress(address));
          dispatch(setDeployed(true));
        }

        addresses = [...addresses, { chainId: chain.chainId, address }];
        dispatch(setWalletAddresses(addresses));
      })
    );

    return addresses;
  };

  const loadTransactions = async () => {
    try {
      const domain = getDomain();

      if (!domain) return;

      let transaction = [];

      await Promise.all(
        config.chains.map(async (chain) => {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/transactions/${
              chain.chainId
            }/${domain + ".fusion.id"}`
          );

          if (response.data.success) {
            transaction = [
              ...transaction,
              ...response.data.transactions.map((tx) => ({
                ...tx,
                chainId: chain.chainId,
              })),
            ];
          }
        })
      );

      dispatch(setHistory(transaction));
    } catch (error) {
      console.log(error);
      dispatch(setHistory([]));
    }
  };

  const reloadTransaction = async (chainId) => {
    try {
      const domain = getDomain();

      if (!domain) return;

      let transaction = history;

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/v1/misc/transactions/${chainId}/${domain + ".fusion.id"}`
      );

      if (response.data.success) {
        transaction = transaction.filter((tx) => tx.chainId !== chainId);
        transaction = [
          ...transaction,
          ...response.data.transactions.map((tx) => ({
            ...tx,
            chainId,
          })),
        ];
      }

      dispatch(setHistory(transaction));
    } catch (error) {
      console.log(error);
    }
  };

  const loadMarketData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/marketData`
      );

      if (response.data.success) {
        dispatch(setMarketData(response.data.data));
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const convertBalance = async (id, convert_id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/conversion?convert_id=${convert_id}&id=${id}`
      );

      if (response.data.status.error_code !== "0") {
        return 0;
      }

      return response.data.data.quote[0].price;
    } catch (error) {
      return 0;
    }
  };

  const loadConversionData = async () => {
    try {
      let conversionData = [];

      await Promise.all(
        config.chains.map(async (chain) => {
          let chainData = [];

          await Promise.all(
            chain.tokens.map(async (token) => {
              const conversion = await convertBalance(
                token.id,
                chain.utils.usd_id
              );

              chainData.push({
                value: conversion,
                address: token.address,
              });
            })
          );

          conversionData.push({
            chainId: chain.chainId,
            chainData,
          });
        })
      );

      dispatch(setTokenConversionData(conversionData));
    } catch (error) {
      console.log(error);
    }
  };

  const initializeBalance = async () => {
    let balanceData = [];

    await Promise.all(
      config.chains.map(async (chain) => {
        let chainData = [];

        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
        const domain = getDomain();
        const walletAddress = await getFusionAddress(chain, domain);

        if (walletAddress !== ethers.constants.AddressZero) {
          const ethBalance = await provider.getBalance(walletAddress);

          chainData.push({
            address: ethers.constants.AddressZero,
            balance: Number(ethBalance),
          });

          const tokens = chain.tokens;

          await Promise.all(
            tokens.map(async (token) => {
              if (
                !token.address ||
                token.address === ethers.constants.AddressZero
              ) {
                return;
              }

              const contract = new ethers.Contract(
                token.address,
                ["function balanceOf(address) view returns (uint256)"],
                provider
              );

              const balance = await contract.balanceOf(walletAddress);

              chainData.push({
                address: token.address,
                balance: Number(balance),
              });
            })
          );

          balanceData.push({
            chainId: chain.chainId,
            chainData,
          });
        }
      })
    );

    dispatch(setTokenBalanceData(balanceData));

    return balanceData;
  };

  const listenForBalance = async () => {
    let tokenBalanceData = await initializeBalance();

    console.log("Listening for balance");

    await Promise.all(
      config.chains.map(async (chain) => {
        const WsProvider = new ethers.providers.WebSocketProvider(chain.wsUrl);

        const domain = getDomain();
        const walletAddress = await getFusionAddress(chain, domain);

        WsProvider.on("block", async () => {
          const newBalance = Number(await WsProvider.getBalance(walletAddress));

          console.log(newBalance);

          if (!tokenBalanceData) {
            return;
          }

          const updatedBalanceData = tokenBalanceData.map((chainData) => {
            if (chainData.chainId === chain.chainId) {
              return {
                ...chainData,
                chainData: chainData.chainData.map((tokenData) => {
                  if (
                    tokenData.address === ethers.constants.AddressZero &&
                    tokenData.balance !== newBalance
                  ) {
                    return {
                      ...tokenData,
                      balance: newBalance,
                    };
                  } else {
                    return tokenData;
                  }
                }),
              };
            } else {
              return chainData;
            }
          });

          tokenBalanceData = updatedBalanceData;

          console.log(tokenBalanceData, updatedBalanceData);

          dispatch(setTokenBalanceData(tokenBalanceData));
        });

        const tokens = chain.tokens;

        await Promise.all(
          tokens.map(async (token) => {
            if (
              !token.address ||
              token.address === ethers.constants.AddressZero
            ) {
              return;
            }

            const contract = new ethers.Contract(
              token.address,
              [
                "function balanceOf(address) view returns (uint256)",
                "event Transfer(address indexed from, address indexed to, uint256 value)",
              ],
              WsProvider
            );

            contract.on("Transfer", async (from, to, value) => {
              if (to === walletAddress || from === walletAddress) {
                const currentBalance = await contract.balanceOf(walletAddress);

                const updatedBalanceData = tokenBalanceData.map((chainData) => {
                  if (chainData.chainId === chain.chainId) {
                    return {
                      ...chainData,
                      chainData: chainData.chainData.map((tokenData) => {
                        if (tokenData.address === token.address) {
                          return {
                            ...tokenData,
                            balance: Number(currentBalance),
                          };
                        } else {
                          return tokenData;
                        }
                      }),
                    };
                  } else {
                    return chainData;
                  }
                });

                tokenBalanceData = updatedBalanceData;

                dispatch(setTokenBalanceData(tokenBalanceData));
              }
            });
          })
        );
      })
    );
  };

  return {
    getFusion,
    getDomain,
    getFusionAddress,
    loadAddresses,
    loadTransactions,
    reloadTransaction,
    loadMarketData,
    loadConversionData,
    listenForBalance,
  };
}
