import config from "@/lib/config";
import Token from "./Token";

export default function TokenList() {
  const resolvedTokenList = [];

  config.chains.forEach((chain) => {
    chain.tokens.forEach((token) => {
      if (resolvedTokenList.length === 0) {
        resolvedTokenList.push({
          chainId: [chain.chainId],
          token: token,
        });
        return;
      }

      const resolvedToken = resolvedTokenList.find(
        (resolvedToken) => resolvedToken.token.id === token.id
      );

      if (resolvedToken) {
        resolvedToken.chainId.push(chain.chainId);
      } else {
        resolvedTokenList.push({
          chainId: [chain.chainId],
          token: token,
        });
      }
    });
  });

  return (
    <div className="flex w-full flex-col gap-10 mt-10">
      {resolvedTokenList.map((resolvedToken, index) => (
        <Token
          key={index}
          resolvedToken={resolvedToken}
          isLast={index === resolvedTokenList.length - 1}
        />
      ))}
    </div>
  );
}
