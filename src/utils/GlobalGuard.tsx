// 路由守卫

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

interface GuardType{
  isAllow:boolean, //当前路由需不需要登录
  navigateTo:string, //跳转的路径
  children:React.ReactNode  //接收的路由组件
}


function GlobalGuard({isAllow,navigateTo,children}:GuardType){
  const navigate = useNavigate()

  // token：用户有没有登录
  const {token} = useSelector((state: { authSlice: { token: string | null }})=>state.authSlice)
  const isLogin = token?true:false
  useEffect(()=>{
    if(isAllow!==isLogin){
    //isAllow为true，isLogin为false ===>需要登录但没有登录 ===>满足  ===>跳转到登录navigateTo页
    //isAllow为true，isLogin为true ===>需要登录,且登录了 ===>不满足  ===>跳转到首页
    //isAllow为false，isLogin为false ===>不需要登录,没有登录===>不满足 ===>跳转到登录页
    //isAllow为false，isLogin为true ===>不需要登录但登录了===>满足 ===>跳转到首页navigateTo
    navigate(navigateTo, { replace: true })
  }
  },[isAllow,isLogin,navigateTo,navigate])

  return isAllow===isLogin?<>{children}</>:<></>
}

export default GlobalGuard