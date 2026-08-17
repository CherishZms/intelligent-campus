import { Drawer, Form,Row,Col,Input, Radio, InputNumber, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

function EsateDrawer(props:any){
  const {
    open,
    width,
    onClose,
    title,
    data,
    editData
  } = props
  const [form] = useForm()
  // console.log(data)

  useEffect(()=>{
    if(data && open){
      form.setFieldsValue(data)
    }
  },[open,data])

  const onUpdate = ()=>{
    const values = form.getFieldsValue()
    editData(values)
  }

  return <Drawer 
  open={open} 
  size={width}
  onClose={onClose}
  title={title}
  >
    <Form 
      form={form}
      >
      <Row>
        <Col span={22}>
          <Form.Item label="楼宇名称" name="name">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <Form.Item label="负责人" name="person">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <Form.Item label="负责人电话" name="tel">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <Form.Item label="使用状态" name="status">
            <Radio.Group
              options={[
                {value:"1",label:"建设中"},
                {value:"2",label:"已竣工"},
                {value:"3",label:"使用中"},
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <Form.Item label="安置率" name="vacancyRate">
            <InputNumber<number>
              formatter={(value) => `${value}%`}
              min={0}
              max={100}
              />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <Form.Item label="物业费率" name="propertyFee">
            <InputNumber<number>
              formatter={(value) => `${value}%`}
              min={0}
              max={100}
              />
          </Form.Item>
        </Col>
      </Row>
      
      <Row>
        <Button type="primary" onClick={onUpdate}>修改</Button>
        <Button className="ml" onClick={onClose}>取消</Button>
      </Row>
    </Form>
  </Drawer>
}
export default EsateDrawer