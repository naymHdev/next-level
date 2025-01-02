import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
