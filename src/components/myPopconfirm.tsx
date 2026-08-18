import {Popconfirm} from 'antd'
import { useEffect } from 'react'
import React from 'react'

interface PopConfirmType{
  title?:string,
  description?:string,
  onConfirm?:()=>void,
  onCancel?:()=>void,
  okText?:string,
  cancelText?:string,
  children?:React.ReactNode
}

function MyPopconfirm (props:PopConfirmType){

  // useEffect(()=>{
  //   console.log("子组件更新了")
  // })

  const {
    title="删除确认",
    description="删除不可恢复，是否确认删除",
    onConfirm=()=>{},
    onCancel=()=>{},
    okText="确认",
    cancelText="取消",
    children=<></>
  } = props

  return <Popconfirm
        title={title}
        description={description}
        onConfirm={onConfirm}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >{children}</Popconfirm>
}
export default React.memo(MyPopconfirm)