import {post} from "@/utils/request"
import type {DataType} from "@/pages/users/userDataType"

interface SearchUserDataType {
    companyName?: string, //公司名称
    contact?: string, //联系人
    phone?: string, //联系电话
    page:number,
    pageSize:number
}

//获取租户信息
export const getUserListApi = (data:SearchUserDataType)=>{
  return post('/getUserList',data)
}

//删除租户信息
export const deleteUserByIdApi = (data:string)=>{
  return post('/deleteUser',data)
}

//批量删除租户信息
export const batchDeleteUsersByIdApi = (data:React.Key[])=>{
  return post('/deleteUsers',data)
}

// 新增租户信息
export const addUserApi = (data:DataType)=>{
  return post('/addUser',data)
}