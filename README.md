# 1.设置@别名
## 解决：安装craco
### 1)npm install @craco/craco --save-dev
### 2)根目录创建craco.config.js
    const path = require('path');
    module.exports = {
      webpack: {
      alias: {
      '@': path.resolve(__dirname, 'src'),
      },
    },
  };
### 3)修改 package.json 中的 scripts
    "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
    }
### 4)配置 tsconfig.json 让 TS 和 VSCode 识别别名：在 compilerOptions 中添加 baseUrl 和 paths：
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@/*": ["src/*"]
        }
        // ... 其余配置保持不变
      }
    }

## 2.eslink、prettier
## 3.路由守卫、请求响应拦截
## 4.不支持导入scss格式的样式表
  解决：修改react-app-env.d.ts，添加以下代码：
  declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// 如果还需要支持 .sass 文件，也加上
declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}











# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
