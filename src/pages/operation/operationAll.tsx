// <div>我是运营总览组件</div>
import { Card, Row, Col, Statistic, Badge } from "antd"
import { RightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const {Text} = Typography

const greatCompany = [
  {
    key: "1",
    name: "大疆创新",
    person: "86",
    money: "2400"
  },
  {
    key: "2",
    name: "微众银行",
    person: "83",
    money: "2200"
  },
  {
    key: "3",
    name: "荣耀",
    person: "80",
    money: "2000"
  },
  {
    key: "4",
    name: "引望智能",
    person: "78",
    money: "1900"
  },
  {
    key: "5",
    name: "货拉拉",
    person: "90",
    money: "1800"
  },
  {
    key: "6",
    name: "智平方",
    person: "70",
    money: "1200"
  },
  {
    key: "7",
    name: "拓竹科技",
    person: "66",
    money: "1100"
  },
  {
    key: "8",
    name: "丰巢",
    person: "50",
    money: "900"
  },
  {
    key: "9",
    name: "海柔创新",
    person: "56",
    money: "890"
  },
  {
    key: "10",
    name: "普渡科技",
    person: "34",
    money: "870"
  }
]
interface TodoListType{
  title:string,
  time:string,
  type:string
}
const todoList:TodoListType[] = [
  {
    title:"合同签订待处理",
    time:"2026-08-24",
    type:"1"
  },
  {
    title:"充电桩维修保修",
    time:"2026-08-22",
    type:"1"
  },
  {
    title:"空闲使用费统一征收",
    time:"2026-08-20",
    type:"2"
  },
  {
    title:"租户物业费催缴",
    time:"2026-08-18",
    type:"1"
  },
  {
    title:"潜在意向客户跟访",
    time:"2026-08-16",
    type:"3"
  },
  {
    title:"园区保洁注意事项",
    time:"2026-08-15",
    type:"3"
  },
]
const newTopic = [
  {title:"【充电桩使用通知】园区充电桩仅供本园区车辆使用，请规范停放，禁止占用车位长时间闲置，共同维护充电秩序。",time:"2026-08-24"},
  {title:"【园区消防提示】请各企业留意消防隐患，严禁楼道堆放杂物，定期检查电器设备，保障园区消防安全。",time:"2026-08-23"},
  {title:"【园区停车通知】园区公共车位优先供访客使用，企业车辆请停至指定区域，请勿占用消防通道。",time:"2026-08-22"},
  {title:"【环境卫生通知】请各单位自觉维护园区公共环境，不乱扔垃圾，共同打造整洁舒适的办公园区。",time:"2026-08-21"},
  {title:"【园区门禁通知】园区夜间门禁已开启，非工作时间进出园区请做好登记，注意人身与财产安全。",time:"2026-08-20"},
  {title:"【设备检修通知】园区部分公共照明将开展检修维护，施工期间带来不便，敬请各位企业予以谅解。",time:"2026-08-19"},
  // {title:"【电梯使用通知】园区电梯请勿超载运行，遇故障请勿强行扒门，及时联系物业人员处置。",time:"2026-08-18"},
]

function OperationAll() {
  return <div className="operationAll">
    <Row gutter={16}>
      <Col span={16}>
        <Card>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="文章总数" value={1588} />
            </Col>
            <Col span={6}>
              <Statistic title="意向客户(个)" value={235} />
            </Col>
            <Col span={6}>
              <Statistic title="入驻企业(家)" value={766} />
            </Col>
            <Col span={6}>
              <Statistic title="园区用户(人)" value={6988} />
            </Col>
          </Row>
        </Card>
        <Card className="mt">
          <Row gutter={16} >
            <Col span={12}>
              <Card title="待办事项">
                {
                  todoList.map(item=>{
                    return <Row gutter={16} className="mb" key={item.title}>
                      <Col span={12}><Badge status="processing" />  {item.title}</Col>
                      <Col span={12} style={{textAlign:"right"}}>{item.time}</Col>
                    </Row>
                  })
                }
              </Card>
            </Col>
            <Col span={12}>
              <Card title="最新通知" extra={<a>更多<RightOutlined /></a>}>
                {
                  newTopic.map(item=>{
                    return <Row gutter={16} className="mb" key={item.title}>
                      <Col span={12}><Badge status="warning" />
                        <Text ellipsis={{tooltip: true}} style={{ width: '240px' }}>{item.title}</Text>
                      </Col>
                      <Col span={12} style={{textAlign:"right"}}>{item.time}</Col>
                    </Row>
                  })
                }
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="优质企业排名(前十位)">
          {
            greatCompany.map((item,index) => {
              let styleColor = ["red","green","blue"]
              let styles={}
              if(index<3){
                styles = {
                  fontSize:"20px",
                  color:styleColor[index]
                }
              }
              return <Row gutter={16} className="mb" key={item.key}>
                <Col span={8} style={styles}>{item.key}.{item.name}</Col>
                <Col span={8} style={styles}>人数{item.person}人</Col>
                <Col span={8} style={styles}>估值{item.money}万元</Col>
              </Row>
            })
          }
        </Card>
      </Col>
    </Row>
  </div>
}
export default OperationAll