import GlobalGuard from "@/utils/GlobalGuard";
import React from "react";
import { RouteObject } from "react-router-dom";

const Home = React.lazy(()=>import("../pages/home"))
const Login = React.lazy(()=>import("../pages/login"))
const NotFound = React.lazy(()=>import("../pages/notFound"))
export const defaultRouters:RouteObject[] =[
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
]