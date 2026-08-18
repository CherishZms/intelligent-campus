import {Pagination} from 'antd'
import React from 'react'
import type {PaginationProps} from 'antd'

interface PaginationPropsType{
  total:number,
  page:number,
  pageSize:number,
  onPaginationChange:PaginationProps['onChange']
}


function MyPagination(props:PaginationPropsType){

  const {
    total,
    page,
    pageSize,
    onPaginationChange
  } = props

  return <>
    <Pagination 
        className="mt flexRight"
        total={total}
        showSizeChanger
        showQuickJumper
        current={page} //双向绑定page页码，显示与page一样
        pageSize={pageSize} //双向绑定pageSize每页数量，显示与pageSize一样
        showTotal={(total) => `共 ${total} 条`}
        onChange={onPaginationChange}
       />
  </>
}

export default React.memo(MyPagination)