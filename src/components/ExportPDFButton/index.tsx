import React from 'react';
import { Button, ButtonProps } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import { useExportPDF } from '@/hooks/useExportPDF';
import { ExportColumn } from '@/utils/exportToExcel/exportConfig';

interface ExportPDFButtonProps<T> extends ButtonProps {
  data: T[];
  columns: ExportColumn<T>[];
  fileName?: string;
  showIndex?: boolean;
  title?: string;
  buttonText?: string;
  size?:'large'|'medium'|'small'
}

export const ExportPDFButton = <T extends Record<string, any>>(
  props: ExportPDFButtonProps<T>
) => {
  const {
    data,
    columns,
    fileName = '导出数据',
    showIndex = true,
    title,
    buttonText = '导出 PDF',
    size = 'large',
    ...rest
  } = props;

  const { exportToPDF, loading } = useExportPDF(
    data,
    columns,
    fileName,
    showIndex,
    title
  );

  return (
    <Button
      type="primary"
      icon={<FilePdfOutlined />}
      loading={loading}
      onClick={exportToPDF}
      size={size}
      {...rest}
    >
      {buttonText}
    </Button>
  );
};