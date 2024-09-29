import TokenList from "./tokens/TokenList";

export default function DashboardTokens() {
  return (
    <div className="w-full flex-col mt-10 gap-5">
      <h2 className="font-light dark:text-white">Tokens</h2>
      <TokenList />
    </div>
  );
}
