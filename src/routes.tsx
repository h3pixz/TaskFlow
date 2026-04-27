import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: AuthPage,
    },
    {
        path: "/dashboard",
        Component: DashboardPage,
    }
])
