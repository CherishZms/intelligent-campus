// 保修管理组件
import SearchCard from "@/components/mySearch"
import { Table, Tag,Button,Badge, Form,Descriptions, Input,Radio,Select, message } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import type {TableProps,PaginationProps,DescriptionsProps} from 'antd'
import { getRepairListApi,updateRepairMajorApi } from "@/api/repair"
import {dayToYYMMDDHHmmss} from "@/utils/dayjs"
import MyPagination from "@/components/MyPagination"
import MyModal from "@/components/myModal"
import MySelect from "@/components/mySelect"
import {DefaultOptionType} from "@/components/mySelect"

export interface repairDataType {
  repairId:string, //报修单号
  repairPerson:string, //报修人
  repairPersonTel:string, //报修人电话号码
  repairAddress:string, //报修地址
  repairDescription:string, //故障描述
  repairStatus:string, //维修状态：1待维修，2维修中，3已完成
  repairTime:string, //报修时间
  repairMajor?:string, //保修负责人
}

const tempData:repairDataType[] = [
  {
    repairId:"121212212", //报修单号
    repairPerson:"张三", //报修人
    repairPersonTel:"13212121212", //报修人电话号码
    repairAddress:"西座2期A栋1001", //保修地址
    repairDescription:"空调不制冷", //故障描述
    repairStatus:"3", //维修状态：1待维修，2维修中，3已完成
    repairTime:"2026-8-18 18:30", //报修时间
    repairMajor:"老六"

  },
  {
    repairId:"12121212", //报修单号
    repairPerson:"张三", //报修人
    repairPersonTel:"13212121212", //报修人电话号码
    repairAddress:"西座2期A栋1001", //保修地址
    repairDescription:"空调不制冷", //故障描述
    repairStatus:"2", //维修状态：1待维修，2维修中，3已完成
    repairTime:"2026-8-18 18:30", //报修时间
    repairMajor:"王五"
  },
  {
    repairId:"1212212", //报修单号
    repairPerson:"张三", //报修人
    repairPersonTel:"13212121212", //报修人电话号码
    repairAddress:"西座2期A栋1001", //保修地址
    repairDescription:"空调不制冷", //故障描述
    repairStatus:"1", //维修状态：1待维修，2维修中，3已完成
    repairTime:"2026-8-18 18:30", //报修时间
    repairMajor:"王五"
  },
]

