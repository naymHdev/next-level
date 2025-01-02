import Logo from "@/assets/Logo";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <>
      <nav className=" max-w-7xl mx-auto h-16 flex items-center gap-3 px-5">
        <div className=" flex items-center">
          <Logo />
        </div>

        <div className=" ml-auto">
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
