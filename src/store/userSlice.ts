import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:"auth",
  initialState:{
    token:"",
    asyncRouterList:[],
  },
  reducers:{
    setToken:(state,action)=>{
      state.token = action.payload
    },
    removeToken:(state)=>{
      state.token = ""
      state.asyncRouterList=[]
    },
    setAsyncRouterList:(state,{payload})=>{
      state.asyncRouterList = payload
    }
  }
})

export const {setToken,removeToken,setAsyncRouterList} = authSlice.actions

export default authSlice.reducer