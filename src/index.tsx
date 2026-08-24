import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@/mock'
import { store, persistor } from '@/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN';
import { Watermark } from "antd"

//antd日期显示英文，三行解决
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';   // 导入中文语言包
dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
      <ConfigProvider locale={zhCN}>
        {/* <Watermark content="Mindy"> */}
          <App />
        {/* </Watermark> */}
      </ConfigProvider>
    </PersistGate>
  </Provider>

);
/*
PersistGate 的作用：它会延迟渲染 children（即 <App />）直到持久化的状态从 localStorage 恢复并注入 Redux。这样，App 第一次渲染时，asyncRouterList 就已经有值了（如果有缓存）。
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
