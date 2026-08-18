import { post } from "@/utils/request";
import type { CarListType } from "@/pages/estate/car";

type DelDataType = {
  id:string,
  carNumber:string
}

export const getChargeRecordListApi = (data?:any)=>{
  return post('/getChargeRecordList',data)
}

export const getCarListApi = (data?:any)=>{
  return post('/getCarList',data)
}


export const deleteCarItemApi = (data:DelDataType)=>{
  return post('/deleteCar',data)
}

export const updateCarApi = (data:CarListType)=>{
  return post('/updateCar',data)
}

export const searchApi = (data:{search:string})=>{
  return post('/search',data)
}