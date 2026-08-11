import { RouterProvider } from "react-router-dom";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { genterateRouter } from '@/router/generateRouter'
import {defaultRouters} from '@/router/defaultRouter'
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";

/*
  React.lazy要搭配Supense一起使用
*/

// 动态路由
// createBrowerRouter是只会在mount一次生成，即使router发生变化也不会重新创建路由实例，不能直接写进jsx中
//使用userMemo缓存router实例


function App() {
  const [routersList,setRoutersList] = useState(defaultRouters)
  const token = useSelector((state:any)=>state.authSlice.token)
  const {asyncRouterList} = useSelector((state:any)=>state.authSlice)
  useEffect(()=>{
    if(token && asyncRouterList && asyncRouterList.length>0){
      getMenuList()
    }
  },[token,asyncRouterList])
  const router = useMemo(()=>{
    return createBrowserRouter(routersList)
  },[routersList])
  function getMenuList(){
      const route = genterateRouter(asyncRouterList)
      const routes:RouteObject[] = [...routersList]
      routes[0].children = route
      if(route[0].children){
        routes[0].children[0].index = true
      }
      console.log(routes)
      setRoutersList(routes)
  }
  
  return (
    <Suspense fallback={<h1>加载中</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
