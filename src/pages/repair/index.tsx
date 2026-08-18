// 保修管理组件
import SearchCard from "@/components/mySearch"
import { Table, Tag,Button,Badge } from "antd"
import { useCallback, useEffect, useState } from "react"
import type {TableProps,PaginationProps} from 'antd'
import { getRepairListApi } from "@/api/repair"
import {dayToYYMMDDHHmmss} from "@/utils/dayjs"
import MyPagination from "@/components/MyPagination"
import { number } from "echarts"

export interface repairDataType {
  repairId:string, //报修单号
  repairPerson:string, //报修人
  repairPersonTel:string, //报修人电话号码
  repairAddress:string, //保修地址
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

  const onInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.value)
    setSearch(e.target.value)
  },[])

  const onButtonClick = useCallback(()=>{
    // Todo
    console.log("点击了查询按钮",search)
  },[])

  useEffect(()=>{
    getRepairList()
  },[page,pageSize])

  async function getRepairList (){
    setLoading(true)
    const {data:{list,total}} = await getRepairListApi({pageSize,page,keyword:search})
    // console.log(res)
    setRepirData(list)
    setTotal(total)
    setLoading(false)
  }

  const onPaginationChange = (page: number, pageSize: number)=>{
    setPage(page)
    setPageSize(pageSize)
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
          return <Button type="primary">指派</Button>
        }else{
          return <Button color="primary" variant="outlined">查看</Button>
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
  </div>
}
export default Repair