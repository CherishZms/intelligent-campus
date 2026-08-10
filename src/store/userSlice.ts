import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:"auth",
  initialState:{
    token:sessionStorage.getItem('token')  || ""
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
    }
  }
})

export const {setToken,removeToken} = authSlice.actions

export default authSlice.reducer