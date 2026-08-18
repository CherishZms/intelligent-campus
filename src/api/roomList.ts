import { post } from "@/utils/request";

export const getRoomListServies = (roomId:string)=>{
  return post('/roomList',{roomId})
}