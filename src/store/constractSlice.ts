import { createSlice } from "@reduxjs/toolkit";

const constractSlice = createSlice({
  name:"constractSlice",
  initialState:{
    constractListRedux:[],
    searchDataRedux:{},
    pageRedux:1,
    pageSizeRedux:10,
    totalRedux:0
  },
  reducers:{
    setConstractListStore:(state,action)=>{
      state.constractListRedux = action.payload
    },
    setSearchDataStore:(state,action)=>{
      state.searchDataRedux = action.payload
    },
    setPageStore:(state,action)=>{
      state.pageRedux = action.payload
    },
    setPageSizeStore:(state,action)=>{
      state.pageSizeRedux = action.payload
    },
    setTotalStore:(state,action)=>{
      state.totalRedux = action.payload
    },
    clearConstractDataStore:(state)=>{
      state.constractListRedux = []
      state.searchDataRedux = {}
      state.pageRedux = 1
      state.pageSizeRedux =10
      state.totalRedux = 0
    }
  }
})

export const {setConstractListStore,setSearchDataStore,setPageStore,setPageSizeStore,clearConstractDataStore,setTotalStore} = constractSlice.actions
export default constractSlice.reducer