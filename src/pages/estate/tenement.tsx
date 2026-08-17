//楼宇管理
import { Button, Card, Col, Input, Row, Table, Tag,Progress,Badge, message } from "antd"
import type { TableProps } from "antd"
import { useCallback, useEffect, useState } from "react"
import { getEstateList } from "@/api/estate"
import MyPopconfirm from "@/components/myPopconfirm"
import { deleteEstate } from "@/api/estate"
import React from "react"
import EsateDrawer from "./estateDrawer"
import {updataEstateSerive} from "@/api/estate"

export interface ColumsType {
  // key:string,
  id:string,
  name:string,  //楼宇名称
  person:string,//负责人
  tel:string, //负责人电话
  status:string, //使用状态
  vacancyRate:number, //安置率
  propertyFee:number //物业费率
}



const data:ColumsType[]= [
  {
    id:"1",
    name:"一号楼",  //楼宇名称
    person:"张三",//负责人
    tel:"13212121212", //负责人电话
    status:"3", //使用状态
    vacancyRate:80, //安置率
    propertyFee:20 //物业费率
  }
]
const defalutSearch = {
  name:"",
  person:""
}
type SearchType={
  name:string,
  person:string
}
const total = 16
function Tenement(){
  const [list,setList] = useState<ColumsType[]>([])
  const [search,setSearch] = useState<SearchType>(defalutSearch)
  const [page,setPage] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number>(10)
  const [loading,setLoading] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const [curData,setCurData] = useState<ColumsType>()

  const columns:TableProps<ColumsType>['columns'] = [
  {
    title:"序号",
    key:"index",
    render(value,record,index){
      return index+1
    },
    width:100,
    align:'center'
  },
  {
    title:"楼宇名称",
    key:"name",
    dataIndex:"name"
    ,width:200,
    align:'center'
  },
  {
    title:"负责人",
    dataIndex:"person",
    key:"person",
    width:160,
    align:'center'
  },
  {
    title:"负责人电话",
    dataIndex:"tel",
    key:"tel",
    width:200,
    align:'center'
  },
  {
    title:"使用状态",
    dataIndex:"status",
    key:"status",
    render(value){
      if(value==="1"){
        return <Tag color="#f5d">建设中</Tag>
      }else if(value==="2"){
        return <Tag color="blue">已竣工</Tag>
      }else{
        return <Tag color="green">使用中</Tag>
      }
    }
    ,width:200,
    align:'center'
  },
  {
    title:"安置率",
    dataIndex:"vacancyRate",
    key:"vacancyRate",
    render:(value)=>{
      return <Progress percent={value} />
    },
    width:300,
    align:'center'
  },
  {
    title:"物业费率",
    dataIndex:"propertyFee",
    key:"propertyFee",
    render:(value)=>{
      // return <Badge status="success" text={`${value`} />
      if(value<40){
       return <Badge status="error" text={`${value}`+ '%'} />
      }else if(value<70){
       return <Badge status="warning" text={`${value}`+ '%'} />
      }else{
        return  <Badge status="success" text={`${value}`+ '%'} />
      }
    }
    ,width:200,
    align:'center'
  },
  {
    title:"操作",
    // dataIndex:"operate",
    key:"operate",
    render:(value,record)=>{
      return <>
        <Button type="primary" className="mr" onClick={()=>editEstate(record)}>编辑</Button>
        <MyPopconfirm onConfirm={()=>onDelte(record)}>
          <Button type="primary" danger>删除</Button>
        </MyPopconfirm>
      </>
    },
    width:200,
    align:'center'
  },
]

  useEffect(()=>{
    getList()
  },[])

  const getList = async ()=>{
    setLoading(true)
    const {data} = await getEstateList({...search,page,pageSize})
    // console.log(data)
    setList(data)
    setLoading(false)
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.value)
    const value = e.target.value
    const item =e.target.name
    setSearch({
      ...search,
      [item]:value
    })
  }
  const onSearch = ()=>{
    if(search.name || search.person){
      getList()
    }else{
      message.error("查询条件不能为空")
    }
  }
  const onReset = ()=>{
    setSearch(defalutSearch)
    setPage(1)
    setPageSize(10)
    getList()
  }

  const onDelte = useCallback(async(data:ColumsType)=>{
    const {id,name} = data
    // console.log("删除",id,name)
    const {message:mes} = await deleteEstate({id,name})
    message.success(mes)
    getList()
  },[])

  const editEstate= (data:ColumsType)=>{
    setOpen(true)
    // console.log(data)
    setCurData(data)
  }
  const editData = async (data:ColumsType)=>{
    try{
      await(updataEstateSerive(data))
      message.success("修改成功")
      setOpen(false)
      getList()
    }catch(error){
       message.error("修改失败") 
    }
      
    }

  return <div className="tenement">
    <Card>
      <Row gutter={16}>
        <Col span={8}>
          <div className="flex">
            <label style={{width:'15%'}}>楼宇名称：</label>
            <Input name="name" value={search.name} onChange={handleChange} />
          </div>
        </Col>
        <Col span={8} className="ml">
          <div className="flex">
            <label  style={{width:'15%'}}>负责人：</label>
            <Input name="person" value={search.person} onChange={handleChange}/>
          </div>
        </Col>
        <Col span={6}>
          <Button type="primary" className="mr" onClick={onSearch}>查询</Button>
          <Button onClick={onReset}>重置</Button>
        </Col>
      </Row>
    </Card>
    <Card className="mt">
      <Table 
        columns={columns} 
        dataSource={list}
        // pagination={false}
        rowKey={record=>record.id}
        loading={loading}
         />
    </Card>
    <EsateDrawer 
      open={open} 
      width={800} 
      onClose={()=>setOpen(false)}
      title="编辑楼宇"
      data={curData}
      editData={editData}
      >
    </EsateDrawer>
  </div>
}

export default Tenement
