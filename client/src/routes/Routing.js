// Core Components
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";

var ThemeRoutes = [
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    hidden: true
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
    hidden: true
  }
];

export default ThemeRoutes;
