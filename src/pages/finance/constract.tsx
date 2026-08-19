// 我是合同管理组件
import { Card, Row, Col, Input, Button, Select, Table, TableProps, Tag } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import {getConstractListApi} from "@/api/constract"
import MyPagination from "@/components/MyPagination"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setConstractListStore,setSearchDataStore,setPageStore,setPageSizeStore,setTotalStore,clearConstractDataStore} from "@/store/constractSlice"

interface SearchDataType {
  contractNo: string,
  jia: string,
  status: string
}

interface ConstractType {
  contractNo:string,  //合同编号
  constractType:string, //合同类型
  constractName:string, //合同名称
  constractBeginDate:string,  //合同开始日期
  constractEndDate:string, //合同结束日期
  jia:string, //甲方
  yi:string, //乙方
  status:string  //审批状态
}

const defaultSearchData = {
  contractNo: "",
  jia: "",
  status: "5"
}

function Contract() {

  const [searchData, setSearchData] = useState<SearchDataType>(defaultSearchData)
  const [constractList,setConstractList] = useState<ConstractType[]>([])
  const [total,setTotal] = useState<number>(0)
  const [loading,setLoading] =useState<boolean>(false)
  const [page,setPage] = useState<number>(1)
  const [pageSize,setpageSize] = useState<number>(10)
  // const [constractId,setConstractId] = useState<string>("")

  const {constractListRedux,searchDataRedux,pageRedux,pageSizeRedux,totalRedux} = useSelector((state:any)=>state.constractSlice)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const {detail} = location?.state || ""
 

  const handleSearchStatus = (value: string) => {
    // console.log('value',value)
    setSearchData((pre) => {
      return {
        ...pre,
        status: value
      }
    })
  }

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchData((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const onSearch = () => {
    // 查询， {contractNo: '', jia: '', status: '5'}
    // console.log(searchData)
    getConstractList(page,pageSize)
  }

  useEffect(()=>{
    if(detail && constractListRedux?.length){
      setConstractList(constractListRedux)
      setSearchData(searchDataRedux)
      setPage(pageRedux)
      setpageSize(pageSizeRedux)
      setTotal(totalRedux)
    }else{
      getConstractList(page,pageSize)
    }
  },[])

  async function getConstractList (page:number,pageSize:number){
    setLoading(true)
    const {data:{list,total}} = await getConstractListApi({...searchData,page,pageSize})
    setConstractList(list)
    setTotal(total)
    setLoading(false)
  }

  const changePage = (page:number,pageSize:number)=>{
    // console.log(page)
    // console.log(pageSize)
    setPage(page)
    setpageSize(pageSize)
    getConstractList(page,pageSize)
  } 

  const toDetail = (id:string)=>{
    console.log(id)
    // state地址栏不显示参数
    navigate('/finance/surrender',{state:{id}})
    dispatch(setConstractListStore(constractList))
    dispatch(setSearchDataStore(searchData))
    dispatch(setPageStore(page))
    dispatch(setPageSizeStore(pageSize))
    dispatch(setTotalStore(total))
  }

  const constractColumns:TableProps<ConstractType>['columns'] = [
    {
      title:"序号",
      key:"index",
      dataIndex:"index",
      width:80,
      align:'center',
      render(value, record, index) {
        return index+1
      },
    },
    {
      title:"合同编号",
      key:"contractNo",
      dataIndex:"contractNo",
      width:120,
      align:'center'
    },
    {
      title:"合同类型",
      key:"constractType",
      dataIndex:"constractType",
      width:120,
      align:'center'
    },
    {
      title:"合同名称",
      key:"constractName",
      dataIndex:"constractName",
      width:120,
      align:'center'
    },
    {
      title:"合同开始日期",
      key:"constractBeginDate",
      dataIndex:"constractBeginDate",
      width:120,
      align:'center'
    },
    {
      title:"合同结束日期",
      key:"constractEndDate",
      dataIndex:"constractEndDate",
      width:120,
      align:'center'
    },
    {
      title:"甲方",
      key:"jia",
      dataIndex:"jia",
      width:120,
      align:'center'
    },
    {
      title:"乙方",
      key:"yi",
      dataIndex:"yi",
      width:120,
      align:'center'
    },
    {
      title:"审批状态",
      key:"status",
      dataIndex:"status",
      width:120,
      align:'center',
      render(value){
        if(value==="1"){
          return <Tag color="red">待审批</Tag>
        }else if(value==="2"){
          return <Tag color="blue">审批中</Tag>
        }else if(value==="3"){
          return <Tag color="green">审批通过</Tag>
        }else{
          return <Tag color="#f5d">审批拒绝</Tag>
        }
      }
    },
    {
      title:"操作",
      key:"operate",
      width:120,
      align:'center',
      render(value, record) {
        return <Button type='primary' size='small' onClick={()=>toDetail(record.contractNo)}>合同详情</Button>
      },
    },  
  ]

  const onReset = () => {
    setSearchData(defaultSearchData)
    setPage(1)
    setpageSize(10)
    getConstractList(1,10)
  }

  return <div className="contract">
    <Card>
      <Row gutter={16}>
        <Col span={6} className='flex mr'>
          <label style={{ width: '20%', lineHeight: '32px' }} >合同编号：</label>
          <Input name="contractNo" value={searchData.contractNo} onChange={inputChange} />
        </Col>
        <Col span={6} className='flex mr'>
          <label style={{ width: '20%', lineHeight: '32px' }}>甲方公司：</label>
          <Input name="jia" value={searchData.jia} onChange={inputChange} />
        </Col>
        <Col span={6} className='flex mr'>
          <label style={{ width: '20%', lineHeight: '32px' }}>审批状态：</label>
          <Select
            defaultValue={"5"}
            onChange={handleSearchStatus}
            value={searchData.status}
            options={[
              { value: "5", label: "全部" },
              { value: "1", label: "待审批" },
              { value: "2", label: "审批中" },
              { value: "3", label: "审批通过" },
              { value: "4", label: "审批拒绝" }
            ]}
            style={{ width: '60%' }}
          />
        </Col>
        <Col span={3}>
          <Button type='primary' onClick={onSearch}>查询</Button>
          <Button className='ml' onClick={onReset}>重置</Button>
        </Col>
      </Row>
    </Card>
    <Card className='mt'>
      <Table 
        columns={constractColumns} 
        dataSource={constractList}
        rowKey={record=>record.contractNo}
        pagination={false}
        loading={loading}
        />
      <MyPagination 
        total={total}
        page={page}
        pageSize={pageSize}
        onPaginationChange={changePage}
      />
    </Card>
  </div>
}
export default Contract