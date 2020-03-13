// Core Components
import Users from "../views/Users/Users";
import CreateUser from "../views/Users/CreateUser";
import UpdateUser from "../views/Users/UpdateUser";
import UpdateAuth from "../views/Users/UpdateAuth";
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
import Roadmaps from "../views/Roadmaps/Roadmaps";
import CreateRoadmap from "../views/Roadmaps/CreateRoadmap";
import UpdateRoadmap from "../views/Roadmaps/UpdateRoadmap";
import DetailsRoadmap from "../views/Roadmaps/DetailsRoadmap";

var ThemeRoutes = [
  // Users
  {
    path: "/admin/users",
    name: "Usuarios",
    icon: "mdi mdi-clipboard-check",
    component: Users
  },
  {
    path: "/admin/users/create",
    name: "Crear Usuario",
    component: CreateUser,
    hidden: true
  },
  {
    path: "/admin/users/update",
    name: "Actualizar Usuario",
    component: UpdateUser,
    hidden: true
  },
  {
    path: "/admin/users/auth",
    name: "Actualizar Acceso del Usuario",
    component: UpdateAuth,
    hidden: true
  },
  {
    path: "/admin/chauffeurs",
    name: "Choferes",
    icon: "mdi mdi-face",
    component: Chauffeurs
  },
  {
    path: "/admin/chauffeurs/create",
    name: "Crear Chofer",
    component: CreateChauffeur,
    hidden: true
  },
  {
    path: "/admin/chauffeurs/update",
    name: "Actualizar Chofer",
    component: UpdateChauffeur,
    hidden: true
  },
  {
    path: "/admin/chauffeurs/details",
    name: "Detalles Chofer",
    component: DetailsChauffeur,
    hidden: true
  },
  // Vehicles
  {
    path: "/admin/vehicles",
    name: "Vehiculos",
    icon: "mdi mdi-truck-delivery",
    component: Vehicles
  },
  {
    path: "/admin/vehicles/create",
    name: "Crear Vehiculo",
    component: CreateVehicle,
    hidden: true
  },
  {
    path: "/admin/vehicles/update",
    name: "Actualizar Vehiculo",
    component: UpdateVehicle,
    hidden: true
  },
  {
    path: "/admin/vehicles/details",
    name: "Detalles Vehiculo",
    component: DetailsVehicle,
    hidden: true
  },
  // Business
  {
    path: "/admin/business",
    name: "Empresas",
    component: Business,
    icon: "mdi mdi-home"
  },
  {
    path: "/admin/business/create",
    name: "Crear Empresa",
    component: CreateBusiness,
    hidden: true
  },
  {
    path: "/admin/business/update",
    name: "Actualizar Empresa",
    component: UpdateBusiness,
    hidden: true
  },
  // Managers
  {
    path: "/admin/business/managers",
    name: "Encargados",
    component: Managers,
    hidden: true
  },
  {
    path: "/admin/business/managers/create",
    name: "Crear Encargados",
    component: CreateManager,
    hidden: true
  },
  {
    path: "/admin/business/managers/update",
    name: "Actualizar Encargados",
    component: UpdateManager,
    hidden: true
  },
  // Roadmap
  {
    path: "/admin/roadmaps",
    name: "Hojas de Rutas",
    icon: "mdi mdi-map",
    component: Roadmaps
  },
  {
    path: "/admin/roadmaps/create",
    name: "Crear Hoja de Rutas",
    component: CreateRoadmap,
    hidden: true
  },
  {
    path: "/admin/roadmaps/update",
    name: "Actualizar Hoja de Rutas",
    component: UpdateRoadmap,
    hidden: true
  },
  {
    path: "/admin/roadmaps/details",
    name: "Detalles Hoja de Ruta",
    component: DetailsRoadmap,
    hidden: true
  },
  // Redirect
  {
    path: "/admin",
    pathTo: "/admin/chauffeurs",
    name: "Choferes",
    redirect: true
  }
];

export default ThemeRoutes;
