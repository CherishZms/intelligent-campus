import React from 'react';
import { Button, ButtonProps } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useExport } from '@/hooks/useExport';
import { ExportColumn } from '@/utils/exportToExcel/exportConfig';

interface ExportButtonProps<T> extends ButtonProps {
  /** 原始数据 */
  data: T[];
  /** 列配置 */
  columns: ExportColumn<T>[];
  /** 文件名（不含后缀） */
  fileName?: string;
  /** 是否显示序号列 */
  showIndex?: boolean;
  /** 按钮文字 */
  buttonText?: string;
  /** 按钮大小 */
  size?:"large"|"small"|"medium"
}

export const ExportButton = <T extends Record<string, any>>(
  props: ExportButtonProps<T>
) => {
  const {
    data,
    columns,
    fileName = '导出数据',
    showIndex = true,
    buttonText = '导出 Excel',
    size = "large",
    ...rest
  } = props;

  const { exportToExcel, loading } = useExport(data, columns, fileName, showIndex);

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      loading={loading}
      onClick={exportToExcel}
      size={size}
      {...rest}
    >
      {buttonText}
    </Button>
  );
};

