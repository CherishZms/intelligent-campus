import { post } from "@/utils/request";

export const getBillListApi = (data?:any)=>{
  return post('/getbillList',data)
}