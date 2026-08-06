import { createBrowserRouter } from "react-router-dom";
import React from "react";

const Home = React.lazy(()=>import("../pages/home"))
const Login = React.lazy(()=>import("../pages/login"))
const NotFound = React.lazy(()=>import("../pages/notFound"))
const router = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'*',
    element:<NotFound />
  }
])

export default router