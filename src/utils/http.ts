import axios,{AxiosInstance,InternalAxiosRequestConfig,AxiosResponse} from "axios";

const http:AxiosInstance = axios.create({
  baseURL:"",
  timeout:5000
})

//请求拦截器
http.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
  return config
})




//响应拦截器
http.interceptors.response.use((response:AxiosResponse)=>{
  return response
})

export default http