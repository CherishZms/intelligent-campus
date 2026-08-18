// 我是车辆信息组件

import { Card, Row, Col, Input, Button, message,Tabs, Table, Modal, Form, Descriptions, Image,Drawer, Radio, Select, InputNumber } from "antd"
import React, { useEffect, useMemo, useState } from "react"
import type {TableProps, TabsProps} from 'antd'
import { getChargeRecordListApi,getCarListApi,deleteCarItemApi,updateCarApi,searchApi } from "@/api/car"
import { dayToYYMMDDHHmmss,dayToYYMMDD,formatDuration } from "@/utils/dayjs"
import type { DescriptionsProps } from 'antd';
import come from "@/assets/come.jpg"
import MyPopconfirm from "@/components/myPopconfirm"
import { useForm } from "antd/es/form/Form"

export type RecordType = {
  id:string,  //编号
  orderId:string, //订单编号
  orderDate:string,//订单日期
  carNumber:string,//车辆号码
  carType:string,//车辆类型
  chargingBeginTime:string,//充电开始时间
  chargingDuringTime:number,//充电时长，单位秒
  chargingAmount:number,//充电量
  changingFee:number, //充电费用
}

export interface CarListType {
  id:string , //编号
  carNumber:string, //车牌号
  carOwner:string, //车主姓名
  carOwnerTel:string, //车主电话
  rentType:string, //租赁类型。1表示月租，2表示季租，3表示年租
  rentLastDate:number, //剩余租期，天数
  carPic:string, //入场照片
}


// const tempCar:CarListType[] = [{
//   id:"1212",  //编号
//   carNumber:"越A121212", //车牌号
//   carOwner:"张三", //车主姓名
//   carOwnerTel:"12321232123", //车主电话
//   rentType:"1", //租赁类型。1表示月租，2表示年租，3表示时租
//   rentLastDate:120, //剩余租期，天数
//   carPic:come, //入场照片
// }]

