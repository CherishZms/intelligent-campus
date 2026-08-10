import http from "./http";

interface ApiType{
  code:number,
  message:string,
  data?:any
}

export function get(url:string,params?:any):Promise<ApiType>{
  return http.get(url,{params})
}

export function post(url:string,data?:any):Promise<ApiType>{
  return http.post(url,data)
}

export function put(url:string,data?:any):Promise<ApiType>{
  return http.put(url,data)
}

export function del(url:string,params?:any):Promise<ApiType>{
  return http.delete(url,{params})
}