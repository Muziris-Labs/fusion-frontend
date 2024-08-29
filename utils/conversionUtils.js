import config from "@/lib/config";

const calculateTotalBalance = (tokenConversionData, tokenBalanceData) => {
  let total = 0;

  tokenBalanceData.forEach((chain) => {
    chain.chainData.forEach((token) => {
      const conversionChain = tokenConversionData.find(
        (conversion) => conversion.chainId === chain.chainId
      );

      const currentChain = config.chains.find(
        (chain) => chain.chainId === chain.chainId
      );

      if (conversionChain && currentChain) {
        const conversionToken = conversionChain.chainData.find(
          (conversion) => conversion.address === token.address
        );

        const currentToken = currentChain.tokens.find(
          (T) => T.address === token.address
        );

        if (conversionToken && currentToken) {
          total +=
            (token.balance / 10 ** currentToken.decimals) *
            conversionToken.value;
        }
      }
    });
  });

  return total;
};

const calculateChainBalance = (
  chain,
  tokenConversionData,
  tokenBalanceData
) => {
  let total = 0;

  tokenBalanceData.forEach((chainData) => {
    if (chainData.chainId === chain.chainId) {
      chainData.chainData.forEach((token) => {
        const conversionChain = tokenConversionData.find(
          (conversion) => conversion.chainId === chain.chainId
        );

        const currentChain = config.chains.find(
          (chain) => chain.chainId === chain.chainId
        );

        if (conversionChain && currentChain) {
          const conversionToken = conversionChain.chainData.find(
            (conversion) => conversion.address === token.address
          );

          const currentToken = currentChain.tokens.find(
            (T) => T.address === token.address
          );

          if (conversionToken && currentToken) {
            total +=
              (token.balance / 10 ** currentToken.decimals) *
              conversionToken.value;
          }
        }
      });
    }
  });

  return total;
};

const usdToEth = (totalBalance, tokenConversionData) => {
  let ethToken = null;

  config.chains.forEach((chain) => {
    let token = chain.tokens.find((token) => token.symbol === "ETH");
    if (token) {
      ethToken = token;
    }
  });

  if (!ethToken) return 0;

  let conversionValue = 0;

  tokenConversionData.forEach((chain) => {
    chain.chainData.forEach((conversion) => {
      if (conversion.address === ethToken.address) {
        conversionValue = conversion.value;
      }
    });
  });

  if (!conversionValue || conversionValue === 0) return 0;

  return totalBalance / conversionValue;
};

export { calculateTotalBalance, usdToEth, calculateChainBalance };
