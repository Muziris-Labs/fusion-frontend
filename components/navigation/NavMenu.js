import NavList from "./NavList";
import NavLogo from "./NavLogo";

export default function NavMenu() {
  return (
    <nav>
      <NavList>
        <li className="w-20 h-20 rounded-full hover:cursor-pointer bg-black flex items-center justify-center group">
          <NavLogo />
        </li>
      </NavList>
    </nav>
  );
}
