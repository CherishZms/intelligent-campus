// 我是合同详情组件

import { useLocation } from "react-router-dom"

function Surrender(){
  const location = useLocation()
  const {id} = location?.state || ""

  return <div className="surrender">
    <h1>{id}</h1>
  </div>
}
export default Surrender