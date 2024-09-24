import NavList from "./NavList";
import Socials from "./Socials";

export default function NavMenu() {
  return (
    <div className="flex flex-col  border-[1px] border-black/10 border-y-0 border-l-0 h-full justify-between">
      <NavList />

      <Socials />
    </div>
  );
}
