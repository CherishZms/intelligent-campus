// 我是账单管理组件
import { Card, Row, Col, Statistic, Input, Table, Button, Tag, DatePicker, Select, TableProps, TimeRangePickerProps, message } from "antd"
import { DownloadOutlined, FileMarkdownOutlined, DeleteOutlined } from '@ant-design/icons'
import { getBillListApi } from "@/api/bill"
import { useEffect, useMemo, useState } from "react";
import MyPagination from "@/components/MyPagination"
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
import { exportToExcel } from "@/utils/exportToExcel/exportToExcel"
import { ExportButton } from "@/components/ExportButton";
import { ExportColumn } from "@/utils/exportToExcel/exportConfig";
import {ExportPDFButton} from "@/components/ExportPDFButton"
import MyPopconfirm from "@/components/myPopconfirm";
import { useExportPDF } from "@/hooks/useExportPDF";

const { RangePicker } = DatePicker;

/**
 * Todo:
 * 1.增加导入功能，下载模板导入
 * 2.全部导出
 */

interface BillType {
  billNo: string, //账单号
  billStatus: string, //缴费状态  1未缴费，2已缴费
  estateNo: string,//楼宇名称 
  roomNo: string, //房屋号
  carNo: string, //车位号
  tel: string, //手机号
  estateFee: number, //物业费(年) ￥
  carFee: number,//车位费 元/月
  roomPrice: number, //房屋租金 /年
  startDate: string, //开始时间 2026-01-01
  endDate: string, //结束时间
  countPrice: number, //优惠金额 ￥
  totalPrice: number,//合计应收金额  ￥
  payMethod: string,//支付方式 1微信，2支付宝 ，3银行卡
}

interface searchDataType {
  startDate: string,
  endDate: string,
  billStatus: string,
  roomOrCarNo: string
}

const defaultSearchData = {
  startDate: "",
  endDate: "",
  billStatus: "",
  roomOrCarNo: ""
}

