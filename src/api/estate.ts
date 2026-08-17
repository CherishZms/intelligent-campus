import { post } from "@/utils/request";
import type {ColumsType} from "@/pages/estate/tenement"
type SearchData = {
  name:string,
  person:string,
  page:number,
  pageSize:number
}

// 获取楼宇列表
export const getEstateList =(data:SearchData)=>{
  return post('/estateList',data)
}

//删除楼宇
export const deleteEstate = (data:{id:string,name:string})=>{
  return post('/deleteEstate',data)
}

//更新楼宇
export const updataEstateSerive = (data:ColumsType)=>{
  return post('/updataEstate',data)
}