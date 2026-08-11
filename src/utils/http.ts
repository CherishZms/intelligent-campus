
import {store} from "@/store";
import axios,{AxiosInstance,InternalAxiosRequestConfig,AxiosResponse} from "axios";

const http:AxiosInstance = axios.create({
  baseURL:"",
  timeout:5000
})

//请求拦截器
http.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
  //请求头携带token
  const {token} = store.getState().authSlice
  if(token){
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})




//响应拦截器
http.interceptors.response.use((response:AxiosResponse)=>{

  if(response.data.code===200){
    return response.data
  }else{
    return Promise.reject(new Error(response.data?.message || "请求失败"))
  }
},
(error)=>{
    // HTTP层面错误（404、500、网络断开等）
    // 可在这里做全局处理，比如 401 代表token过期，自动跳登录页
    // if(error.response?.status === 401){
    //   localStorage.removeItem('token')
    //   // window.location.href = '/login'
    // }
    return Promise.reject(error)
})

export default http