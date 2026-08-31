import { RootState } from "@/store"
import { useSelector } from "react-redux"

export const usePermission = ()=>{
  const {permissions} = useSelector((state:RootState)=>state.authSlice)
  
  const hasPermission = (code:string):boolean=>{
    return permissions.includes(code) ?? false
  }
  return {hasPermission}
}