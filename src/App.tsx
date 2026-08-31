import { redirect, RouterProvider } from "react-router-dom";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { genterateRouter } from '@/router/generateRouter'
import {defaultRouters} from '@/router/defaultRouter'
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import { Skeleton, Spin } from "antd";

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
  const [loading,setLoading] = useState<boolean>(false)
  useEffect(()=>{
    if(token && asyncRouterList && asyncRouterList.length>0){
      getMenuList()
    }
  },[token,asyncRouterList])
  const router = useMemo(()=>{
    return createBrowserRouter(routersList)
  },[routersList])
  function getMenuList(){
    setLoading(true)
      const route = genterateRouter(asyncRouterList)
      // console.log('111',route)
      const routes:RouteObject[] = [...routersList]
      // 加入index索引路由，访问 / 自动重定向dashboard
      routes[0].children = [
      {
        index: true,
        loader: () => redirect('/dashboard'),
        hydrateFallbackElement:<div>loading</div>
      },
      ...route
    ]
      // if(route[0].children){
      //   const red:string = routes[0].children[0].path !
      //   routes[0].loader = ()=>redirect(red)
      // }
      // console.log(routes)
      setRoutersList(routes)
      setLoading(false)
  }
  
  return (
    // <Suspense fallback={<Skeleton active loading={loading} />}>
    <Suspense fallback={<Spin className="spin"/>}>
      {/*增加key，强制重置路由 */}
      <RouterProvider router={router} key={router} />
    </Suspense>
  );
}

export default App;
