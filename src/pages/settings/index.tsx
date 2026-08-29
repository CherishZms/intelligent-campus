/**
 * 我是系统设置组件
 * @returns 
 */
import { Row,Radio, Col, Card, Input, Button, Table, TableProps, Pagination, message, Modal, Form, Select, RadioChangeEvent, Tree } from "antd"
import {getSystemUserListApi,searchUserApi,addUserApi,deleteUserApi} from "@/api/settings"
import useDataList from "@/hooks/useDataList"
import {isValidSearchInput} from "@/utils/IsValidInput"
import { ChangeEvent, useState } from "react"
import { useForm } from "antd/es/form/Form"
import type {TreeProps,RadioGroupProps,TreeDataNode} from "antd"
import { useSelector } from "react-redux"
import MyPopconfirm from "@/components/myPopconfirm"

export interface SearchType {
  userName:string
}

export interface MenuType  {
  icon:string,
  label:string,
  key:string,
  children?:MenuType[]
}

interface UserListType{
  userId:string
  userName:string,
  passward?:string,
  role:string,
  person:string,
  apartment:string,
  modify?:boolean,
  tel:string,
  menu:MenuType[]
}
const initalFormData:UserListType = {
  userId:"",
  userName:"",
  passward:"",//以后扩展
  role:"user",
  person:"",
  apartment:"研发部",
  modify:true,
  tel:"",
  menu:[]
}

function Settings() {

  const {
    loading,
    page,
    pageSize,
    total,
    dataList,
    handleChange,
    searchParams,
    onChange,
    getFetchData,
    setDataList,
    setTotal
  } = useDataList<SearchType,UserListType>({userName:""},getSystemUserListApi)
  const [open,setOpen] = useState<boolean>(false)
  const [formData,setFormData] = useState<UserListType>(initalFormData)
  const [modifyOpen,setModifyOpen] = useState<boolean>(false)
  const [defaultKeys,setDefaultKeys] = useState<string[]>([])
  const [currentUser,setCurrentUser] = useState<string>("")

  const [form] = useForm()
  const {asyncRouterList} = useSelector((state:any)=>state.authSlice)

  const handleRole = (record:UserListType)=>{
    setModifyOpen(true)
    const obj = handleTree(record.menu)
    // console.log(obj)
    setDefaultKeys(obj)
    setCurrentUser(record.userName)
  }

  const deleteUser = async (record:UserListType)=>{
    console.log(record.userName,record.userId)
    const {data:{list,total}} = await deleteUserApi({userName:record.userName,userId:record.userId})
    if(list.length>0){
      setDataList(list)
      setTotal(total)
      message.success("删除成功")
    }else{
      message.error("删除失败，用户不存在")
    }
    
  }

  const userListColumns:TableProps<UserListType>['columns'] = [
    {
      key:"index",
      title:"序号",
      render(value, record, index) {
        return index+1
      },
      align:'center',
      width:80
    },
    {
      title:"账号名称",
      key:"userName",
      dataIndex:"userName",
      align:'center',
      width:120
    },
    {
      title:"所属权限",
      key:"role",
      dataIndex:"role",
      align:'center',
      width:120
    },
    {
      title:"使用人",
      key:"person",
      dataIndex:"person",
      align:'center',
      width:120
    },
    {
      title:"使用人电话",
      key:"tel",
      dataIndex:"tel",
      align:'center',
      width:120
    },
    {
      title:"所属部门",
      key:"apartment",
      dataIndex:"apartment",
      align:'center',
      width:120
    },
    {
      title:"操作",
      key:"operate",
      align:'center',
      width:200,
      render(value, record) {
        return <>
          <Button type="primary" className="mr" disabled={!record.modify} onClick={()=>handleRole(record)}>修改权限</Button>
          <MyPopconfirm onConfirm={()=>deleteUser(record)}>
            <Button type="primary" danger disabled={!record.modify}>删除账号</Button>
          </MyPopconfirm>
        </>
      },
    }
  ]
  const onSearch = async ()=>{
    // console.log(isValidSearchInput(searchParams.userName))
    if(isValidSearchInput(searchParams.userName)){
      
      try{
        const {data:{list,total}} = await searchUserApi(searchParams)
        // console.log(list)
        if(list.length>0){
          setDataList(list)
          setTotal(total)
        }else{
          message.warning('该账户不存在')
        }
        
      }catch(err){
        message.warning('查询失败，请稍后再试')
      }
    }else{
      message.warning('查询参数无效')
    }
  }

  const addUser =()=> {
    setOpen(true)
    form.setFieldsValue(initalFormData)
  }
  const handleInput = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setFormData((pre:UserListType)=>{
      return {
        ...pre,
        [name] : value
      }
    })
  }

  const handleSelect = (value:string)=>{
    // console.log(value)
    setFormData((pre:UserListType)=>{
      return {
        ...pre,
        apartment : value
      }
    })
  }

  const handleRadio:RadioGroupProps['onChange'] = (e)=>{
    // const {value} =  e.target
    setFormData((pre:UserListType)=>{
      return {
        ...pre,
        role :  e.target.value
      }
    })
  }

  const handleAdd = ()=>{
    form.validateFields().then(async (res)=>{
      // console.log(res)
      // fa请求
     const {data:{list,total}} =  await addUserApi(res)
    // console.log(response) 
    setDataList(list)
    setTotal(total)
     message.success('提交成功')
      // console.log(res)
      //关闭弹窗
      setOpen(false)
      //重新渲染表格
    }).catch(err=>{
      message.error(err.message)
      // console.log(err)
    })
  }

  const modifyModal = async ()=>{
    setModifyOpen(true)
    const obj = handleTree(asyncRouterList)
    setDefaultKeys(obj)
    const useName = localStorage.getItem("username") || ""
    setCurrentUser(useName)
    
  }

  const treeData:TreeDataNode[] = [
    {
      title:'工作台',
      key:'/dashboard'
    },
    {
      title:'租户管理',
      key:'/users',
      children:[
        {
          title:'租户列表',
          key:'/users/list'
        }
      ]
    },
    {
      title:'物业管理',
      key:'/estate',
      children:[
        {
          title:'楼宇管理',
          key:'/estate/tenement'
        },
        {
          title:'房间管理',
          key:'/estate/room'
        },
        {
          title:'车辆信息',
          key:'/estate/car'
        },
      ]
    },
    {
      title:'报修管理',
      key:'/repair'
    },
    {
        title: "财务管理",
        key: "/finance",
        children: [
            {
                title: "合同管理",
                key: "/finance/contract",

            },
            {
                title: "合同详情",
                key: "/finance/surrender",
            },
            {
                title: "账单管理",
                key: "/finance/bill",
            }
        ]
    },
    {
        title: "招商管理",
        key: "/merchants",
    },
    {
        title: "运营管理",
        key: "/operation",
        children: [
            {
                title: "运营总览",
                key: "/operation/all",

            },
            {
                title: "文章发布",
                key: "/operation/article",
            },
        ]
    },
    {
        title: "设备管理",
        key: "/equipment",
    },
    {
        title: "能源消耗",
        key: "/energy",
    },
    {
        title: "系统设置",
        key: "/settings",
    },
    {
        title: "个人中心",
        key: "/personal",
    }
  ]

  const handleTree = (asyncRouterList:MenuType[]):string[]=>{
    const res:string[] = []
    asyncRouterList.forEach((item)=>{
      if(item.children && item.children.length>0){
        const child = handleTree(item.children)
        res.push(...child)
      }else{
        res.push(item.key)
      }
    })
    return res
  }
