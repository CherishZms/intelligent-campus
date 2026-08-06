import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Suspense } from "react";

/*
  React.lazy要搭配Supense一起使用
*/

function App() {
  return (
    <Suspense fallback={<h1>加载中</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
