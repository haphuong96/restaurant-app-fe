import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import { UserTokens } from "../features/auth/types";

const AdminRoute = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const isLoggedIn = (): boolean => {
  const token: string | null = localStorage.getItem("profile");
  return !!(token ? (JSON.parse(token) as UserTokens)?.access : "");
};

  // accesstoken yes: --> vô signin: vô dashboard
  //                  --> vô dashboard: vô dashboard
  // accesstoken no: --> vô signin: vô signin
  //                 --> vô dashboard: vô signin
export const adminSignInLoader = () => {
  return isLoggedIn() ? redirect("/admin/dashboard") : null;
};

export const AdminDashboardLoader = () => {
  return isLoggedIn() ? null : redirect("/admin/signin");
};

export default AdminRoute;
