import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./userSlice"
import storage from 'redux-persist/lib/storage' // 使用 localStorage
import { FLUSH, PAUSE, PERSIST, persistStore,persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import userFormSlice from "./userFormSlice"
import constractSlice from "./constractSlice"

//配置持久化
const persistConfig = {
  key:'root',
  storage,
  whitelist:['authSlice']  // 只持久化 authSlice
}

const rootReducer = combineReducers({
  authSlice,
  userFormSlice,
  constractSlice
})

const persisedReducer  = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer:persisedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:{
      ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER] as any
    }
  })
})

export const persistor = persistStore(store)



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch