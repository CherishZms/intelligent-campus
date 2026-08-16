//新增、编辑租户弹窗
import { Modal,Form, Row,Col, Input, message,Radio } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect } from "react"
import { useSelector } from "react-redux"
// import { useEffect } from "react"
import {addUserApi} from "@/api/userList"
import { DataType } from "./userDataType"

interface PropType{
  visible:boolean,
  title:string,
  closeModal:()=>void
  renderList:()=>void
}

const UserModel:React.FC<PropType> = (props)=>{
  const {visible,title,closeModal,renderList} = props
  const [form] = useForm() //获取表单数据
  const {userEditForm} = useSelector((state:any)=>state.userFormSlice)
  // console.log(userEditForm)
  useEffect(()=>{
    if(visible && userEditForm.id){
      form.setFieldsValue(userEditForm)
    }else{
      form.resetFields()
    }
  },[userEditForm,visible])

  const onSubmit =async ()=>{
    await form.validateFields().then(async (res)=>{
      // console.log('表单校验通过',typeof res)  object
      // form.setFieldsValue(userEditForm)
      //发请求
      const {message:mes} = await addUserApi(res)
      message.success(mes)
      //关闭弹窗
      closeModal()
      // 父组件重新渲染
      renderList()
    }).catch(err=>message.error('表单填写无效'))
  } 
  return <>
    <Modal
      title={title}
      open={visible}
      onCancel={closeModal}
      width={800}
      onOk={onSubmit}
      forceRender  //保证 Form 实例始终挂载
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="姓名" name="name" rules={[{required:true,message:'姓名不能为空'}]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="联系电话" name="tel" 
              rules={[{required:true,message:'联系电话不能为空'},
                {pattern:/^1[3-9]\d{9}$/,message:'号码无效'}
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="经营状态" name="status" rules={[{required:true,message:'经营状态不能为空'}]}>
              <Radio.Group  options={[
                {value:"1",label:'在业'},
                {value:"2",label:'歇业'},
                {value:"3",label:'清算'},
              ]} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="所属行业" name="business" 
              rules={[{required:true,message:'所属行业不能为空'}]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="邮箱" name="email" rules={[{required:true,message:'邮箱不能为空'}]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="统一信用代码" name="creditCode" 
              rules={[{required:true,message:'统一信用代码不能为空'}]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="工商注册号" name="industryNum" rules={[{required:true,message:'工商注册号不能为空'}]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="组织机构代码" name="organizationCode" 
              rules={[{required:true,message:'组织机构代码不能为空'}]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="法人名" name="legalPerson" rules={[{required:true,message:'法人名不能为空'}]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  </>
}
export default UserModel