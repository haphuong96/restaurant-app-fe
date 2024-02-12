import { redirect } from "react-router-dom";
import { getUserTokens } from "../features/utils";
import AdminDashboard from "../pages/admin/AdminDashboard";
// import AdminSignIn from "../pages/admin/AdminSignIn";
import Home from "../pages/public/Home";

export const privateRoutes = [];

export const publicRoutes = [
  {
    path: "",
    element: <Home />,
  },
];

export const adminRoutes = [
  {
    path: "",
    element: <AdminDashboard />,
  },
  {
    path: "orders",
    element: <AdminDashboard />,
  },
];

// accesstoken yes: --> vô signin: vô dashboard
//                  --> vô dashboard: vô dashboard
// accesstoken no: --> vô signin: vô signin
//                 --> vô dashboard: vô signin
export const adminSignInLoader = () => {
  return getUserTokens()?.access ? redirect("/admin/dashboard") : null;
};

export const adminDashboardLoader = () => {
  return getUserTokens()?.access ? null : redirect("/admin/signin");
};
