import { post } from "@/utils/request";

export const getEqListApi = (data?:any)=>{
  return post('/getEquipList',data)
}