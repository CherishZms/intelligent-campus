import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:"auth",
  initialState:{
    token:sessionStorage.getItem('token')  || "",
    asyncRouterList:[]
  },
  reducers:{
    setToken:(state,action)=>{
      state.token = action.payload
      sessionStorage.setItem("token",action.payload)
    },
    removeToken:(state)=>{
      state.token = ""
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("username")
      sessionStorage.removeItem('asyncRouterList')
    },
    setAsyncRouterList:(state,{payload})=>{
      state.asyncRouterList = payload
    }
  }
})

export const {setToken,removeToken,setAsyncRouterList} = authSlice.actions

export default authSlice.reducer