const handleOk = ()=>{
  // console.log(defaultKeys)
  // console.log(currentUser,defaultKeys)
  //发请求currentUser,defaultKeys 或者userId
  message.success('修改权限成功')
  setModifyOpen(false)
}
const handleCancel = ()=>{
  setDefaultKeys([])
  setModifyOpen(false)
  setCurrentUser("")
}

const handleTreeCheck:TreeProps['onCheck'] = (checked)=>{
  setDefaultKeys(checked as string[])
}
 
  return <div className="settings">
    <Card>
      <Row gutter={16}>
        <Col span={6}>
          <Input 
            placeholder="请输入用户名称或使用人" 
            name="userName"
            // style={{width:'60%'}}
            onChange={handleChange}
            value={searchParams.userName}
             />
        </Col>
        <Col span={12}>
          <Button type="primary" onClick={onSearch}>查询</Button>
        </Col>
        <Col span={6} className="tr">
        <Button type="primary" className="mr" onClick={modifyModal}>当前用户权限</Button>
          <Button type="primary" onClick={addUser}>新增用户</Button>
        </Col>
      </Row>
    </Card >
    <Card className="mt" title="账户列表">
      <Table 
        columns={userListColumns}
        dataSource={dataList}
        rowKey={record=>record.userId}
        pagination={false}
        loading={loading}
        />
      <Pagination
        total={total}
        showTotal={()=>`共计 ${total} 条`}
        showQuickJumper
        showPrevNextJumpers
        current={page}
        pageSize={pageSize}
        className="mt flexRight"
        onChange={onChange}
      />
    </Card>
    <Modal 
      open={open}
      onCancel={()=>setOpen(false)}
      title="新增用户"
      width="800px"
      onOk={handleAdd}
      
    >
      <Form 
        labelCol={{span:10}}
        wrapperCol={{span:8}}
        form={form}
      >
        <Form.Item
          label="账户名称"
          name="userName"
          rules={[{required:true,message:"账户名称不能为空"}]}
        >
          <Input  value={formData.userName} onChange={handleInput} />
        </Form.Item>
        <Form.Item
          label="使用人名称"
          name="person"
          rules={[{required:true,message:"使用人不能为空"}]}
        >
          <Input  value={formData.person} onChange={handleInput}/>
        </Form.Item>
        <Form.Item
          label="使用人号码"
           name="tel"
          rules={[{required:true,message:"号码不能为空"}]}
        >
          <Input  
            value={formData.tel} 
            onChange={handleInput}
            />
        </Form.Item>
        <Form.Item
          label="所属部门"
          initialValue={"研发部"}
          name="apartment"
          rules={[{required:true,message:"部门不能为空"}]}
        >
          <Select 
            options={[{value:"研发部",label:"研发部"},{value:"网络部",label:"网络部"},{value:"行政部",label:"行政部"}]}
            onChange={handleSelect}
            // defaultValue={"研发部"}
            ></Select>
        </Form.Item>
        <Form.Item
          label="角色"
          initialValue="admin"
          name="role"
          rules={[{required:true,message:"角色不能为空"}]}
        >
          <Radio.Group 
            value={formData.role}  
            options={[{value:"admin",label:"管理员"},{value:"user",label:"普通用户"}]}
            onChange={handleRadio}
            />
        </Form.Item>
      </Form>

    </Modal>
    <Modal
      title="修改权限"
      width="400px"
      open={modifyOpen}
      onCancel={handleCancel} 
      style={{fontSize:'40px'}}
      onOk={handleOk}
      okText="确认修改"
      >
      <Tree
        treeData={treeData}
        defaultCheckedKeys={defaultKeys}
        checkedKeys={defaultKeys}
        // onSelect={handleTreeSelect}
        autoExpandParent
        checkable
        onCheck={handleTreeCheck}
      />
    </Modal>
  </div>
}
export default Settings