import Starter from "../views/starter/starter.jsx";
// ui components
import Alerts from "../views/ui-components/alert.jsx";
import Badges from "../views/ui-components/badge.jsx";
import Buttons from "../views/ui-components/button.jsx";
import Cards from "../views/ui-components/cards.jsx";
import LayoutComponent from "../views/ui-components/layout.jsx";
import PaginationComponent from "../views/ui-components/pagination.jsx";
import PopoverComponent from "../views/ui-components/popover.jsx";
import TooltipComponent from "../views/ui-components/tooltip.jsx";

// Core Components
import Chauffeurs from "../views/Chauffeurs/Chauffeurs";
import CreateChauffeur from "../views/Chauffeurs/CreateChauffeur";
import UpdateChauffeur from "../views/Chauffeurs/UpdateChauffeur";
import DetailsChauffeur from "../views/Chauffeurs/DetailsChauffeur";
import Vehicles from "../views/Vehicles/Vehicles";
import CreateVehicle from "../views/Vehicles/CreateVehicle";
import UpdateVehicle from "../views/Vehicles/UpdateVehicle";
import DetailsVehicle from "../views/Vehicles/DetailsVehicle";
import Business from "../views/Business/Business";
import CreateBusiness from "../views/Business/CreateBusiness";
import UpdateBusiness from "../views/Business/UpdateBusiness";
import Managers from "../views/Business/Managers/Managers";
import CreateManager from "../views/Business/Managers/CreateManager";
import UpdateManager from "../views/Business/Managers/UpdateManager";

var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi mdi-gauge",
    component: Starter
  },
  // Chauffeurs
  {
    path: "/chauffeurs",
    name: "Choferes",
    icon: "mdi mdi-face",
    component: Chauffeurs
  },
  {
    path: "/chauffeurs/create",
    name: "Crear Chofer",
    component: CreateChauffeur,
    hidden: true
  },
  {
    path: "/chauffeurs/update",
    name: "Actualizar Chofer",
    component: UpdateChauffeur,
    hidden: true
  },
  {
    path: "/chauffeurs/details",
    name: "Detalles Chofer",
    component: DetailsChauffeur,
    hidden: true
  },
  // Vehicles
  {
    path: "/vehicles",
    name: "Vehiculos",
    icon: "mdi mdi-truck-delivery",
    component: Vehicles
  },
  {
    path: "/vehicles/create",
    name: "Crear Vehiculo",
    component: CreateVehicle,
    hidden: true
  },
  {
    path: "/vehicles/update",
    name: "Actualizar Vehiculo",
    component: UpdateVehicle,
    hidden: true
  },
  {
    path: "/vehicles/details",
    name: "Detalles Vehiculo",
    component: DetailsVehicle,
    hidden: true
  },
  // Business
  {
    path: "/business",
    name: "Empresas",
    component: Business,
    icon: "mdi mdi-home"
  },
  {
    path: "/business/create",
    name: "Crear Empresa",
    component: CreateBusiness,
    hidden: true
  },
  {
    path: "/business/update",
    name: "Actualizar Empresa",
    component: UpdateBusiness,
    hidden: true
  },
  // Managers
  {
    path: "/business/managers",
    name: "Encargados",
    component: Managers,
    hidden: true
  },
  {
    path: "/business/managers/create",
    name: "Crear Encargados",
    component: CreateManager,
    hidden: true
  },
  {
    path: "/business/managers/update",
    name: "Actualizar Encargados",
    component: UpdateManager,
    hidden: true
  },
  // Roadmap
  {
    path: "/chauffeurs",
    name: "Hojas de Rutas",
    icon: "mdi mdi-map",
    component: Chauffeurs
  },

  // // Managers
  // {
  //   path: "/chauffeurs",
  //   name: "Encargados",
  //   icon: "mdi mdi-voice",
  //   component: Chauffeurs
  // },
  {
    path: "/alert",
    name: "Alerts",
    icon: "mdi mdi-comment-processing-outline",
    component: Alerts
  },
  {
    path: "/badge",
    name: "Badges",
    icon: "mdi mdi-arrange-send-backward",
    component: Badges
  },
  {
    path: "/button",
    name: "Buttons",
    icon: "mdi mdi-toggle-switch",
    component: Buttons
  },
  {
    path: "/card",
    name: "Cards",
    icon: "mdi mdi-credit-card-multiple",
    component: Cards
  },
  {
    path: "/grid",
    name: "Grid",
    icon: "mdi mdi-apps",
    component: LayoutComponent
  },
  {
    path: "/pagination",
    name: "Pagination",
    icon: "mdi mdi-priority-high",
    component: PaginationComponent
  },
  {
    path: "/popover",
    name: "Popover",
    icon: "mdi mdi-pencil-circle",
    component: PopoverComponent
  },
  {
    path: "/ui-components/tooltip",
    name: "Toltips",
    icon: "mdi mdi-image-filter-vintage",
    component: TooltipComponent
  },
  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true }
];
export default ThemeRoutes;
