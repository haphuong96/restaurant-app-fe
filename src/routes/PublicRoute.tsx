import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/shared/PublicNavbar";

const PublicRoute = () => {
  return (
    <div>
      <PublicNavbar />
      <Outlet />
    </div>
  );
};

export default PublicRoute;