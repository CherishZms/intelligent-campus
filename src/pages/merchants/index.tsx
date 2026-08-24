//我是招商管理组件
import { Card, Carousel, Row, Col,List,Avatar, Statistic  } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import bg1 from "@/assets/1.jpg"
import bg2 from "@/assets/2.jpg"
import bg3 from "@/assets/3.jpg"

import "./index.scss"

const contentStyle: React.CSSProperties = {
  margin: "auto",
  width: "80vw",
  objectFit: "cover"
}


function Merchants() {

  const data:any[] = [
    {
      title:'新签：及时雨有限公司',
      mes:"新媒体公司"
    },
    {title:'续签：顺风耳有限公司',
      mes:"续签两年，大客户"
    },
    {title:'新签：大吉利有限公司',
      mes:"观望阶段"
    },
    {title:'新签：千里目有限公司',
      mes:"潜力科技好公司"
    },
  ]

  return <div className="merchants">
    <Card>
      <Carousel arrows autoplay>
        <div>
          <img src={bg1} alt="bg1" style={contentStyle}></img>
        </div>
        <div>
          <img src={bg2} alt="bg2" style={contentStyle}></img>
        </div>
        <div>
          <img src={bg3} alt="bg3" style={contentStyle}></img>
        </div>
      </Carousel>
    </Card>
    <Card className="mt">
      <Row gutter={16}>
        <Col span={12}>
          <List
            dataSource={data}
            renderItem={(item,index)=>(
              <List.Item>
                <List.Item.Meta 
                  avatar={<Avatar src={`https://api.dicebear.com/10.x/lorelei/svg?seed=${index}`} />}  
                  title={item.title}
                  description={item.mes}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
            <Row gutter={16}>
              <Col span={6}>
                <Card variant="borderless">
                  <Statistic 
                    title="新签客户"
                    value={11.28}
                    precision={2}
                    prefix={<ArrowUpOutlined />}
                    styles={{ content: { color: '#3f8600' } }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card variant="borderless">
                  <Statistic 
                    title="续签客户"
                    value={9.3}
                    precision={2}
                    prefix={<ArrowDownOutlined />}
                    styles={{ content: { color: '#cf1322' } }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card variant="borderless">
                  <Statistic 
                    title="退租客户"
                    value={5.16}
                    precision={2}
                    prefix={<ArrowUpOutlined />}
                    styles={{ content: { color: '#3f8600' } }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card variant="borderless">
                  <Statistic 
                    title="意向客户"
                    value={13.3}
                    precision={2}
                    prefix={<ArrowDownOutlined />}
                    styles={{ content: { color: '#cf1322' } }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
        </Col>
      </Row>
    </Card>
  </div>
}
export default Merchants