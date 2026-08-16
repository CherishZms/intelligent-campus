import { createSlice } from "@reduxjs/toolkit";

const userFormSlice = createSlice({
  name:'userForm',
  initialState:{
    userEditForm:{}
  },
  reducers:{
    setUserEditForm:(state,action)=>{
      state.userEditForm = action.payload
    }
  }
})

export const {setUserEditForm} =userFormSlice.actions

export default userFormSlice.reducer