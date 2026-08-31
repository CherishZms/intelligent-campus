import {Result,Button} from 'antd'
import { Link } from 'react-router-dom'
function notFound(){
  return <>
    <Result
    status="404"
    title="404"
    subTitle="抱歉，页面丢失了"
    extra={<Button type="primary"><Link to="/">跳转到首页</Link></Button>}
  />
  </>
}

export default notFound