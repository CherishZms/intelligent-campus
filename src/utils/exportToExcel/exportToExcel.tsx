import { message } from 'antd'
import * as XLSX from 'xlsx'

/**
 * 导出数据为 Excel 文件
 * @param data - 要导出的对象数组
 * @param filename - 下载的文件名 (不含后缀)
 */

export const exportToExcel = <T extends Record<string,any>>(
  data:T[],
  fileName:string = 'export'
)=>{
  if(!data || data.length===0){
    message.warning('请选择数据导出')
    return
  }

  //1.将数据转为worksheet（工作表）
  const worksheet = XLSX.utils.json_to_sheet(data)
  //2.创建一个新的workbook（工作簿）
  const workbook = XLSX.utils.book_new()
  //3.将worksheet添加到workbook中
  XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1')
  //4.触发浏览器下载
  XLSX.writeFile(workbook,`${fileName}.xlsx`)
}