import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

export default [
    {
      path: "/",
      exact: true,
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
];
