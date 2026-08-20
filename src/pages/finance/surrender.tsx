// 我是合同详情组件
/*
  此页面入口必须是从合同管理页面点击合同详情按钮进入
  路由携带id，发请求后端返回合同详情数据

  由于没有动态数据，先传已有的合同部分信息展示，其余部分使用静态数据
*/

import { Button, Card, Descriptions, Tag } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import type { DescriptionsProps } from "antd"

function Surrender() {
  const location = useLocation()
  const navigate = useNavigate()
  // 此处正常页面传contractNo，前端不带任何其他参数
  
  const { record } = location?.state || ""
  //返回合同管理页面，携带本页面标识
  const onBack = () => {
    navigate("/finance/contract", { state: { detail: true } })
  }

  const handleStatus = (value: string | undefined) => {
    console.log(value)
    if (value === "1") {
      return <Tag color="red">待审批</Tag>
    } else if (value === "2") {
      return <Tag color="blue">审批中</Tag>
    } else if (value === "3") {
      return <Tag color="green">审批通过</Tag>
    } else {
      return <Tag color="#f5d">审批拒绝</Tag>
    }
  }

  const desItems1: DescriptionsProps['items'] = [
    {
      key: "constractType",
      label: "合同类型",
      children: record?.constractType || ""
    },
    {
      key: "constractName",
      label: "合同名称",
      children: record?.constractName || ""
    },
    {
      key: "constractBeginDate",
      label: "合同开始日期",
      children: record?.constractBeginDate || ""
    },
    {
      key: "jia",
      label: "甲方",
      children: record?.jia || ""
    },
    {
      key: "yi",
      label: "乙方",
      children: record?.yi || ""
    },
    {
      key: "constractEndDate",
      label: "合同结束日期",
      children: record?.constractEndDate || ""
    },
    {
      key: "status",
      label: "审批状态",
      children: handleStatus(record?.status)
    },
    {
      key: "rejectReason",
      label: "拒绝原因",
      children: <p style={{color:"red"}}>缺少法人盖章</p>
    },
    {
      key: "tel",
      label: "联系方式",
      children: "13212121212"
    },
    {
      key: "desc",
      label: "附加条款",
      span:'filled',
      children: <div>
        <p>1.半年租，月租</p>
        <p>2.费用已包含空调费用</p>
        <p>3.含两个车位使用权（不含充电桩）</p>
        <p>4.早上9点前、中午12点-14点、19点后禁止装修</p>
      </div>
    },
  ]

  const desItems2: DescriptionsProps['items'] = [
    {
      key: "estateName",
      label: "所在楼宇",
      children: "东座1期A栋"
    },
    {
      key: "roomNo",
      label: "房间号",
      children: "506"
    },
    {
      key: "roomScale",
      label: "房屋面积",
      children: "96㎡"
    },
    {
      key: "roomPice",
      label: "计价面积",
      children: "70㎡"
    },
    {
      key: "estateFee",
      label: "物业费",
      children: "6800"
    },
    {
      key: "roomStatus",
      label: "房屋状态",
      children: "精装"
    },
    {
      key: "estatePerson",
      label: "物业管家",
      children: "余军"
    },
    {
      key: "estateTel",
      label: "管家电话",
      children: "13212121212"
    },
  ]

  return <div className="surrender">
    <Card>
      <Button type="primary" size="large" onClick={onBack}>返回</Button>
    </Card>
    <Card className="mt">
      <Descriptions
        title={`合同编号：${record?.contractNo || ""}`}
        items={desItems1}
        bordered
        column={3}
        className="mb"
      />
      <Descriptions 
        title="租赁房间信息" 
        className="mt"
        bordered
        column={3}
        items={desItems2}
        />
    </Card>
  </div>
}
export default Surrender