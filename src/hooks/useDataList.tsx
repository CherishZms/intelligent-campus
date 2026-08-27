/**
 * 
 * @param initialSearchParams 搜索框的初始数据
 * @param fetchData 获取数据的方法
 * @param T 搜索框的数据类型
 * @param U 数据的数据类型
 * @param DataFetchType 定义获得数据的函数参数/返回值类型
 * 
 * @returns 
 */

import { useCallback, useEffect, useState } from "react"
import {isValidSearchInput} from '@/utils/IsValidInput'

interface DataFetchType<T>{
  (args:T&{page:number,pageSize:number}):Promise<any>
}

export function useDataList<T extends Record<string,any>,U>(initialSearchParams:T,fetchData:DataFetchType<T>){

  const [page,setPage] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number>(10)
  const [total,setTotal] = useState<number>(0)
  const [dataList,setDataList] = useState<U[]>()
  const [loading,setLoading] = useState<boolean>(false)
  const [searchParams,setSearchParams] = useState<T>(initialSearchParams)

  const getFetchData = useCallback(async ()=>{
    setLoading(true)
    try{
      const {data:{list,total}} = await fetchData({page,pageSize,...searchParams})
      setDataList(list)
      setTotal(total)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  },[page,pageSize,searchParams,fetchData])

  useEffect(()=>{
    getFetchData()
  },[getFetchData])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setSearchParams(pre=>{
      return {
        ...pre,
        [name]:value
      }
    })
  }

  const onChange = (page:number,pageSize:number)=>{
    setPage(page)
    setPageSize(pageSize)
  }

  return {page,pageSize,total,dataList,loading,searchParams,setPage,setPageSize,setTotal,setDataList,setLoading,setSearchParams,getFetchData,handleChange,onChange}
}

export default useDataList