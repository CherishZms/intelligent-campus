// 我是文章发布组件
import { Card,Form,Input,DatePicker, Radio, Button } from "antd"
import { useForm } from "antd/es/form/Form"
import { ChangeEvent, useState } from "react"
import type {DatePickerProps, RadioChangeEvent} from "antd"
import { Dayjs } from "dayjs"
import { dayToYYMMDD } from "@/utils/dayjs"

type FormType = {
  topic?:string,
  subTopic?:string,
  publicTime?:string,
  range?:string,
  contant?:string
}

function Article(){

  const [date,setDate] = useState<Dayjs | null>(null)
  const [formData,setFormData] = useState<FormType>({})

  const {TextArea} = Input
  const [form] = useForm()

  const submit = ()=>{
    form.validateFields().then(res=>{
      // 确认后端期望的格式（如 yyyy-MM-dd 还是 yyyy-MM-dd HH:mm:ss）
      const payload = form.getFieldsValue()
      // console.log(dayToYYMMDD(payload.publicTime))

      const submitData = {
        ...payload,
        publicTime:dayToYYMMDD(payload.publicTime)
      }
      console.log(submitData)

    }).catch((err)=>{
      console.log(err)
    })
  }

  const changeDate:DatePickerProps['onChange'] = (date,dateString)=>{
    // console.log(date,dateString)
    setFormData(pre=>{
      return {
        ...pre,
        publicTime:dateString as string
      }
    })
    setDate(date as Dayjs)
  }

  const reset = ()=>{
    // console.log(formData)
    form.setFieldsValue({
      topic:"",
      subTopic:"",
      publicTime:"",
      range:"1",
      contant:""
    })
    // setFormData({
    //   topic:"",
    //   subTopic:"",
    //   publicTime:"",
    //   range:"1",
    //   contant:""
    // })
    setDate(null)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    // console.log(name,value)
    setFormData(pre=>{
      return {
        ...pre,
        [name]:value
      }
    })
  }
  const radioChange = (e:RadioChangeEvent)=>{
    setFormData(pre=>{
      return {
        ...pre,
        range:e.target.value
      }
    })
  }

  const handleAreaChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    setFormData(pre=>{
      return {
        ...pre,
        contant:e.target.value
      }
    })
  }

  return <div className="article">
    <Card>
      <Form 
        labelCol={{span:8}}
        wrapperCol={{span:8}}
        form={form}
      >
        <Form.Item
          label="文章标题"
          name="topic"
          rules={[{required:true,message:"文章标题不能为空"}]}
        >
          <Input  value={formData.topic} onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="副标题"
          name="subTopic"
          rules={[{required:true,message:"副标题不能为空"}]}
        >
          <Input  value={formData.subTopic} onChange={handleChange} />
        </Form.Item>
          <Form.Item
            label="发布时间"
            name="publicTime"
            rules={[{required:true,message:"发布时间不能为空"}]}
          >
            <DatePicker 
              style={{width:'100%'}} 
              value={date}
              
              onChange={changeDate} />
          </Form.Item>
        <Form.Item
          label="可见范围"
          initialValue="1"
          name="range"
          rules={[{required:true,message:"可见范围不能为空"}]}
        >
          <Radio.Group 
            value={formData.range}  
            options={[{value:"1",label:"所有"},{value:"2",label:"物业"},{value:"3",label:"公司"}]}
            onChange={radioChange}
            
            
            />
        </Form.Item>
        <Form.Item
          label="文章内容"
           name="contant"
          rules={[{required:true,message:"文章内容不能为空"}]}
        >
          <TextArea 
            rows={4} 
            value={formData.contant} 
            onChange={handleAreaChange}/>
        </Form.Item>
        <Form.Item
          label={null}
        >
          <Button 
            type="primary" 
            style={{width:'40%',height:'40px'}}
            onClick={submit}
            >提交</Button>
            <Button 
            style={{width:'40%',height:'40px'}}
            onClick={reset}
            className="ml"
            >重置</Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
}
export default Article