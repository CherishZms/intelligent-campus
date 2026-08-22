import React, { useMemo } from 'react';
import { Table, ConfigProvider, Empty } from 'antd';
import type { TableProps } from 'antd';
import { BaseTableProps, BaseColumnType } from './types';
import styles from './index.module.scss';

function BaseTable<T extends Record<string, any>>(props: BaseTableProps<T>){
  const {
    dataSource = [],
    columns = [],
    rowKey,
    showIndex = true,
    indexTitle = '序号',
    indexWidth = 80,
    defaultColumnWidth = 120,
    align = 'center',
    renderActions,
    actionsTitle = '操作',
    actionsWidth = 150,
    pagination,
    loading = false,
    emptyText = '暂无数据',
    className,
    ...restProps
  } = props

   // 1. 构建最终列配置
  const finalColumns = useMemo(()=>{
    const result: TableProps<T>['columns'] = [];
    // ---- 序号列 ----
    if (showIndex) {
      result.push({
        title: indexTitle,
        key: 'index',
        width: indexWidth,
        align: 'center',
        fixed: 'left' as const,
        render: (_: any, __: T, index: number) => index + 1,
      });
    }

    // ---- 业务列 ----
    const businessColumns = columns.map((col) => {
      // 如果列没有指定宽度，使用默认宽度
      const finalCol: BaseColumnType<T> = {
        ...col,
        width: col.width ?? defaultColumnWidth,
        align: col.align ?? align,
      };
      return finalCol;
    });
    result.push(...businessColumns);

    // ---- 操作列 ----
    if (renderActions) {
      result.push({
        title: actionsTitle,
        key: 'actions',
        width: actionsWidth,
        align: 'center',
        fixed: 'right' as const,
        render: (_: any, record: T, index: number) => renderActions(record, index),
      });
    }
    return result
  },[
    showIndex,
    indexTitle,
    indexWidth,
    columns,
    defaultColumnWidth,
    align,
    renderActions,
    actionsTitle,
    actionsWidth,
  ])

   // 2. 分页配置
  const finalPagination = useMemo(() => {
    if (pagination === false) return false;
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100'],
      defaultPageSize: 10,
      ...pagination,
    };
  }, [pagination]);

  // 3. 空状态
  const renderEmpty = () => <Empty description={emptyText} />

   return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <div className={styles.baseTableWrapper}>
        <Table<T>
          className={styles.baseTable}
          dataSource={dataSource}
          columns={finalColumns}
          rowKey={rowKey as string}
          loading={loading}
          pagination={finalPagination}
          bordered
          size="middle"
          scroll={{ x: 'max-content' }}
          {...restProps}
        />
      </div>
    </ConfigProvider>
  );
}

export default BaseTable;
export type { BaseTableProps, BaseColumnType };