import AdminDashboard from "../pages/admin/AdminDashboard";
// import AdminSignIn from "../pages/admin/AdminSignIn";
import Home from "../pages/public/Home";

export const privateRoutes = [

]

export const publicRoutes = [
    {
        path: "",
        element: <Home />
    }
]

export const adminRoutes = [
    {
        path: "",
        element: <AdminDashboard />
    },
    {
        path: "orders",
        element: <AdminDashboard />
    }
]