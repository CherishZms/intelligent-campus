import dayjs from "dayjs";

export const dayToYYMMDDHHmmss = (time:string)=>{
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
}

export const dayToYYMMDD = (time:string)=>{
  return dayjs(time).format("YYYY-MM-DD")
}

//把秒数转化成 几时几分
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`;
  }
  return `${minutes}分钟`;
}