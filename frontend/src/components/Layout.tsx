import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import { useAuth } from "../contexts/authContext";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      <main>
        <Outlet />
      </main>
     
    </div>
  );
};

export default Layout;