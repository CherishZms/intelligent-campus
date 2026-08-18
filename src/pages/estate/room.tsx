// 我是房间管理组件
import {Card,Col,Radio,Row,Spin,Image} from 'antd'
import type {CheckboxGroupProps} from 'antd/es/checkbox'
import {getRoomListServies} from '@/api/roomList'
import { useEffect, useState } from 'react'
import type {RadioChangeEvent} from 'antd/es/radio'

const options:CheckboxGroupProps<string>['options'] = [
  { label:"东座1期A栋",value:"1001"},
  { label:"东座1期B栋",value:"1002"},
  { label:"东座1期C栋",value:"1003"},
  { label:"东座1期D栋",value:"1004"},
  { label:"东座2期A栋",value:"1005"},
  { label:"东座2期B栋",value:"1006"},
  { label:"东座2期C栋",value:"1007"},
  { label:"东座2期D栋",value:"1008"},
  { label:"西座1期A栋",value:"1009"},
  { label:"西座1期B栋",value:"1010"},
  { label:"西座1期C栋",value:"1011"},
  { label:"西座1期D栋",value:"1012"},
  { label:"西座2期A栋",value:"1013"},
  { label:"西座2期B栋",value:"1014"},
  { label:"西座2期C栋",value:"1015"},
  { label:"西座2期D栋",value:"1016"},
]

type RoomList = {
  roomNumber:number,
  decorationType:'毛坯'|'精装'|'',
  area:number,
  unitPrice:number,
  src:string
}

function Room(){

  const [rooms,setRooms] = useState<RoomList[]>([])
  const [selectRadioValue,setSelectRadioValue] = useState<string>("1001")
  const [loading,setLoading] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const [srcPic,setSrcPic] = useState<string>("")

  useEffect(()=>{
    getRoomList()
  },[selectRadioValue])

  async function getRoomList(){
    setLoading(true)
    const res = await getRoomListServies(selectRadioValue)
    console.log(res.data.rooms)
    setRooms(res.data.rooms)
    setLoading(false)
  }

  function changValue (e:RadioChangeEvent){
    const value = e.target.value
    setSelectRadioValue(value)
  }

  function showPic(pic:string){
    setOpen(true)
    setSrcPic(pic)
  }

  return <div className="room">
    <Image
      preview={{
          open,
          src: srcPic,
          onOpenChange: (value) => {
            setOpen(value);
          },
        }}
    />
    <Card>
      <Radio.Group 
        optionType="button"
        buttonStyle="solid"
        options={options}
        defaultValue={"1001"}
        onChange={e=>changValue(e)}
      />
    </Card>
    <Spin spinning={loading}>
    <Row gutter={16} className='mt'>
      {
        rooms.map((item,index)=>{
          return <Col span={6} className='mb' key={index}>
              <Card 
                    title="房间号"
                    extra={<a onClick={()=>showPic(item.src)}>户型图</a>
                    
                    }
                    >
                      <h1 className='tc'>{item.roomNumber}</h1>
                      <div className='clearflow mt'>
                        <p className='fl'>装修情况：</p>
                        <p  className='fr'>{item.decorationType}</p>
                      </div>
                      <div className='clearflow mt'>
                        <p className='fl'>房间面积：</p>
                        <p  className='fr'>{item.area}㎡</p>
                      </div>
                      <div className='clearflow mt'>
                        <p className='fl'>出租单价：</p>
                        <p  className='fr'>{item.unitPrice}元/平/日</p>
                      </div>
                  </Card>
                   </Col>
        })
      }
     
    </Row>
    </Spin>
  </div>
}
export default Room