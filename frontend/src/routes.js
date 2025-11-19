import { createBrowserRouter } from "react-router";
import IndexPage from "./pages/IndexPage";
import MainLayout from "./pages/MainLayout";
import PostItemPage from "./pages/PostItemPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/loginPage";


export const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: IndexPage,
            },
            {
                path: '/posts/:id',
                Component: PostItemPage
            },
            {
                path: '/register',
                Component: RegisterPage
            },
            {
                path: '/profile',
                Component: ProfilePage
            },
            {
                path: '/login',
                Component: LoginPage
            }
        ]
    }
]);