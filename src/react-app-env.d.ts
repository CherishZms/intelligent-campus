/// <reference types="react-scripts" />


// 添加以下声明
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// 如果还需要支持 .sass 文件，也加上
declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'mockjs'

declare module '*.css'

declare module 'redux-persist/lib/storage'
declare module 'redux-persist/es/persistReducer'