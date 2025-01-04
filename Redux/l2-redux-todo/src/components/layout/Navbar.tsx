import Logo from "@/assets/Logo";
import { ModeToggle } from "../mode-toggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className=" max-w-7xl mx-auto h-16 flex items-center gap-3 px-5">
        <div className=" flex items-center">
          <Logo />
          <div className=" flex items-center px-4 gap-4 font-medium">
            <Link to="/">Task</Link>
            <Link to="/user">Users</Link>
          </div>
        </div>

        <div className=" ml-auto">
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
