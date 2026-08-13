import {get} from '@/utils/request'


export const getDashList = ()=>{
  return get('/getDashBoardData')
}