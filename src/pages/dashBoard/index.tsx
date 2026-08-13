import { Col, Row,Card,Progress,Statistic,Timeline, Tag } from "antd"
import {RadarChartOutlined,SnippetsOutlined,DollarOutlined,LaptopOutlined} from '@ant-design/icons'
import EChartsReact from "echarts-for-react"
import './index.scss'
import { useState,useEffect } from "react"
import { getDashList } from "@/api/dashBoard"

type EnergyDataType = {
  name:string,
  data:number[]
}
//企业资质情况-静态数据
  const companData = {
    color: ['#5470c6','#91cc75','#fac858'],
    title: {
        text: '企业资质情况(家)',
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
        data: ['2014', '2016', '2018', '2020', '2022', "2024"]
    },
    yAxis: {
        type: 'value',

    },
    series: [
        {
            name: '科技企业',
            type: 'bar',
            data: [40, 220, 378, 658, 1122, 1200]
        },
        {
            name: '高新企业',
            type: 'bar',
            data: [20, 39, 443, 490, 559, 762]
        },
        {
            name: '国营企业',
            type: 'bar',
            data: [78, 167, 229, 330, 380, 420]
        }
    ]
}
// 租赁情况-静态数据
const rentData = {
  legend: {
    top: 0,
    left:'center'
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
  center:['50%','70%'],
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [20, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      
      data: [
        { value: 40, name: '在营' },
        { value: 38, name: '已租' },
        { value: 32, name: '出租' },
        { value: 30, name: '续签' },
        { value: 28, name: '新签' },
        { value: 26, name: '待租' },
        { value: 22, name: '退租' },
      ]
    }
  ]
}

function DashBoard(){
  //能源消耗，动态数据-接口返回
  const option = {
  title: {
    text: '当日能源消耗',
    left:0,
    top:0
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
    left: '3%',
    right: '3%',
    bottom: '0',
    top:50,
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
    data: ['00:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
  },
  yAxis: {
    type: 'value'
  },
  series: []
};
  
//能源消耗，动态数据-接口返回
  const [energyData,setEnergyData] = useState(option)

  useEffect(()=>{
    getEnergyList()
  },[energyData])

  async function getEnergyList(){
    const {data} = await getDashList()
    // console.log(data)
    const titleData = data.map((item:EnergyDataType)=>item.name)
    // console.log(titleData)
    const seriesData = data.map((item:EnergyDataType)=>{
      return {
        name:item.name,
        data:item.data,
        type:'line',
        stack:"Total"
      }
    })
    setEnergyData({...energyData,legend:{data:titleData,top:0,left:'center'},series:seriesData})
  }
  

  return <>
  <div className="dashBoard">
    <Row gutter={16}>
      <Col span={6}>
        <Card className="clearflow card">
          <div className="fl area">
            <h2>13479</h2>
            <p>园区总面积(平方米)</p>
          </div>
          <div className="fr icon">
            <RadarChartOutlined />
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="clearflow card">
          <div className="fl area">
            <h2>8635</h2>
            <p>总租赁面积(平方米)</p>
          </div>
          <div className="fr icon" style={{color:'#81c452'}}>
            <SnippetsOutlined />
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="clearflow card">
          <div className="fl area">
            <h2>38764</h2>
            <p>园区总产值(万元)</p>
          </div>
          <div className="fr icon" style={{color:'#62c9cb'}}>
            <DollarOutlined />
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="clearflow card">
          <div className="fl area">
            <h2>2874</h2>
            <p>入驻企业总数(家)</p>
          </div>
          <div className="fr icon" style={{color:'#e49362'}}>
            <LaptopOutlined />
          </div>
        </Card>
      </Col>
    </Row>
    <Row gutter={16} className="mt">
      <Col span={12}>
        <Card title="能源消耗情况">
           <EChartsReact option={energyData}></EChartsReact>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="企业资质情况">
           <EChartsReact option={companData}></EChartsReact>
        </Card>
      </Col>
    </Row>
    <Row gutter={16} className="mt">
      <Col span={12}>
        <Card title="租赁情况" >
           <EChartsReact option={rentData}></EChartsReact>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="充电桩数据" style={{textAlign:'center',height:'404px'}}>
          <Progress type="circle" percent={75} />
          <Statistic title="充电桩数" value={75} suffix="/ 100" style={{marginTop:'20px'}} />
        </Card>
      </Col>
      <Col span={6}>
        <Card title="实时车辆信息" style={{height:'404px'}}>
          <Timeline
              items={[
                {
                  content: <><Tag color='green'>进场</Tag> <span>14:40</span> 车辆<span> 京A12345</span></>
                },
                {
                  content: <><Tag color='red'>出场</Tag> <span>13:20</span> 车辆<span> 京A56789</span></>,
                  color: 'red'
                },
                {
                  content:<><Tag color='green'>进场</Tag> <span>10:18</span> 车辆<span> 京A11111</span></>
                },
                {
                  content: <><Tag color='red'>出场</Tag> <span>09:50</span> 车辆<span> 京A12121</span></>,
                  color: 'red'
                },
                {
                  content: <><Tag color='green'>进场</Tag> <span>08:24</span> 车辆<span> 京A56565</span></>
                },
                {
                  content: <><Tag color='green'>进场</Tag> <span>08:15</span> 车辆<span> 京A76565</span></>
                },
              ]}
            />
        </Card>
      </Col>
    </Row>
  </div>
  </>
}
export default DashBoard