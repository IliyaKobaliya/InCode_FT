import Person from "@material-ui/icons/Person";
// core components/views
import SignUp from "views/SignUP/SignUp";
import SignIn from "views/SignIn/SignIn";

const dashboardRoutesAuth = [
  {
    path: "/SignIn",
    sidebarName: "Sign In",
    navbarName: "Sign In",
    icon: Person,
    component: SignIn
  },
  {
    path: "/SignUp",
    sidebarName: "Sign Up",
    navbarName: "Sign Up",
    icon: Person, 
    component: SignUp
  }
  // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutesAuth;
