import { Card,Row,Col,Input,Button } from "antd"
import React from "react"

interface SearchPropsType {
  inputPlaceholder?:string,
  inputName?:string,
  inputvalue?:string,
  onInputChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  onButtonClick?:()=>void,
  hasRestButton?:boolean
  onReset?:()=>void,
}

function SearchCard(props:SearchPropsType){
  const {
    inputPlaceholder,
    inputName,
    inputvalue,
    onInputChange,
    onButtonClick,
    hasRestButton=false,
    onReset,
    ...rest
  }= props
  return <>
    <Card>
      <Row gutter={16}>
        <Col span={6}>
          <Input placeholder={inputPlaceholder} name={inputName} value={inputvalue} onChange={onInputChange} {...rest}/>
        </Col>
        <Col span={10}>
          <Button type="primary" onClick={onButtonClick}>查询</Button>
          {hasRestButton && <Button  onClick={onReset} className="ml">重置</Button> }
        </Col>
      </Row>
    </Card>
  </>
}

export default React.memo(SearchCard)