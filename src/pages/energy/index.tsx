// 我是能源消耗组件
import { Row,Col, Card, Table, TableProps } from 'antd'
import ReactECharts from 'echarts-for-react'
import {energyStateApi,getEneryYearDetailApi,getEneryDataApi,getCompanyEnergyDataApi} from '@/api/enery'
import { useEffect, useState } from 'react'
import type {EChartsOption} from "echarts-for-react"

interface EnergyStateType {
  name: string,
  type: string,
  stack: string,
  data:number[]
}

interface TableType{
  companyName:string,
  address:string,
  energy:number,
  hotEnergy:number,
  carbon:number,
  total?:number
}

//能源消耗情况，初始数据，折线图
 const initialEnergyState = {
  title: {
    text: '当日能源消耗',
    left:0,
    top:0,
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: [],
    top:0,
    left:'center'
  },
  grid: {
    left: '1%',
    right: '4%',
    bottom: '1%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
  },
  yAxis: {
    type: 'value'
  },
  series: []
  }

//年度消耗总览，初始数据，折线图
const initialEnergyYearOption = {
   color: ['#5470c6','#91cc75','#fac858','#dcb9b9','#8dc8eb'],
    title: {
        text: '2026年度资源消耗总览',
        top:0,
        left:0
    },
  
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
      top:0,
      right:0
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: [0, 0.01],
        data: []
    },
    yAxis: {
        type: 'value',

    },
    series: []
}

const PIE_ENERGGY_SERIES = {
   name: 'Chart',
      type: 'pie',
      radius: [40, 120],
      center: ['50%', '60%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
}

//用电能耗占比，初始数据，饼状图
const initialEnergyData = {
   legend: {
    top: 'top'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      // dataView: { show: true, readOnly: false },
      // restore: { show: true },
      // saveAsImage: { show: true }
    }
  },
  series: [
    {
      ...PIE_ENERGGY_SERIES,
      data: []
    }
  ]
}

function Energy(){

  // const [energyStateData,setEnergyStateData] =useState<EnergyStateType[]>([])
  const [energyStateOption,setEnergyStateOption] = useState<EChartsOption>(initialEnergyState)
  const [energyYearOption,setEnergyYearOption] = useState<EChartsOption>(initialEnergyYearOption)
  const [energyData,setEnergyData] = useState<EChartsOption>(initialEnergyData)
  const [tableData,setTableData] =useState<TableType[]>([])

  const tableColums:TableProps<TableType>['columns'] = [
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
      key:"companyName",
      dataIndex:"companyName",
      title:"公司名称",
      align:'center',
      width:140
    },
    {
      key:"address",
      dataIndex:"address",
      title:"所在楼宇",
      align:'center',
      width:120
    },
    {
      key:"energy",
      dataIndex:"energy",
      title:"电力消耗",
      align:'center',
      width:100
    },
    {
      key:"hotEnergy",
      dataIndex:"hotEnergy",
      title:"热力消耗",
      align:'center',
      width:100
    },
    {
      key:"carbon",
      dataIndex:"carbon",
      title:"碳排放",
      align:'center',
      width:100
    },
  ]
 

  useEffect(()=>{
    getStateData()
    getEneryYearDetail()
    getEneryData()
    getCompanyEnergyData()
  },[])

  async function getStateData(){
    const energyTypes = ['煤', '气', '油', '电', '热']
    const {data:{energyData,timePoints}} = await energyStateApi()
    // console.log(timePoints)
    const series:EnergyStateType[] = energyTypes.map((energy:any)=>{
      return {
        name:energy,
        type: 'line',
        stack: 'Total',
        data:energyData.map((item:any)=>item[energy])
      }
    })
    // console.log(temp)
   setEnergyStateOption((pre:EChartsOption)=>{
      return {
        ...pre,
        series,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timePoints
        },
        legend: {
          data: energyTypes,
          top:0,
          left:'center'
        },
    }
    })
  }

  async function getEneryYearDetail(){
    const {data:{energyDataAll,title,timePoints}} =await getEneryYearDetailApi()
    // console.log(energyDataAll)
    setEnergyYearOption((pre:any)=>{
      return {
        ...pre,
        xAxis: {
          type: 'category',
          boundaryGap: [0, 0.01],
          data: title,
        },
        series:timePoints.map((name:string)=>{
          return {
            name,
            type: 'bar',
            data:energyDataAll.map((item:any)=>item[name])
          }
        })
    }
    })
  }

  async function getEneryData() {
    const {data:{categories,values}} = await getEneryDataApi()
    // console.log(res)
    const seriesData = categories.map((name:string,index:number)=>{
      return {
        name,
        value:values[index]
      }
    })
    // console.log(series)
    setEnergyData((pre:EChartsOption)=>{
      return {
        ...pre,
        series:[
          {
            ...PIE_ENERGGY_SERIES,
            data:seriesData
          }
        ]
      }
    })
  }

  async function getCompanyEnergyData(){
    const {data} = await getCompanyEnergyDataApi()
    // console.log(data)
    setTableData(data)
  }

  return <div className="energy">
    <Row gutter={16}>
      <Col span={12}>
        <Card title="当日能源消耗情况">
          <ReactECharts option={energyStateOption}/>
        </Card>
      </Col>
      <Col span={12}>
         <Card title="年度能源消耗情况">
          <ReactECharts option={energyYearOption}/>
        </Card>
      </Col>
    </Row>
    <Row gutter={16} className='mt'>
      <Col span={12}>
        <Card title="电力消耗占比">
          <ReactECharts option={energyData}/>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="公司能源消耗">
          <Table 
            columns={tableColums}
            dataSource={tableData}
            pagination={false}
          />
        </Card>
      </Col>
    </Row>
  </div>
}
export default Energy