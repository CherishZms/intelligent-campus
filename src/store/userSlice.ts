import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:"auth",
  initialState:{
    token:"",
    asyncRouterList:[],
    permissions:[]  as string[]
  },
  reducers:{
    setToken:(state,action)=>{
      state.token = action.payload
    },
    removeToken:(state)=>{
      state.token = ""
      state.asyncRouterList=[]
      state.permissions=[]
    },
    setAsyncRouterList:(state,{payload})=>{
      state.asyncRouterList = payload
    },
    setPermissions:(state,{payload})=>{
      state.permissions = payload
    } 
  }
})

export const {setToken,removeToken,setAsyncRouterList,setPermissions} = authSlice.actions

export default authSlice.reducer