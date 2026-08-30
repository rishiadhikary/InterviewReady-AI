import { createBrowserRouter } from "react-router";

import Login from "./features/auth/component/Login";
import Register from "./features/auth/pages/register";
import Protected from "./features/auth/component/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/interview";
import Demo from "./Demo";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/register",
        element: <Register />,
    },

    {
        path: "/interview/:interviewId",
        element: (
            <Protected>
                <Interview />
            </Protected>
        ),
    },

    {
        path: "/demo",
        element: <Demo />,
    },
]);