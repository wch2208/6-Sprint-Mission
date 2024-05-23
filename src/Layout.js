import { Outlet } from "react-router-dom";
import Nav from "./components/common/Nav";
import "./Layout.css";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default Layout;
