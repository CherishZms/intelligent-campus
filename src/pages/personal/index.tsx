/**
 * 
 * @returns 我是个人中心组件
 */
import { Card,Row,Col,List,Avatar,Calendar,Badge, Tag, Progress, Modal, Descriptions } from "antd"
import {useEffect, useMemo, useState} from 'react'
import { getTodoListApi } from "@/api/personal"
import { getToday } from "@/utils/getToday"
import type { CalendarProps, DescriptionsProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";

interface ListType{
  listNo:string,
  listTitle:string,
  listDescription:string,
  buildPerson:string,
  buildApartment:string,
  buildTime:string,
  compliTime:string,
  listType:'常规'|'紧急',
  questionType:'账号问题'|'物业问题'|'财务问题'|'运营问题'|'研发问题'|'生产问题'|'产品问题',
  process:number
  status:"todo"|"doing"|"done"
}

const temp:ListType[] = [
  {
  listNo:"1001",
  listTitle:"新增账号申请",
  listDescription:"新入职员工，需要新建user权限账号",
  buildPerson:"刘婷",
  buildApartment:"人力资源部",
  buildTime:"2026-08-01 08:00",
  compliTime:"2026-08-01 12:00",
  listType:'紧急',
  questionType:'账号问题',
  process:0,
  status:"todo"
}
]


const today = getToday()

function Personal(){

  const [todoList,setTodoList] = useState<ListType[]>(temp)
  const [curDate,setCurDate] = useState<string>(today)
  const [openModal,setOpenModal] =useState<boolean>(false)
  const [cur,setCur] = useState<ListType>()


  
  // console.log(today)

  useEffect(()=>{
    getTodoList()
  },[curDate])

  async function getTodoList(){
   const {data:{list,targetDate,total}} = await getTodoListApi({date:curDate})
  //  console.log(list)
  setTodoList(list)
  }

  const todo = useMemo(()=>{
    return todoList.filter(item=>item.status==="todo")
  },[todoList])
  // console.log(todo)
  const doing = useMemo(()=>{
    return todoList.filter(item=>item.status==="doing")
  },[todoList])
   const done = useMemo(()=>{
    return todoList.filter(item=>item.status==="done")
  },[todoList])

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode'])=>{
    const val = value.format('YYYY-MM-DD')
    // console.log(val)
    setCurDate(val)
  }

  const handleChange = (date: Dayjs)=>{
    // console.log(date)
    const changeDate = dayjs(date).format("YYYY-MM-DD")
    // console.log()
    setCurDate(changeDate)
  }

  const detail = (record:ListType)=>{
    // console.log(record)
    setOpenModal(true)
    setCur(record)
  }
  const items:DescriptionsProps['items'] = [
    {
      key:"listTitle",
      label:"事项标题",
      children:<p>{cur?.listTitle}</p>
    },
    {
      key:"listlistDescriptionTitle",
      label:"事项描述",
      children:<p>{cur?.listDescription}</p>
    },
    {
      key:"buildApartment",
      label:"发起部门",
      children:<p>{cur?.buildApartment}</p>
    },
    {
      key:"buildPerson",
      label:"发起人",
      children:<p>{cur?.buildPerson}</p>
    },
    {
      key:"buildTime",
      label:"发起时间",
      children:<p>{cur?.buildTime}</p>
    },
    {
      key:"compliTime",
      label:"预期完成时间",
      children:<p>{cur?.compliTime}</p>
    },
    {
      key:"listType",
      label:"紧急情况",
      children:<p color={cur?.listType==="常规"?"":"red"}>{cur?.listType}</p>
    },
    {
      key:"questionType",
      label:"问题分类",
      children:<p >{cur?.questionType}</p>
    },
    {
      key:"process",
      label:"事项进展",
      span:2,
      children:<Progress percent={cur?.process}></Progress>
    },
  ]
  
  return <div className="personal">
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <List 
            size="large"
          >
            <List.Item>
              <List.Item.Meta 
                avatar = {<Avatar src={`https://api.dicebear.com/10.x/lorelei/svg?seed=1`} size="large" />}
                title = {localStorage.getItem('person') || "赵丽颖"}
                description="不必焦虑时光，你只管踏实耕耘，时间自会给你答案"
              />
            </List.Item>
          </List>
        </Card>
        <Card className="mt">
          <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={handleChange} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <span>待处理：</span>
          <Badge count={todo.length} color="#faad14" />
        </Card>
        {
          todo.map((item)=>{
            return <Card title={item.listTitle} className="mt" extra={<a onClick={()=>detail(item)}>详情</a>} key={item.listNo}>
              <p>描述：{item.listDescription}</p>
              <p className="mst">创建人：{item.buildApartment} · {item.buildPerson}</p>
              <p className="mst">创建日期：{item.buildTime}</p>
              <p className="mst">预期完成日期：{item.compliTime}</p>
              <div className="mst">
                <Tag className="mr" color={item.listType==='常规'?"blue":"red"}>{item.listType}</Tag>
                <Tag color="blue">{item.questionType}</Tag>
              </div>
              <Progress percent={item.process} className="mst"></Progress>
            </Card>
          })
        }
        
      </Col>
      <Col span={6}>
        <Card>
          <span>处理中：</span>
          <Badge count={doing.length}color="#4d61f7" />
           {
          doing.map((item)=>{
            return <Card title={item.listTitle} className="mt" extra={<a onClick={()=>detail(item)}>详情</a>} key={item.listNo}>
              <p>描述：{item.listDescription}</p>
              <p className="mst">创建人：{item.buildApartment} · {item.buildPerson}</p>
              <p className="mst">创建日期：{item.buildTime}</p>
              <p className="mst">预期完成日期：{item.compliTime}</p>
              <div className="mst">
                <Tag className="mr" color={item.listType==='常规'?"blue":"red"}>{item.listType}</Tag>
                <Tag color="blue">{item.questionType}</Tag>
              </div>
              <Progress percent={item.process} className="mst"></Progress>
            </Card>
          })
        }
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <span>已处理：</span>
          <Badge count={done.length} color="#4ad948" />
           {
          done.map((item)=>{
            return <Card title={item.listTitle} className="mt" extra={<a onClick={()=>detail(item)}>详情</a>} key={item.listNo}>
              <p>描述：{item.listDescription}</p>
              <p className="mst">创建人：{item.buildApartment} · {item.buildPerson}</p>
              <p className="mst">创建日期：{item.buildTime}</p>
              <p className="mst">预期完成日期：{item.compliTime}</p>
              <div className="mst">
                <Tag className="mr" color={item.listType==='常规'?"blue":"red"}>{item.listType}</Tag>
                <Tag color="blue">{item.questionType}</Tag>
              </div>
              <Progress percent={item.process} className="mst"></Progress>
            </Card>
          })
        }
        </Card>
      </Col>
    </Row>
    <Modal 
      open={openModal} 
      title="事项明细"
      width="1000px"
      style={{textAlign:'center'}} 
      onCancel={()=>setOpenModal(false)} 
      onOk={()=>setOpenModal(false)}>
        <Descriptions 
          items={items}
          bordered
          column={2}
        />
    </Modal>
  </div>
}
export default Personal