function Bill() {

  const [billList, setBillList] = useState<BillType[]>([])
  const [total, setTotal] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<BillType[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [searchData, setSearchData] = useState<searchDataType>(defaultSearchData)
  const [dateSelect, setDateSelect] = useState<[Dayjs, Dayjs] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
 

  const disable = useMemo(() => {
    return selectedRowKeys.length ? false : true
  }, [selectedRowKeys])

  const onPrint = (rows:BillType)=>{
    
  }
  const billColumns: TableProps<BillType>['columns'] = [
    {
      key: "index",
      dataIndex: "index",
      title: "序号",
      render(value, record, index) {
        return index + 1
      },
      width: 80,
      align: "center",
      fixed: 'start'
    },
    {
      key: "billNo",
      dataIndex: "billNo",
      title: "账单号",
      width: 120,
      align: "center",
      fixed: 'start',
    },
    {
      key: "billStatus",
      dataIndex: "billStatus",
      title: "缴费状态",
      width: 120,
      align: "center",
      render(value) {
        if (value === "1") {
          return <Tag color="red">未缴费</Tag>
        } else {
          return <Tag color="green">已缴费</Tag>
        }
      },
    },
    {
      key: "estateNo",
      dataIndex: "estateNo",
      title: "楼宇名称",
      width: 120,
      align: "center"
    },
    {
      key: "roomNo",
      dataIndex: "roomNo",
      title: "房屋号",
      width: 120,
      align: "center"
    },
    {
      key: "carNo",
      dataIndex: "carNo",
      title: "车位号",
      width: 120,
      align: "center"
    }, {
      key: "tel",
      dataIndex: "tel",
      title: "手机号",
      width: 120,
      align: "center"
    }, {
      key: "estateFee",
      dataIndex: "estateFee",
      title: "物业费(年)",
      width: 120,
      align: "center",
      render(value) {
        return `${value}元`
      }
    }, {
      key: "carFee",
      dataIndex: "carFee",
      title: "车位费",
      width: 120,
      align: "center",
      render(value) {
        return `${value}元`
      }
    }, {
      key: "roomPrice",
      dataIndex: "roomPrice",
      title: "房屋租金",
      width: 120,
      align: "center",
      render(value) {
        return `${value}元`
      }
    }, {
      key: "startDate",
      dataIndex: "startDate",
      title: "开始时间",
      width: 120,
      align: "center"
    }, {
      key: "endDate",
      dataIndex: "endDate",
      title: "结束时间",
      width: 120,
      align: "center"
    }, {
      key: "countPrice",
      dataIndex: "countPrice",
      title: "优惠金额",
      width: 120,
      align: "center",
      render(value) {
        return `${value}元`
      }
    }, {
      key: "totalPrice",
      dataIndex: "totalPrice",
      title: "合计应收金额",
      width: 120,
      align: "center",
      render(value) {
        return `￥${value}`
      }
    }, {
      key: "payMethod",
      dataIndex: "payMethod",
      title: "支付方式",
      width: 120,
      align: "center",
      render(value) {
        if (value === "1") {
          return <p>微信</p>
        } else if (value === "2") {
          return <p>支付宝</p>
        } else {
          return <p>银行卡</p>
        }
      }
    }, {
      key: "operate",
      title: "操作",
      width: 220,
      align: "center",
      render(value,record) {
        return <>
          <Button size="small" type="primary" onClick={exportToPDF}>打印</Button>
          <MyPopconfirm onConfirm={datchdDelete} title="作废确认">
            <Button size="small" type="primary" danger className="ml mr">作废</Button>
          </MyPopconfirm>
          <MyPopconfirm onConfirm={datchdDelete} title="退款确认">
            <Button size="small"  danger>退款</Button>
          </MyPopconfirm>
          
        </>
      },
      fixed: 'end',
    },
  ]

  useEffect(() => {
    getBillList()
  }, [page, pageSize])

  async function getBillList() {
    setLoading(true)
    const { data: { list, total } } = await getBillListApi({ page, pageSize, ...searchData })
    setLoading(false)

    setBillList(list)
    setTotal(total)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: BillType[]) => {
      setSelectedRows(selectedRows)
      setSelectedRowKeys(selectedRowKeys)
      // console.log(selectedRowKeys,selectedRows)
    },
    preserveSelectedRowKeys: true
  }

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const rangePresets: TimeRangePickerProps['presets'] = [
    {
      label: "最近7天", value: [dayjs().add(-7, 'd'), dayjs()]
    },
    {
      label: "最近14天", value: [dayjs().add(-14, 'd'), dayjs()]
    },
    {
      label: "最近30天", value: [dayjs().add(-30, 'd'), dayjs()]
    },
  ]

  const onRangeChange = (dates: null | (Dayjs | null)[], dataStrings: [string, string]) => {
    // console.log(dates,dataStrings)
    if (dates && dates[0] && dates[1]) {
      setDateSelect([dates[0], dates[1]])
    } else {
      setDateSelect(null)
    }
    setSearchData(pre => {
      return {
        ...pre,
        startDate: dataStrings[0],
        endDate: dataStrings[1]
      }
    })

  }
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchData(pre => {
      return {
        ...pre,
        roomOrCarNo: value
      }
    })
  }
  const selectChange = (value: string) => {
    // console.log(value)
    setSearchData(pre => {
      return {
        ...pre,
        billStatus: value
      }
    })
  }
  const onSearch = () => {
    console.log(searchData)
    getBillList()
  }

  const onReset = () => {
    setSearchData(defaultSearchData)
    setDateSelect(null)
    setSelectedRowKeys([])
  }

  const toExcel = async () => {
    await exportToExcel(selectedRows, '账单数据')
  }

   

  const exportColumns: ExportColumn<BillType>[] = [
    { dataIndex: 'billNo', title: '账单编号' },
    {
      dataIndex: 'billStatus',
      title: '缴费状态',
      render: (value) => (value === "1" ? '未缴费':'已缴费'),
    },
    { dataIndex: 'estateNo', title: '楼宇名称' },
    { dataIndex: 'roomNo', title: '房间号' },
    { dataIndex: 'carNo', title: '车牌号' },
    { dataIndex: 'tel', title: '联系电话' },
    {
      dataIndex: 'estateFee', title: '物业费',
      render(value) {
        return `${value}元`
      }
    },
    {
      dataIndex: 'carFee', title: '车位费',
      render(value) {
        return `${value}元`
      }
    },
    {
      dataIndex: 'roomPrice', title: '房屋租金',
      render(value) {
        return `${value}元`
      }
    },
    {
      dataIndex: 'countPrice', title: '优惠金额',
      render(value) {
        return `${value}元`
      }
    },
    { dataIndex: 'startDate', title: '开始日期' },
    { dataIndex: 'endDate', title: '结束日期' },
    {
      dataIndex: 'payMethod', title: '支付方式',
      render(value) {
        if (value === "1") {
          return "微信"
        } else if (value === "2") {
          return "支付宝"
        } else {
          return "银行卡"
        }
      }
    },
    {
      dataIndex: 'totalPrice', title: '合计应收金额',
      render(value) {
        return `￥${value}`
      }
    },
  ];

  const datchdDelete = async()=>{
    if(!selectedRowKeys || selectedRowKeys.length===0){
      message.warning("请勾选数据")
    }else{
      console.log(selectedRowKeys)
      // 可根据id发请求给后端
      // await batchDelete(selectedRowKeys)等待完成后重新渲染列表
      getBillList()
      setSelectedRowKeys([])
      setSelectedRows([])
    }
    
  }

  const { exportToPDF } = useExportPDF(
      selectedRows,
      exportColumns,
      "账单打印",
      true,
      "打印"
    );



  return <div className="bill">
    <Card>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="应收账单金额" value={16876.38} />
        </Col>
        <Col span={6}>
          <Statistic title="已缴账单金额" value={6954.00} />
        </Col>
        <Col span={6}>
          <Statistic title="已退账单金额" value={2355.23} />
        </Col>
        <Col span={6}>
          <Statistic title="未缴账单金额" value={9962.00} />
        </Col>
      </Row>
    </Card>
    <Card className="mt">
      <Row gutter={16}>
        <Col span={6} className="flex">
          <label >账单日期：</label>
          <RangePicker style={{ width: '80%' }}
            presets={rangePresets}
            onChange={onRangeChange}
            value={dateSelect}
          />
        </Col>
        <Col span={6} className="flex">
          <label>房/车位号：</label>
          <Input
            style={{ width: '80%' }}
            value={searchData.roomOrCarNo}
            name="roomOrCarNo"
            onChange={inputChange}
          />
        </Col>
        <Col span={6} className="flex">
          <label>缴费情况：</label>
          <Select
            options={[{ value: "", label: "全部" }, { value: "1", label: "未缴费" }, { value: "2", label: "已缴费" }]}
            defaultValue={""}
            style={{ width: '80%' }}
            onChange={selectChange}
            value={searchData.billStatus}
          />
        </Col>
        <Col span={6}>
          <Button type="primary" className="ml mr" onClick={onSearch}>查询</Button>
          <Button onClick={onReset}>重置</Button>
        </Col>
      </Row>
    </Card>
    <Card className="mt flexRight">
      {/* <Button icon={<DownloadOutlined />} type="primary" size="large" onClick={toExcel}>导出为Excel</Button>
       */}
      <ExportButton<BillType>
        data={selectedRows}
        columns={exportColumns}
        fileName="账单列表"
        showIndex={true}
        disabled={disable}
      />
      <ExportPDFButton 
        data={selectedRows}
        columns={exportColumns}
        fileName="账单列表"
        showIndex={true}
        disabled={disable}
        className="ml mr"
      />
      <MyPopconfirm
        onConfirm={datchdDelete}
        title="作废确认"
        description="此操作不可恢复，请谨慎操作"
      >
        <Button 
          icon={<DeleteOutlined />} 
          danger 
          type="primary" 
          size="large" 
          disabled={disable} 
        >
          批量作废</Button>
        </MyPopconfirm>
      
    </Card>
    <Card className="mt">
      <Table
        columns={billColumns}
        dataSource={billList}
        rowKey={record => record.billNo}
        rowSelection={rowSelection}
        pagination={false}
        scroll={{ x: 1000 }}
        loading={loading}

      />
    </Card>
    <MyPagination
      total={total}
      page={page}
      pageSize={pageSize}
      onPaginationChange={onPageChange}
    />
  </div>
}
export default Bill