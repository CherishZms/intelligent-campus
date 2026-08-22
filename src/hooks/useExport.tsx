// useExport 负责管理加载状态、执行导出、捕获错误并提示。

import { useState } from 'react'
import { message } from 'antd'
import * as XLSX from 'xlsx'
import { ExportColumn, transformDataForExport } from '@/utils/exportToExcel/exportConfig'


interface UseExportReturn {
  /** 导出函数，调用即开始导出 */
  exportToExcel: () => void
  /** 加载状态（true 表示正在导出） */
  loading: boolean
}


/**
 * 通用的 Excel 导出 Hook
 * @param data - 原始数据
 * @param columns - 列配置
 * @param fileName - 导出文件名（默认 '导出数据'）
 * @param showIndex - 是否显示序号（默认 true）
 */

export const useExport = <T extends Record<string, any>>(
  data: T[],
  columns: ExportColumn<T>[],
  fileName: string = "新建工作簿",
  showIndex: boolean = true
): UseExportReturn => {
  const [loading, setLoading] = useState<boolean>(false)

  const exportToExcel = () => {
    if (!data || data.length === 0) {
      message.warning('请选择导出数据')
      return
    }
    setLoading(true)

    try {

      const transformData = transformDataForExport(data, columns, showIndex)

      const worksheet = XLSX.utils.json_to_sheet(transformData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1')

      XLSX.writeFile(workbook, `${fileName}.xlsx`)

      message.success('导出成功')
    } catch (error) {
      console.error('导出失败', error)
      message.error('导出失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }
  return { exportToExcel, loading }
}