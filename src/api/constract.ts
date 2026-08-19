import { post } from "@/utils/request";

interface DataType{
  page?:number,
  pageSize?:number,
  constranctNo?:string,
  jia?:string,
  status?:string
}

export const getConstractListApi = (data?:DataType)=>{
  return post('/contractList',data)
}