function Car() {
  const [searchValue,setSearchValue] = useState<string>("")
  const [recordList,setRecordList] = useState<RecordType[]>([])
  const [loading,setLoading] = useState<boolean>(false)
  const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
  const [curRecord,setCurRecord] = useState<RecordType>()
  const [carList,setCarList] = useState<CarListType[]>([])
  const [selectedTab,setSelectedTab] = useState<string>("1")
  const [open,setOpen] = useState<boolean>(false)
  const [curPicSrc,setcurPicSrc] = useState<string>()
  const [carform] = useForm()
  

  useEffect(()=>{
    if(selectedTab==="2"){
      getCarList()
    }else{
      getChargeRecord()
    }
  },[selectedTab])

  async function getCarList(){
    setLoading(true)
    const {data:{list}} = await getCarListApi()
    // console.log(list)
    setCarList(list)
     setLoading(false)
  }

  const handleCurRecord = useMemo(()=>{
    if(curRecord){
       const tempRecord = {...curRecord}
        return {
          ...tempRecord,
          orderDate:dayToYYMMDD(curRecord.chargingBeginTime),
          chargingBeginTime:dayToYYMMDDHHmmss(curRecord.chargingBeginTime),
          chargingDuringTime:formatDuration(curRecord.chargingDuringTime),
          chargingAmount:`${curRecord.chargingAmount}kw`,
          changingFee:`￥${curRecord.changingFee.toFixed(2)}`
        }
    }
   
  },[curRecord])
  async function getChargeRecord(){
    setLoading(true)
    const {data:{list}} = await getChargeRecordListApi()
    // console.log(list)
    setRecordList(list)
    setLoading(false)
  }

  const showMessage = (record:RecordType)=>{
    setIsModalOpen(true)
    setCurRecord(record)
  }

  const onChangeTabs = (key:string)=>{
    setSelectedTab(key)
  }

  const showCurRecord:DescriptionsProps['items'] = [
    {
      key: 'orderId',
      label: '订单编号',
      children: handleCurRecord?.orderId,
      span: 'filled'
    },
    {
      key: 'orderDate',
      label: '订单日期',
      children: handleCurRecord?.orderDate,
      span: 'filled'
    },
    {
      key: 'carNumber',
      label: '车辆号码',
      children: handleCurRecord?.carNumber,
      span: 'filled'
    },
    {
      key: 'carType',
      label: '车辆类型',
      children: handleCurRecord?.carType,
      span: 'filled'
    },
    {
      key: 'chargingBeginTime',
      label: '充电开始时间',
      children: handleCurRecord?.chargingBeginTime,
      span: 'filled'
    },
    {
      key: 'chargingDuringTime',
      label: '充电时长',
      children: handleCurRecord?.chargingDuringTime,
      span: 'filled'
    },
    {
      key: 'chargingAmount',
      label: '充电量',
      children: handleCurRecord?.chargingAmount,
      span: 'filled'
    },
    {
      key: 'changingFee',
      label: '充电费用',
      children: handleCurRecord?.changingFee,
      span: 'filled'
    },
  ]

  const chargingRecordColumn:TableProps<RecordType>['columns'] = [
    {
      title:"序号",
      dataIndex:"index",
      key:"index",
      render(value, record, index) {
        return index+1
      },
      width:80,
      align:'center'
    },
    {
      title:"订单编号",
      dataIndex:"orderId",
      key:"orderId",
      width:100,
      align:"center"
    },
    {
      title:"订单日期",
      dataIndex:"orderDate",
      key:"orderDate",
      width:120,
      align:"center",
      render(value,record){
        return dayToYYMMDD(record.chargingBeginTime)
      },
      sorter:(a,b)=>{
        const dataA = new Date(a.chargingBeginTime).getTime()
        const dataB = new Date(b.chargingBeginTime).getTime()
        return dataA-dataB
      }
    },
    {
      title:"车辆号码",
      dataIndex:"carNumber",
      key:"carNumber",
      width:120,
      align:"center"
    },
    {
      title:"车辆类型",
      dataIndex:"carType",
      key:"carType",
      width:120,
      align:"center"
    },
    {
      title:"充电开始时间",
      dataIndex:"chargingBeginTime",
      key:"chargingBeginTime",
      width:120,
      align:"center",
      render(value){
        return dayToYYMMDDHHmmss(value)
      }
    },
    {
      title:"充电时长",
      dataIndex:"chargingDuringTime",
      key:"chargingDuringTime",
      width:120,
      align:"center",
      render(value){
        return formatDuration(value)
      }
    },
    {
      title:"充电量",
      dataIndex:"chargingAmount",
      key:"chargingAmount",
      width:120,
      align:"center",
      render(value){
        return `${value}kw`
      }
    },
    {
      title:"充电费用",
      dataIndex:"changingFee",
      key:"changingFee",
      width:120,
      align:"center",
      render(value){
        return `￥${value.toFixed(2)}`
      }
    },
    {
      title:"操作",
      key:"changingFee",
      width:100,
      align:"center",
      render:(value,record)=>{
        return <>
          <Button type="primary" onClick={()=>showMessage(record)}>查看</Button>
        </>
      }
    },
  ]

  const deletItem = async (record:CarListType)=>{
    // console.log(record)
    try{
      await deleteCarItemApi({id:record.id,carNumber:record.carNumber})
      message.success("删除成功")
      getCarList()
    }catch(e){
      message.error("删除失败")
    }
  }
  const editCarItem = (record:CarListType)=>{
    setOpen(true)
    setcurPicSrc(record.carPic)
    // setCurCar(record)
    carform.setFieldsValue(record)
    setcurPicSrc(record.carPic)
  }

  const updateCarItem = async()=>{
    try{
      carform.validateFields().then(async res=>{
        // console.log(res)
        await updateCarApi(res)
        message.success("修改成功")
        setOpen(false)
        getCarList()
      }).catch((err)=>{
        // console.log(err?.message)
        message.error(err?.message)
      })
    }catch{
      message.error("修改失败")
    }
  }
  

  //院内车辆逻辑
  const carListColumn:TableProps<CarListType>['columns'] = [
    {
      title:"序号",
      key:"index",
      dataIndex:"index",
      render(value,record,index){
        return index+1
      },
      width:80,
      align:'center',
    },
    {
      title:"车牌号码",
      key:"carNumber",
      dataIndex:"carNumber",
      width:120,
      align:'center',
    },
    {
      title:"车主姓名",
      key:"carOwner",
      dataIndex:"carOwner",
      width:120,
      align:'center',
    },
    {
      title:"车主电话",
      key:"carOwnerTel",
      dataIndex:"carOwnerTel",
      width:120,
      align:'center',
    },
    {
      title:"租赁类型",
      key:"rentType",
      dataIndex:"rentType",
      width:120,
      align:'center',
      render(value){
        if(value==="1"){
          return "月租"
        }else if(value==="2"){
          return "季租"
        }else{
          return "年租"
        }
      }
    },
    {
      title:"剩余租期",
      key:"rentLastDate",
      dataIndex:"rentLastDate",
      width:120,
      align:'center',
      render(value){
        return `${value}天`
      }
    },
    {
      title:"入场照片",
      key:"carPic",
      dataIndex:"carPic",
      width:120,
      align:'center',
      render(value){
        return <Image src={value} width={50}></Image>
      }
    },
    {
      title:"操作",
      key:"operate",
      width:120,
      align:'center',
      render(value,record){
        return <>
          <Button type="primary" className="mr" onClick={()=>editCarItem(record)}>编辑</Button>
          <MyPopconfirm onConfirm={()=>deletItem(record)}>
            <Button type="primary" danger >删除</Button>
          </MyPopconfirm>
        </>
      }
    }
  ]

  const items:TabsProps['items']  = [
    {
      key:"1",
      label:"充电记录",
      children:<Table 
                  columns={chargingRecordColumn} 
                  dataSource={recordList}
                  rowKey={record=>record.id}
                  loading={loading}
                / >
    },
    {
      key:"2",
      label:"园内车辆列表",
      children:<Table 
        columns={carListColumn} 
        dataSource={carList}
        rowKey={record=>record.id}
        loading={loading}
        ></Table>
    }
  ]

  function onChange(e:React.ChangeEvent<HTMLInputElement>){
      // console.log(e.target.value)
      setSearchValue(e.target.value)
  }

  async function onSearch(){
    if(searchValue){
      // console.log(searchValue)
      
      await searchApi({search:searchValue})
      // console.log(res)
      message.success("查询成功")
      getCarList()
    }else{
      message.error("查询条件不能为空")
    }
  }

  

  return <div className="car">
    <Card>
      <Row gutter={16}>
        <Col span={6}>
          <Input placeholder="请输入车牌号/手机号/联系人" name="search" value={searchValue} onChange={e=>onChange(e)}/>
        </Col>
        <Col span={10}>
          <Button type="primary" onClick={onSearch}>查询</Button>
        </Col>
      </Row>
    </Card>
    <Card className="mt">
      <Tabs items={items} defaultActiveKey="1" onChange={onChangeTabs}></Tabs>
    </Card>
    <Modal 
      open={isModalOpen}
      title="充电记录"
      onCancel={()=>setIsModalOpen(false)}
      width={800}
      // style={{textAlign:'center'}}
      footer //取消底部按钮
      >
      <Descriptions bordered items={showCurRecord} className="mt"/>
    </Modal>
    <Drawer 
      open={open} 
      title="编辑" 
      size={800} 
      onClose={()=>setOpen(false)}
       >
      <Form form={carform}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="车牌号码" name="carNumber"  rules={[{required:true,message:"车牌号码不能为空"}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="车主姓名" name="carOwner" rules={[{required:true,message:"车主姓名不能为空"}]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="车主号码" name="carOwnerTel" rules={[{required:true,message:"车主号码不能为空"}]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="租赁类型" name="rentType" rules={[{required:true,message:"租赁类型不能为空"}]}
            >
             <Select options={[
              {value:"1",label:"月租"},
              {value:"2",label:"季租"},
              {value:"3",label:"年租"},
             ]}>
             </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="剩余租期" name="rentLastDate"  rules={[{required:true,message:"剩余租期不能为空"}]}
            >
              <InputNumber<number>
                  formatter={(value) => `${value}天`}
                  width="100%"
                  min={0}
              />
              
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
             <Form.Item
              label="入场照片" name="carPic"  rules={[{required:true,message:"入场照片不能为空"}]}
            >
              <Image src={curPicSrc} width={500} >
              </Image>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="mt">
          <Col span={16}>
             <Button className="mr" onClick={()=>setOpen(false)}>取消</Button>
             <Button type="primary" onClick={updateCarItem}>修改</Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  </div>
}
export default Car