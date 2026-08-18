import {Modal} from 'antd'
import React from 'react'

interface ModalPropsType {
  title:string,
  isModalOpen:boolean,
  onCancel?:()=>void,
  onOk?:()=>void,
  width?:number,
  footer?:null|React.ReactNode,
  children?:React.ReactNode
}



function MyModal (props:ModalPropsType){
  const {
    title,
    isModalOpen,
    children =<></>,
    width=800,
    onCancel=()=>{},
    onOk = ()=>{},
    footer
  } = props
  return <>
    <Modal 
      open={isModalOpen}
      title={title}
      onCancel={onCancel}
      width={width}
      onOk={onOk}
      // style={{textAlign:'center'}}
      footer={footer} //取消底部按钮
      >
      {children}
    </Modal>
  </>
}

export default React.memo(MyModal)