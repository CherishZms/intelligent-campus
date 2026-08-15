import { Card, Col, Input, Row, Button, Table,Pagination, Tag, Popconfirm,message } from "antd"
import type { TableProps,PaginationProps } from "antd"
import type { DataType } from './userDataType'
import { useMemo, useState } from "react"
import { getUserListApi } from "@/api/userList"
import { useEffect } from "react"
import { deleteUserByIdApi,batchDeleteUsersByIdApi } from "@/api/userList"

const defaultSearchList = { 
    companyName: "", //公司名称
    contact: "", //联系人
    phone: "" //联系电话
  }

function UserList() {

  const [dataList, setDataList] = useState<DataType[]>([])
  const [loading,setLoading] = useState<boolean>(false)
  const [total,setTotal] =useState<number>(0)
  const [pageSize,setPageSize] = useState<number>(10) //请求多少条数据，一页有多少条数据
  const [page,setPage] = useState<number>(1) //请求的页码数，第一页、第二页
  const [selectedRowKeys,setSelectedRowKeys] = useState<React.Key[]>([])
  const [searchList, setSearchList] = useState(defaultSearchList)

  const batchDeleteType = useMemo(()=>{
    return selectedRowKeys.length?false:true
  },[selectedRowKeys])

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '序号',
      key: 'index',
      dataIndex: 'index',
      width: '80',
      align: 'center',
      render(value, record, index) {
        return index+1
      },
    },
    {
      title: '编号',
      key: 'id',
      dataIndex: 'id',
      width: '80',
      align: 'center'
    },
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
      width: '90',
      align: 'center'
    },
    {
      title: '经营状态',
      key: 'status',
      dataIndex: 'status'
      , width: '90',
      align: 'center',
      render(value) {
        if(value==='1'){
          return <Tag color='green'>在业</Tag>
        }else if(value==='2'){
          return <Tag color='#f5d'>歇业</Tag>
        }else{
          return <Tag color='red'>清算</Tag>
        }
      },
    },
    {
      title: '联系电话',
      key: 'tel',
      dataIndex: 'tel'
      , width: '90',
      align: 'center'
    },
    {
      title: '所属行业',
      key: 'business',
      dataIndex: 'business'
      , width: '90',
      align: 'center'
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email'
      , width: '90',
      align: 'center'
    },
    {
      title: '统一信用代码',
      key: 'creditCode',
      dataIndex: 'creditCode'
      , width: '90',
      align: 'center'
    },
    {
      title: '工商注册号',
      key: 'industryNum',
      dataIndex: 'industryNum'
      , width: '90',
      align: 'center'
    },
    {
      title: '组织机构代码',
      key: 'organizationCode',
      dataIndex: 'organizationCode'
      , width: '90',
      align: 'center'
    },
    {
      title: '法人名',
      key: 'legalPerson',
      dataIndex: 'legalPerson'
      , width: '90',
      align: 'center'
    },
    {
      title: '操作',
      key: 'operate',
      dataIndex: 'operate'
      , width: '90',
      align: 'center',
      render(value,record){
      return <>
      <Button color="primary" variant="solid" className="mr" size="small">编辑</Button>
      <Popconfirm
        title="删除确认"
        description="删除不可恢复，是否确认删除"
        onConfirm={()=>onDeleteItem(record.id)}
        onCancel={onCancelDelete}
        okText="确认"
        cancelText="取消"
      >
        <Button color="danger" variant="solid" size="small">删除</Button>
      </Popconfirm>
      
      </>}
    },
  ]

  useEffect(() => {
    getUserList()
  }, [pageSize,page])

  async function getUserList() {
    setLoading(true)
    const { data: { list, total } } = await getUserListApi({...searchList,pageSize,page})
    setTotal(total)
    setDataList(list)
    setLoading(false)
  }

  function handleInput(e: any) {
    const { name, value } = e.target
    setSearchList({ ...searchList, [name]: value })
  }
  
  const rowSelection:TableProps<DataType>['rowSelection'] = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`已选中的 Key: ${selectedRowKeys}`, '已选中的行: ', selectedRows);
        setSelectedRowKeys(selectedRowKeys)
    },
  }
  const onPageChange:PaginationProps['onChange'] =(page,pageSize)=>{
    setPage(page)
    setPageSize(pageSize)
  }
  const reset = ()=>{
    setSearchList(defaultSearchList)
    setPage(1)
    setPageSize(10)
    setSelectedRowKeys([])
    getUserList()
  }

  const onDeleteItem = async (id:string)=>{
    // console.log('删除该用户id',id)
    await deleteUserByIdApi(id)
    message.success("删除成功")
    getUserList()
  }
  const onCancelDelete = ()=>{
    // console.log('点击了取消删除')
  }
  const batchDelete = async()=>{
    // console.log(selectedRowKeys)
    const res = await batchDeleteUsersByIdApi(selectedRowKeys)
    console.log(res)
  }

  return <div className="userList">
    <Card>
      <Row>
        <Col span={7}>
          <div>
            <label>企业名称：</label>
            <Input style={{ width: '70%' }} name="companyName" onChange={handleInput} value={searchList.companyName}/>
          </div>
        </Col>
        <Col span={7}>
          <div>
            <label>联系人：</label>
            <Input style={{ width: '70%' }} name="contact" value={searchList.contact} onChange={handleInput} />
          </div>
        </Col>
        <Col span={7}>
          <div>
            <label>联系电话：</label>
            <Input style={{ width: '70%' }} name="phone" value={searchList.phone} onChange={handleInput} />
          </div>
        </Col>
        <Col span={3}>
          <Button type="primary" onClick={getUserList}>查询</Button>
          <Button className="ml" onClick={reset}>重置</Button>
        </Col>
      </Row>
    </Card>
    <Card className="mt tr" >
      <Button type="primary" className="mr">新增企业</Button>
      <Popconfirm
        title="删除确认"
        description="删除不可恢复，是否确认删除"
        onConfirm={batchDelete}
        onCancel={onCancelDelete}
        okText="确认"
        cancelText="取消"
      >
        <Button danger disabled={batchDeleteType} >批量删除</Button>
      </Popconfirm>
    </Card>
    <Card className="mt">
      <Table 
        columns={columns} 
        dataSource={dataList} 
        rowKey={record => record.id}
        rowSelection={rowSelection}
        loading={loading}
        pagination={false}
      />
      <Pagination 
        className="mt flexRight"
        total={total}
        showSizeChanger
        showQuickJumper
        current={page} //双向绑定page页码，显示与page一样
        pageSize={pageSize} //双向绑定pageSize每页数量，显示与pageSize一样
        showTotal={(total) => `共 ${total} 条`}
        onChange={onPageChange}
       />
    </Card>
  </div>
}
export default UserList