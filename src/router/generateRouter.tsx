import { RouteObject } from "react-router-dom"
import {routerMap} from './routerMap'
type MenuListType = {
  key:string,
  label:string,
  icon:string,
  children?:MenuListType[]
}


// 处理后端返回的动态路由 转化成路由表格式
export const genterateRouter = (data:MenuListType[]):RouteObject[]=>{
  return data.map(item=>{
    const hasChildren = item.children?.length?true:false
    const obj:RouteObject ={
      path:item.key,
      element:hasChildren?null:routerMap[item.key as keyof typeof routerMap],
    }
    if(hasChildren && item.children){
      obj.children = genterateRouter(item.children)
    }
    return obj
  })
}