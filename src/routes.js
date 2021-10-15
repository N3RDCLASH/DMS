// core components
import Dashboard from "views/admin/Dashboard.js";
// import Icons from "views/admin/Icons.js";
import Login from "views/auth/Login.js";
// import Maps from "views/admin/Maps.js";
import Profile from "views/admin/Profile.js";
import Users from "views/admin/Users/Users.js";
// import Register from "views/auth/Register.js";
// import Tables from "views/admin/Tables.js";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// import CloudUpload from "@material-ui/icons/CloudUpload";

// import Dns from "@material-ui/icons/Dns";
// import FlashOn from "@material-ui/icons/FlashOn";
// import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
// import Grain from "@material-ui/icons/Grain";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Palette from "@material-ui/icons/Palette";
import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import VpnKey from "@material-ui/icons/VpnKey";
// import FileUpload from "views/admin/FileUpload";
import SingleUser from "views/admin/Users/SingleUser";
import SingleRole from "views/admin/Roles/SingleRole";
import Roles from "views/admin/Roles/Roles";
import { InsertDriveFile, Security } from "@material-ui/icons";
import SinglePermission from "views/admin/Permissions/SinglePermission";
import Permissions from "views/admin/Permissions/Permissions";
import Documents from "views/admin/Documents/Documents";
import SingleDocument from "views/admin/Documents/SingleDocument";
import { READ_DOCUMENTS } from "constants/permissionConstants";
import { READ_USER } from "constants/permissionConstants";
import { READ_ROLES } from "constants/permissionConstants";

var routes = [
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: Grain,
  //   iconColor: "ErrorLightLight",
  //   component: Icons,
  //   layout: "/app",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   iconColor: "ErrorLight",
  //   component: Maps,
  //   layout: "/app",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: FormatListBulleted,
  //   iconColor: "ErrorLight",
  //   component: Tables,
  //   layout: "/app",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: AccountCircle,
  //   iconColor: "ErrorLightLight",
  //   component: Register,
  //   layout: "/auth",
  // },

  {
    path: "/home",
    name: "Dashboard",
    icon: Tv,
    iconColor: "PrimaryLight",
    component: Dashboard,
    layout: "/app",
    sidebar: true
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: Person,
    iconColor: "ErrorLight",
    component: Profile,
    layout: "/app",
  },
  {
    path: "/login",
    name: "Login",
    icon: VpnKey,
    iconColor: "Info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/documents",
    name: "Documents",
    icon: InsertDriveFile,
    iconColor: "ErrorLight",
    component: Documents,
    layout: "/app",
    sidebar: true,
    exact: true,
    permission: READ_DOCUMENTS
  },
  {
    path: "/documents/:id",
    name: "Single Document",
    iconColor: "PrimaryLight",
    component: SingleDocument,
    layout: "/app",
    permission: READ_DOCUMENTS
  },
  {
    path: "/users",
    name: "Users",
    icon: AccountCircle,
    iconColor: "PrimaryLight",
    component: Users,
    layout: "/app",
    sidebar: true,
    exact: true,
    permission: READ_USER
  },
  {
    path: "/users/:id",
    name: "Single User",
    iconColor: "ErrorLight",
    component: SingleUser,
    layout: "/app",
    permission: READ_USER
    // sidebar: true
  },
  {
    path: "/roles",
    name: "Roles",
    icon: SupervisedUserCircleIcon,
    iconColor: "ErrorLight",
    component: Roles,
    layout: "/app",
    sidebar: true,
    exact: true,
    permission: READ_ROLES
  },
  {
    path: "/roles/:id",
    name: "Single Role",
    iconColor: "ErrorLight",
    component: SingleRole,
    layout: "/app",
    permission: READ_ROLES
  },
  {
    path: "/permissions",
    name: "Permissions",
    icon: Security,
    iconColor: "PrimaryLight",
    component: Permissions,
    layout: "/app",
    sidebar: true,
    exact: true,
    // permission: READ_PERMISSION
  },
  {
    path: "/permissions/:id",
    name: "Single Permission",
    iconColor: "PrimaryLight",
    component: SinglePermission,
    layout: "/app",
  },

];
export default routes;
