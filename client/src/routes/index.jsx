import FullLayout from "../layouts/fulllayout";
import Layout from "../layouts/Layout";

var indexRoutes = [
  { path: "/auth", name: "Auth", component: Layout },
  { path: "/admin", name: "Admin", component: FullLayout }
];

export default indexRoutes;
