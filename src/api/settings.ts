import { post } from "@/utils/request";
import type {SearchType} from "@/pages/settings"

export type SearchDataType ={
  userName:string
}

export const getSystemUserListApi = (data?:any)=>{
  return post('/getSystemUserList',data)
}

export const searchUserApi = (data:SearchType)=>{
  return post('/searchUser',data)
}

export const addUserApi = (data:any)=>{
  return post('/addUser',data)
}

export const getMenuApi = (data:any)=>{
  return post('/getMenu',data)
}

export const deleteUserApi = (data:any)=>{
  return post('/deleteUser',data)
}