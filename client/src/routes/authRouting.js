// Core Components
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import LandingPage from "../views/starter/LandingPage";

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
  },
  {
    path: "/auth/index",
    name: "Index Page",
    component: LandingPage,
    hidden: true
  }
];

export default ThemeRoutes;
