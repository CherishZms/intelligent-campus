import {post,get} from "@/utils/request"

export const energyStateApi = ()=>{
  return post('/getEneryDetail')
}

export const getEneryYearDetailApi = ()=>{
  return get('/getEneryYearDetail')
}

export const getEneryDataApi = ()=>{
  return get('/getEnergyData')
}

export const getCompanyEnergyDataApi = ()=>{
  return get('/getCompanyEnergyData')
}