function Repair(){
  const [search,setSearch] = useState<string>()
  const [repairData,setRepirData] = useState<repairDataType[]>([])
  const [total,setTotal] = useState<number>(0)
  const [page,setPage] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number>(10)
  const [loading,setLoading] = useState<boolean>(false)
  const [isModalOpen,setIsModalOpen] =useState<boolean>(false)
  const [curItem,setCurItem] = useState<repairDataType>()
  const [repairMajor,setRepairMajor]  = useState<string>("")

  const onInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.value)
    setSearch(e.target.value)
  },[])

  const onButtonClick = useCallback(()=>{
    // console.log("点击了查询按钮",search)
    setSearch(search)
  },[search])


  useEffect(()=>{
    getRepairList()
  },[page,pageSize,search])

  const mapCurItem = useMemo(()=>{
    if(curItem){
      const temp = {...curItem}
      let tempRepairStatus = temp.repairStatus
      let tempRepairMajor = temp.repairMajor
      if(tempRepairStatus === "1"){
        tempRepairStatus = "待维修"
        tempRepairMajor = ""
      }else if(tempRepairStatus === "2"){
        tempRepairStatus = "维修中"
      }else{
        tempRepairStatus = "已完成"
      }
      return {
        ...temp,
        repairStatus:tempRepairStatus,
        repairTime:dayToYYMMDDHHmmss(curItem.repairTime),
        repairMajor:tempRepairMajor
      }
    }
    
  },[curItem])

  async function getRepairList (){
    setLoading(true)
    const {data:{list,total}} = await getRepairListApi({pageSize,page,keyword:search})
    // console.log(res)
    setRepirData(list)
    setTotal(total)
    setLoading(false)
  }

  const onAssign = (record:repairDataType)=>{
    setIsModalOpen(true)
    setCurItem(record)
  }
  const onShow = (record:repairDataType)=>{
    setIsModalOpen(true)
    setCurItem(record)
  }
  async function updateRepairMajor(){
    if(curItem){
      await updateRepairMajorApi({repairId:curItem?.repairId,repairMajor})
      // console.log(res)
      message.success("指派成功")
      setRepairMajor("")
    }
   
   }

  const onPaginationChange = (page: number, pageSize: number)=>{
    setPage(page)
    setPageSize(pageSize)
  }
  const handleSelect = async(value:string)=>{
    // console.log(value)
    setRepairMajor(value)
  }
  //fix:需要等待异步更新数据完成后发请求
  const handleOk = async ()=>{
    await updateRepairMajor()
    setIsModalOpen(false)
    getRepairList()
    setRepairMajor("")
  }
  const repairColumns: TableProps<repairDataType>['columns'] = [
    {
      title:"序号",
      key:"index",
      dataIndex:"repairId",
      align:'center',
      width:80,
      render(value,record,index){
        return index+1
      }
    },
    {
      title:"报修单号",
      key:"repairId",
      dataIndex:"repairId",
      align:'center',
      width:120
    },
    {
      title:"报修人",
      key:"repairPerson",
      dataIndex:"repairPerson",
      align:'center',
      width:120
    },
    {
      title:"报修人电话号码",
      key:"repairPersonTel",
      dataIndex:"repairPersonTel",
      align:'center',
      width:120
    },
    {
      title:"保修地址",
      key:"repairAddress",
      dataIndex:"repairAddress",
      align:'center',
      width:120
    },
    {
      title:"故障描述",
      key:"repairDescription",
      dataIndex:"repairDescription",
      align:'center',
      width:200,
    },
    {
      title:"维修状态",
      key:"repairStatus",
      dataIndex:"repairStatus",
      align:'center',
      width:120,
      render(value){
        if(value==="1"){
          return <Tag color="f5d">待维修</Tag>
        }else if(value==="2"){
          return <Tag color="blue">维修中</Tag>
        }else{
          return <Tag color="green">已完成</Tag>
        }
      },
      filters:[
        {text:"待维修",value:"1"},
        {text:"维修中",value:"2"},
        {text:"已完成",value:"3"},
      ],
      onFilter(value,record){
        return record.repairStatus.indexOf(value as string) === 0
      }
    },
    {
      title:"报修时间",
      key:"repairTime",
      dataIndex:"repairTime",
      align:'center',
      width:120,
      render(value){
        return dayToYYMMDDHHmmss(value)
      },
      sorter:(a,b)=>{
        const dataA = new Date(a.repairTime).getTime()
        const dataB = new Date(b.repairTime).getTime()
        return dataA-dataB
      }
    },
    {
      title:"维修负责人",
      key:"repairMajor",
      dataIndex:"repairMajor",
      align:'center',
      width:120,
      render(value,record){
        if(record.repairStatus==="1"){
          return ""
        }else{
           return value
        }
      }
    },
    {
      title:"操作",
      key:"operate",
      align:'center',
      width:120,
      render(value,record){
        if(record.repairStatus==="1"){
          return <Button type="primary" onClick={()=>onAssign(record)}>指派</Button>
        }else{
          return <Button color="primary" variant="outlined" onClick={()=>onShow(record)}>查看</Button>
        }
      },
      filters:[
        {text:"指派",value:"1"},
        {text:"查看",value:"2"},
      ],
      onFilter(value,record){
        if (value === '2') {
          return record.repairStatus === '2' || record.repairStatus === '3';
        }
        return record.repairStatus.indexOf(value as string) === 0
      }
    },
  ]
  const selectOptions:DefaultOptionType[] = [
    {
      value:"白军",
      label:"白军"
    },
    {
      value:"余芳",
      label:"余芳"
    },
    {
      value:"张平",
      label:"张平"
    },
    {
      value:"乔明",
      label:"乔明"
    },
    {
      value:"徐秀英",
      label:"徐秀英"
    },
  ]
  
  const desItems:DescriptionsProps['items'] = [
    {
      key:"repairId",
      label:"报修单号",
      children:mapCurItem?.repairId,
      span:"filled",
    },
    {
      key:"repairPerson",
      label:"报修人",
      children:mapCurItem?.repairPerson,
      span:"filled",
    },
    {
      key:"repairPersonTel",
      label:"报修人电话号码",
      children:mapCurItem?.repairPersonTel,
      span:"filled",
    },
    {
      key:"repairAddress",
      label:"报修地址",
      children:mapCurItem?.repairAddress,
      span:"filled",
    },
    {
      key:"repairDescription",
      label:"故障描述",
      children:mapCurItem?.repairDescription,
      span:"filled",
    },
    {
      key:"repairStatus",
      label:"维修状态",
      children:mapCurItem?.repairStatus,
      span:"filled",
    },
    {
      key:"repairTime",
      label:"报修时间",
      children:mapCurItem?.repairTime,
      span:"filled",
    },
    {
      key:"repairMajor",
      label:"保修负责人",
      children:<>
        {
          mapCurItem?.repairMajor?mapCurItem?.repairMajor:<MySelect options={selectOptions} onChange={handleSelect} value={repairMajor}></MySelect>
        }
      </>,
      span:"filled",
    },
  ]

  return <div className="repair">
    <SearchCard 
      inputPlaceholder="请输入保修单号"
      inputName="search"
      inputvalue={search}
      onInputChange={(e)=>onInputChange(e)}
      onButtonClick={onButtonClick}
       />
    <Table 
      columns={repairColumns} 
      dataSource={repairData} 
      className="mt"
      rowKey={record=>record.repairId}
      pagination={false}
      loading={loading}
      />
    <MyPagination 
      total={total}
      page={page}
      pageSize={pageSize}
      onPaginationChange={onPaginationChange}
    />
    <MyModal
      title="维修记录"
      isModalOpen={isModalOpen}
      onCancel={()=>{
        setIsModalOpen(false)
        setRepairMajor("")  
      }}
      onOk={handleOk}
    >
      <Descriptions  bordered items={desItems} />
      
    </MyModal>
  </div>
}
export default Repair