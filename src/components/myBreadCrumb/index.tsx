/*
  面包屑组件
    把对应的路由路径转化成[{title:xxx},{title:xxx}]
*/
import { useLocation } from "react-router-dom"
import { useSelector, UseSelector } from "react-redux"
import {Breadcrumb} from 'antd'

interface menuListType{
  key:string,
  label:string,
  children:menuListType[]
}

function handleMenuListToStingList(path:string,menuList:menuListType[]):string[]{
  const res:string[] = []
  function handle(p:string,list:menuListType[]):string[]{

    for(let item of list){
      if(p.startsWith(item.key)){
        res.push(item.label)
      }
      if(item.children){
        handle(p,item.children)
      }
    }
    return res
  }

  return handle(path,menuList)
}


function MyBreadCrumb(){
  const pathname = useLocation().pathname
  // console.log('pathname',pathname)
  const menuList = useSelector((state:any)=>state.authSlice.asyncRouterList)
  // console.log('menuList',menuList)
  const items = handleMenuListToStingList(pathname,menuList).map(item=>({title:item}))
  // console.log(title)
  return (
    <Breadcrumb items={items} className="mt  mr mb" />
  )
}

export default MyBreadCrumb