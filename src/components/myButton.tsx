import React from "react"

//定义props的泛型接口
interface MyButtonProps{
  bgc?:string
  children?:React.ReactNode
}

//自定义封装组件
const MyButton:React.FC<MyButtonProps> = (props)=>{
  const myStyle = {padding:20,borderRadius:'20px',backgroundColor:props.bgc}
  return <button style={myStyle}>{props.children}</button>
}

export default MyButton


/*
组件使用:
  import MyButton from "../../components/myButton"
  <MyButton bgc="lightBlue">hello</MyButton>
*/