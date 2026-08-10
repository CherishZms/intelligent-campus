import { createBrowserRouter } from "react-router-dom";
import React from "react";
import GlobalGuard from "@/utils/GlobalGuard";

const Home = React.lazy(()=>import("../pages/home"))
const Login = React.lazy(()=>import("../pages/login"))
const NotFound = React.lazy(()=>import("../pages/notFound"))
const router = createBrowserRouter([
  {
    path:'/',
    element:<GlobalGuard isAllow={true} navigateTo="/login"><Home /></GlobalGuard>
  },
  {
    path:'/login',
    element:<GlobalGuard isAllow={false} navigateTo="/"><Login /></GlobalGuard>
  },
  {
    path:'*',
    element:<NotFound />
  }
])

export default router