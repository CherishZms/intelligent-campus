import { post } from "@/utils/request";

interface SearchDataType {
  pageSize?:number,
  page?:number,
  repairStatus?:string,
  repairMajor?:string,
  keyword?:string
}

export const getRepairListApi =(data?:SearchDataType)=>{
  return post('/getRepairList',data)
}