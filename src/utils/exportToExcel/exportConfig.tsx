
// 定义列的配置结构，并实现数据的转换（序号、状态映射等）

/**
 * 列配置项
 */

export interface ExportColumn<T=any> {
  /** 数据字段名（对应数据源中的 key） */
  dataIndex:keyof T,
  /** 导出 Excel 中的表头显示名称（中文） */
  title:string,
  /** 可选：自定义格式化函数，用于转换单元格值 */
  render?:(value:any,record:T)=>string | number
}

/**
 * 导出参数
 */

export interface UseExportOption<T>{
  /** 原始数据 */
  data:T[],
  /** 列配置 */
  columns:ExportColumn<T>[],
  /** 导出的文件名（不含后缀） */
  filename?:string,
   /** 是否显示序号列（默认开启） */
  showIndex?:boolean
}

/**
 * 将原始数据 + 列配置转换为 Excel 可识别的二维对象数组
 */
export const transformDataForExport = <T extends Record<string,any>>(
  data:T[] ,
  columns:ExportColumn<T>[],
  showIndex:boolean = true
):Record<string,any>[]=>{
  if(!data||data.length===0) return []
  return data.map((record,index)=>{
    const row:Record<string,any> = {}
    //添加序号列
    if(showIndex){
      row['序号'] = index+1
    }
    //按列配置生成行数据
    columns.forEach((col)=>{
      const rawValue = record[col.dataIndex]
      // 如果有 render 函数，则使用它格式化；否则直接取原值
      const dispalyValue = col.render?col.render(rawValue,record):rawValue
      row[col.title] = dispalyValue ?? ""   // 防止 undefined/null
    })
    return row
  })
}