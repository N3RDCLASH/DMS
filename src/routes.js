// core components
import Dashboard from "views/admin/Dashboard.js";
import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Users from "views/admin/Users/Users.js";
// import Register from "views/auth/Register.js";
// import Tables from "views/admin/Tables.js";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CloudUpload from "@material-ui/icons/CloudUpload";

// import Dns from "@material-ui/icons/Dns";
// import FlashOn from "@material-ui/icons/FlashOn";
// import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import Grain from "@material-ui/icons/Grain";
import LocationOn from "@material-ui/icons/LocationOn";
// import Palette from "@material-ui/icons/Palette";
import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import VpnKey from "@material-ui/icons/VpnKey";
import FileUpload from "views/admin/FileUpload";
import SingleUser from "views/admin/Users/SingleUser";
import SingleRole from "views/admin/Roles/SingleRole";
import Roles from "views/admin/Roles/Roles";

var routes = [

  {
    path: "/home",
    name: "Dashboard",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/app",
    sidebar: true
  },
  {
    path: "/icons",
    name: "Icons",
    icon: Grain,
    iconColor: "Primary",
    component: Icons,
    layout: "/app",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    iconColor: "Warning",
    component: Maps,
    layout: "/app",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: Person,
    iconColor: "WarningLight",
    component: Profile,
    layout: "/app",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: FormatListBulleted,
  //   iconColor: "Error",
  //   component: Tables,
  //   layout: "/app",
  // },
  {
    path: "/login",
    name: "Login",
    icon: VpnKey,
    iconColor: "Info",
    component: Login,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: AccountCircle,
  //   iconColor: "ErrorLight",
  //   component: Register,
  //   layout: "/auth",
  // },
  {
    path: "/upload",
    name: "Upload",
    icon: CloudUpload,
    iconColor: "Success",
    component: FileUpload,
    layout: "/app",
    sidebar: true
  },
  {
    path: "/users",
    name: "Users",
    icon: AccountCircle,
    iconColor: "Success",
    component: Users,
    layout: "/app",
    sidebar: true,
    exact: true
  },
  {
    path: "/users/:id",
    name: "Single User",
    iconColor: "Success",
    component: SingleUser,
    layout: "/app",
    // sidebar: true
  },
  {
    path: "/roles",
    name: "Roles",
    icon: SupervisedUserCircleIcon,
    iconColor: "Success",
    component: Roles,
    layout: "/app",
    sidebar: true,
    exact: true
  },
  {
    path: "/roles/:id",
    name: "Single Role",
    iconColor: "Success",
    component: SingleRole,
    layout: "/app",
    // sidebar: true
  },

];
export default routes;
