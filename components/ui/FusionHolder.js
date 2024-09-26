export default function FusionHolder({ children }) {
  return (
    <div className="flex-1 relative overflow-y-auto overflow-x-hidden hide-scroll">
      <div className="absolute w-full">{children}</div>
    </div>
  );
}
