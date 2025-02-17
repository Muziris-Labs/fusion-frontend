import { ethers } from "ethers";
import baseConfig from "@/lib/baseConfig";
import { useSearchParams } from "next/navigation";
import config from "@/lib/config";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultToken,
  setHistory,
  setMarketData,
  setTokenBalanceData,
  setTokenConversionData,
  setUser,
  setWallet,
  setWalletAddress,
  setWalletAddresses,
} from "@/redux/slice/UserSlice";
import axios from "axios";
import { Auth0Client } from "auth0-spa-js";
import { setMailUser as setMUser } from "@/redux/slice/UserSlice";

export default function useWallet() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const history = useSelector((state) => state.user.history);
  const wallet = useSelector((state) => state.user.wallet);

  const getDomain = () => {
    const domain = searchParams.get("domain");
    return domain.toLowerCase();
  };

  let active = false;

  const setMailUser = async () => {
    try {
      const auth0 = new Auth0Client({
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });

      if (active) return;
      active = true;
      const token = await auth0.getTokenSilently();

      if (token) {
        const user = await auth0.getUser();

        dispatch(setMUser(user));
      }
    } catch (error) {
      return false;
    }
  };

  const getFusion = async (domain) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/pubkey/${domain}.fusion.id`
      );

      if (response.data.success) {
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const initializeProofWallet = () => {
    if (!wallet) {
      const newWallet = ethers.Wallet.createRandom();

      dispatch(setWallet(newWallet));

      return newWallet;
    }

    return wallet;
  };

  const getFusionAddress = async (domain) => {
    try {
      const backendResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/index/${
          domain + ".fusion.id"
        }`
      );

      if (!backendResponse.data.success) {
        throw new Error("Failed to deploy wallet.");
      }

      return backendResponse.data.account.address;
    } catch {
      return ethers.constants.AddressZero;
    }
  };

  const getFusionHash = async (domain) => {
    try {
      const domainResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/pubkey/${domain}.fusion.id`
      );

      if (!domainResponse.data.success) {
        return false;
      }

      const pubKey_uncompressed = domainResponse.data.pubkey;

      let pubKey = pubKey_uncompressed.slice(4);
      let pub_key_x = pubKey.substring(0, 64);
      let pub_key_y = pubKey.substring(64);

      const hashresponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/getPubkeyHash`,
        {
          pub_key_x: Array.from(ethers.utils.arrayify("0x" + pub_key_x)),
          pub_key_y: Array.from(ethers.utils.arrayify("0x" + pub_key_y)),
        }
      );

      if (!hashresponse.data.success) {
        return false;
      }

      return hashresponse.data.pubkeyHash;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const loadAddresses = async () => {
    const domain = getDomain();

    if (!domain) return;

    const address = await getFusionAddress(domain);

    dispatch(setWalletAddress(address));

    const addresses = await Promise.all(
      config.chains.map(async (chain) => {
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

        const code = await provider.getCode(address);

        if (code === "0x") {
          return {
            chainId: chain.chainId,
            address: ethers.constants.AddressZero,
          };
        } else {
          return {
            chainId: chain.chainId,
            address,
          };
        }
      })
    );

    dispatch(setWalletAddresses(addresses));
  };

  const loadTransactions = async () => {
    try {
      const domain = getDomain();

      if (!domain) return;

      const walletAddress = await getFusionAddress(domain);

      if (walletAddress === ethers.constants.AddressZero) {
        return;
      }

      const isTestnet = !config.chains[0].isMainnet;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/transactions/${walletAddress}?isTestnet=${isTestnet}`
      );

      if (response.data.success) {
        dispatch(setHistory(response.data.transactions));
      }
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

      const fusionHash = await getFusionHash(domain);

      if (!fusionHash) {
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/misc/transactions/${chainId}/${fusionHash}`
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
    } catch (error) {
      console.log(error);
    }
  };

  const convertBalance = async (id, convert_id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2/conversion?convert_id=${convert_id}&id=${id}`
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
                id: token.id,
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

  const checkForDefaultToken = async () => {
    let defaultToken = localStorage.getItem("defaultToken");

    if (defaultToken === null || defaultToken === undefined) {
      dispatch(setDefaultToken(config.chains[0].tokens[0]));
      localStorage.setItem(
        "defaultToken",
        JSON.stringify(config.chains[0].tokens[0])
      );
      return;
    }

    defaultToken = JSON.parse(defaultToken);

    let isPresent = false;

    config.chains.forEach((chain) => {
      chain.tokens.forEach((token) => {
        if (token.id === defaultToken.id) {
          isPresent = true;
        }
      });
    });

    if (isPresent) {
      dispatch(setDefaultToken(defaultToken));
    } else {
      dispatch(setDefaultToken(config.chains[0].tokens[0]));
    }
  };

  const initializeBalance = async () => {
    let balanceData = [];

    const domain = getDomain();
    const walletAddress = await getFusionAddress(domain);

    await Promise.all(
      config.chains.map(async (chain) => {
        let chainData = [];

        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

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

    const domain = getDomain();
    const walletAddress = await getFusionAddress(domain);

    await Promise.all(
      config.chains.map(async (chain) => {
        const WsProvider = new ethers.providers.WebSocketProvider(chain.wsUrl);

        if (walletAddress !== ethers.constants.AddressZero) {
          WsProvider.on("block", async () => {
            const newBalance = Number(
              await WsProvider.getBalance(walletAddress)
            );

            if (!tokenBalanceData) {
              return;
            }

            let isChanged = false;

            const updatedBalanceData = tokenBalanceData.map((chainData) => {
              if (chainData.chainId === chain.chainId) {
                return {
                  ...chainData,
                  chainData: chainData.chainData.map((tokenData) => {
                    if (
                      tokenData.address === ethers.constants.AddressZero &&
                      tokenData.balance !== newBalance
                    ) {
                      isChanged = true;
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

            if (isChanged) {
              tokenBalanceData = updatedBalanceData;
              dispatch(setTokenBalanceData(tokenBalanceData));
            }
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
                token.address.toLowerCase(),
                [
                  "function balanceOf(address) view returns (uint256)",
                  "event Transfer(address indexed from, address indexed to, uint256 value)",
                ],
                WsProvider
              );

              contract.on("Transfer", async (from, to, value) => {
                if (to === walletAddress || from === walletAddress) {
                  const currentBalance = await contract.balanceOf(
                    walletAddress
                  );

                  const updatedBalanceData = tokenBalanceData.map(
                    (chainData) => {
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
                    }
                  );

                  tokenBalanceData = updatedBalanceData;

                  dispatch(setTokenBalanceData(tokenBalanceData));
                }
              });
            })
          );
        }
      })
    );
  };

  const getNonce = async (currentChain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const domain = getDomain();

      const walletAddress = await getFusionAddress(domain);

      const Fusion = new ethers.Contract(
        walletAddress,
        currentChain.deployments.Fusion.abi,
        provider
      );

      const nonce = await Fusion.getNonce();

      return Number(nonce);
    } catch (error) {
      return 0;
    }
  };

  const getTxHash = async (currentChain) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        currentChain.rpcUrl
      );

      const domain = getDomain();

      const walletAddress = await getFusionAddress(currentChain, domain);

      const Fusion = new ethers.Contract(
        walletAddress,
        currentChain.deployments.Fusion.abi,
        provider
      );

      const txHash = await Fusion.TxHash();

      return txHash;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const loadUser = async () => {
    const domain = getDomain();

    if (!domain) return;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_KMS_URL}/api/v1/utils/user/${domain}.fusion.id`
    );

    if (response.data.success) {
      dispatch(setUser(response.data.user));
    }
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
    initializeProofWallet,
    getNonce,
    getTxHash,
    setMailUser,
    getFusionHash,
    loadUser,
    checkForDefaultToken,
  };
}
