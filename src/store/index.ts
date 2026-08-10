import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./userSlice"

const store = configureStore({
  reducer:{
    authSlice
  }
})

export default store