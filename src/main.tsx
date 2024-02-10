import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { adminRoutes, publicRoutes } from "./routes/routes.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import AdminRoute, { AdminDashboardLoader, adminSignInLoader } from "./routes/AdminRoute.tsx";
import AdminSignIn from "./pages/admin/AdminSignIn.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* routes here */}
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="/admin/signin" element={<AdminSignIn />} loader={adminSignInLoader}></Route>
      <Route path="/admin/dashboard" element={<AdminRoute />}>
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} loader={AdminDashboardLoader}/>
        ))}
      </Route>
      
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
