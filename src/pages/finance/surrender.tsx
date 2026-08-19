// 我是合同详情组件

import { Button, Card } from "antd"
import { useLocation, useNavigate } from "react-router-dom"

function Surrender(){
  const location = useLocation()
  const navigate = useNavigate()
  const {id} = location?.state || ""

  const onBack = ()=>{
    navigate("/finance/contract",{state:{detail:true}})
  }

  return <div className="surrender">
    <Card>
      <Button type="primary" size="large" onClick={onBack}>返回</Button>
    </Card>
    <h1>{id}</h1>
  </div>
}
export default Surrender