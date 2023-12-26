import { Actions } from "./actions";
import { NavbarLogo } from "./navbar-logo";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <NavbarLogo />
      <Actions />
    </div>
  );
};
