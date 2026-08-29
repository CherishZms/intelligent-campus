import {post} from '@/utils/request'

interface dataType{
  date:string
}

export const getTodoListApi =(data:dataType)=>{
  return post('/getTodoList',data)
}