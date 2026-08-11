import {post,get} from '@/utils/request'

type UserType = {
  username:string,
  password:string
}

// 用户登录
export function login(params:UserType){
  return post("/login",params)
}

//获取菜单
export function getMenu(){
  return get("/getMenu")
}