/**
 * 我是设备管理组件
 */
import SearchCard from "@/components/mySearch"
import { Button, Card, Descriptions, message, Modal, Pagination, Table, TableProps,Tag } from "antd"
import { useEffect, useMemo, useState } from "react"
import {isValidSearchInput} from '@/utils/IsValidInput'
import {getEqListApi} from "@/api/equirment"
import { dayToYYMMDD } from "@/utils/dayjs"
import useDataList from "@/hooks/useDataList"
import type {DescriptionsProps} from 'antd'

interface EquipType {
  eqNo:string,//设备编号
  eqName:string,//设备名称
  person:string,//负责人
  personTel:string,//负责人电话
  proCompany:string, //供应商
  purchaseDate:string,//购买日期
  usedDate:number,//使用年限
  useStatus:string, //设备状态 1使用中，2闲置，3损坏，4报废
  syncNo:string,//设备序列号
  brand:string,//设备品牌
  model:string,//设备型号
  eqType:string,//设备类型  
  lastCheck:string,//上次检修时间
}

interface SearchType {
  name:string
}

function Equipment(){
  const [value,setValue] = useState<string>()
  const [eqList,setEqList] = useState<EquipType[]>()
  // const [loading,setLoading] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const [curRecord,setCurRecord] = useState<EquipType>()
  const {
    page,
    pageSize,
    total,
    dataList,
    loading,
    searchParams,
    setPage,
    setPageSize,
    setTotal,
    setDataList,
    setLoading,
    setSearchParams,
    getFetchData,
    handleChange,
    onChange
  } = useDataList<SearchType,EquipType>({name:""},getEqListApi)

  useEffect(()=>{
    getEqList()
  },[])

  async function getEqList(){
    setLoading(true)
    const {data:{list,total}} = await getEqListApi()
    setEqList(list)
    setLoading(false)
  }

  const inputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
  }
  const onSearch = ()=>{
    
    if(!isValidSearchInput(searchParams.name)){
      message.warning('查询参数无效')
      setValue("")
      return
    }
    // 发请求查询
    // message.success('查询中')
    getFetchData()
  }

  const onReset = ()=>{
    setValue("")
  }
  
  const onDetail = (record:EquipType)=>{
    setOpen(true)
    setCurRecord(record)
  }

  const handleCurRecord = useMemo(()=>{
    if(curRecord){
       const temp = {...curRecord}
       let tag:React.ReactNode = <></>
       if(temp.useStatus==="1"){
          tag = <Tag color="green">使用中</Tag>
       }else if(temp.useStatus==="2"){
          tag = <Tag color="blue">闲置</Tag>
        }else if(temp.useStatus==="3"){
          tag = <Tag color="red">损坏</Tag>
        }else{
         tag = <Tag>报废</Tag>
        }
        return {
          ...temp,
          purchaseDate:dayToYYMMDD(curRecord.purchaseDate),
          usedDate:`${curRecord.usedDate}年`,
          useStatus:tag,
          lastCheck:dayToYYMMDD(curRecord.lastCheck)
        }
    }
   
  },[curRecord])

  const detailItems:DescriptionsProps['items'] = [
    {
      key:"eqNo",
      label:"设备编号",
      children:handleCurRecord?.eqNo
    },
    {
      key:"eqName",
      label:"设备名称",
      children:handleCurRecord?.eqName
    },
    {
      key:"person",
      label:"负责人",
      children:handleCurRecord?.person
    },
    {
      key:"personTel",
      label:"负责人电话",
      children:handleCurRecord?.personTel
    },
    {
      key:"proCompany",
      label:"供应商",
      children:handleCurRecord?.proCompany
    },
    {
      key:"purchaseDate",
      label:"购买日期",
      children:handleCurRecord?.purchaseDate
    },
    {
      key:"usedDate",
      label:"使用年限",
      children:handleCurRecord?.usedDate
    },
    {
      key:"useStatus",
      label:"设备状态",
      children:handleCurRecord?.useStatus
    },
    {
      key:"syncNo",
      label:"设备序列号",
      children:handleCurRecord?.syncNo
    },

    {
      key:"brand",
      label:"设备品牌",
      children:handleCurRecord?.brand
    },
    {
      key:"model",
      label:"设备型号",
      children:handleCurRecord?.model
    },
    {
      key:"eqType",
      label:"设备类型",
      children:handleCurRecord?.eqType
    },
    {
      key:"lastCheck",
      label:"上次检修时间",
      children:handleCurRecord?.lastCheck
    },
  ]

  const equipColum:TableProps<EquipType>['columns'] = [
    {
      key:"index",
      dataIndex:"index",
      title:"序号",
      render(value, record, index) {
        return index+1
      },
      align:"center",
      width:80
    },
    {
      key:"eqNo",
      dataIndex:"eqNo",
      title:"设备编号",
      align:"center",
      width:120
    },
    {
      key:"eqName",
      dataIndex:"eqName",
      title:"设备名称",
      align:"center",
      width:120
    },
    {
      key:"person",
      dataIndex:"person",
      title:"负责人",
      align:"center",
      width:120
    },
    {
      key:"personTel",
      dataIndex:"personTel",
      title:"负责人电话",
      align:"center",
      width:120
    },
    {
      key:"eqType",
      dataIndex:"eqType",
      title:"设备类型",
      align:"center",
      width:120
    },
    {
      key:"proCompany",
      dataIndex:"proCompany",
      title:"供应商",
      align:"center",
      width:120
    },
    {
      key:"purchaseDate",
      dataIndex:"purchaseDate",
      title:"购买日期",
      align:"center",
      width:120,
      render(value){
        return dayToYYMMDD(value)
      }
    },
    {
      key:"usedDate",
      dataIndex:"usedDate",
      title:"使用年限",
      align:"center",
      width:120,
      render(value){
        return `${value}年`
      }
    },
    {
      key:"useStatus",
      dataIndex:"useStatus",
      title:"设备状态",
      align:"center",
      width:120,
      render(value){
        if(value==="1"){
          return <Tag color="green">使用中</Tag>
        }else if(value==="2"){
          return <Tag color="blue">闲置</Tag>
        }else if(value==="3"){
          return <Tag color="red">损坏</Tag>
        }else{
          return <Tag>报废</Tag>
        }
      }
    },
    {
      key:"syncNo",
      dataIndex:"syncNo",
      title:"设备序列号",
      align:"center",
      width:120
    },
    {
      key:"brand",
      dataIndex:"brand",
      title:"设备品牌",
      align:"center",
      width:120
    },
    {
      key:"model",
      dataIndex:"model",
      title:"设备型号",
      align:"center",
      width:120
    },
    
    {
      key:"lastCheck",
      dataIndex:"lastCheck",
      title:"上次检修时间",
      align:"center",
      width:120,
      render(value){
        return dayToYYMMDD(value)
      }
    },
    {
      key:"operate",
      title:"操作",
      align:"center",
      width:100,
      render(value,record){
        return <>
          <Button type="primary" size="small" onClick={()=>onDetail(record)}>详情</Button>
        </>
      }
    }
  ]

  return <div className="equipment">
    <SearchCard 
      hasRestButton 
      inputPlaceholder="请输入设备名称"
      inputvalue={searchParams.name}
      inputName="name"
      onInputChange={handleChange}
      onButtonClick={onSearch}
      onReset={onReset}
      />
    <Card className="mt" >
      <Table
        // columns={equipColum}
        // rowKey={record=>record.eqNo}
        // dataSource={eqList}
        // loading={loading}
        // pagination={false}
        columns={equipColum}
        rowKey={record=>record.eqNo}
        dataSource={dataList}
        loading={loading}
        pagination={false}
        />
        <Pagination  
          current={page} 
          pageSize={pageSize} 
          onChange={onChange} 
          showQuickJumper 
          showPrevNextJumpers
          total={total}
          className="flexRight mt"
          defaultCurrent={1}
          showTotal={(total) => `共 ${total} 条`}
           />
    </Card>
    <Modal
      open={open}
      onCancel={()=>setOpen(false)}
      onOk={()=>setOpen(false)}
      width={"1000px"}
    >
      <Descriptions 
        title="详情" 
        items={detailItems} 
        bordered
        // column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }} 
        column={2}
        />
    </Modal>
  </div>
}
export default Equipment