import { lazy } from "react";

const Signup = lazy(() => import("../pages/SignupPage"));
const ChangePassword = lazy(() => import("../pages/SignupPage/ChangePassword"));
const routes = [
  { name: "Register", path: "/", element: <Signup /> },

  {
    name: "Change Password",
    path: "/reset-password/:password_reset_token",
    element: <ChangePassword />,
  },
];

export default routes;
