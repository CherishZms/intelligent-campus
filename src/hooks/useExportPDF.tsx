import { useState } from 'react';
import { message } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ExportColumn, transformDataForExport } from '@/utils/exportToExcel/exportConfig';

interface UseExportPDFReturn {
  exportToPDF: () => Promise<void>;
  loading: boolean;
}

/**
 * 通用 PDF 导出 Hook（截图方式）
 * @param data - 原始数据
 * @param columns - 列配置（同 Excel 导出）
 * @param fileName - 导出文件名（默认 '导出数据'）
 * @param showIndex - 是否显示序号（默认 true）
 * @param title - PDF 文档标题（默认无）
 */
export const useExportPDF = <T extends Record<string, any>>(
  data: T[],
  columns: ExportColumn<T>[],
  fileName: string = '导出数据',
  showIndex: boolean = true,
  title?: string,
): UseExportPDFReturn => {
  const [loading, setLoading] = useState<boolean>(false);

  const exportToPDF = async () => {
    // 1. 校验数据
    if (!data || data.length === 0) {
      message.warning('没有数据可导出');
      return;
    }

    setLoading(true);
    try {
      // 2. 转换数据（得到带中文表头的二维对象数组）
      const transformedData = transformDataForExport(data, columns, showIndex);
      const headers = Object.keys(transformedData[0]); // 表头数组
      const rows = transformedData.map((row) => headers.map((key) => row[key]));

      // 3. 创建隐藏的 DOM 表格用于截图
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.background = '#fff';
      container.style.padding = '20px';
      container.style.fontSize = '14px';
      container.style.fontFamily = 'Arial, "Microsoft YaHei", sans-serif';
      document.body.appendChild(container);

      // 如果有标题，添加标题
      if (title) {
        const titleEl = document.createElement('h2');
        titleEl.textContent = title;
        titleEl.style.textAlign = 'center';
        titleEl.style.marginBottom = '16px';
        titleEl.style.fontSize = '20px';
        container.appendChild(titleEl);
      }

      // 构建表格
      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      table.style.border = '1px solid #ccc';

      // 表头
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        th.style.border = '1px solid #ccc';
        th.style.padding = '8px';
        th.style.backgroundColor = '#f0f0f0';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // 表体
      const tbody = document.createElement('tbody');
      rows.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cellValue) => {
          const td = document.createElement('td');
          td.textContent = String(cellValue ?? '');
          td.style.border = '1px solid #ccc';
          td.style.padding = '6px 8px';
          td.style.textAlign = 'center';
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      container.appendChild(table);

      // 4. 等待 DOM 渲染后截图
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(container, {
        scale: 2, // 提高清晰度
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // 5. 生成 PDF（A4 竖屏，横向自动适应）
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 如果内容超过一页，分页处理
      const maxPageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = pdfHeight;
      let position = 0;

      // 第一页
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= maxPageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= maxPageHeight;
      }

      // 6. 下载
      pdf.save(`${fileName}.pdf`);

      // 7. 清理 DOM
      document.body.removeChild(container);

      message.success('PDF 导出成功');
    } catch (error) {
      console.error('PDF 导出失败:', error);
      message.error('导出失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return { exportToPDF, loading };
};