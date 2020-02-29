import Fulllayout from "../layouts/fulllayout.jsx";
import AuthLayout from "../layouts/layoutAuth";

var indexRoutes = [
  { path: "/auth", name: "Auth", component: AuthLayout },
  { path: "/", name: "Starter", component: Fulllayout }
];

export default indexRoutes;
