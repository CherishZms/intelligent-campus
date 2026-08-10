import {post} from '@/utils/request'

type UserType = {
  username:string,
  password:string
}

export function login(params:UserType){
  return post("/login",params)
}