import { post } from "@/utils/request";

interface SearchDataType {
  pageSize?:number,
  page?:number,
  repairStatus?:string,
  repairMajor?:string,
  keyword?:string
}

interface UpdateRepairMajorType {
  repairId:string,
  repairMajor:string
}

export const getRepairListApi =(data?:SearchDataType)=>{
  return post('/getRepairList',data)
}

export const updateRepairMajorApi = (data:UpdateRepairMajorType)=>{
  return post('/updateRepairMajor',data)
}