import { TableProps,PaginationProps } from "antd";
import { ColumnType } from "antd/es/table";

export interface BaseColumnType<T> extends ColumnType<T> {
  // 可在此扩展自定义属性，比如是否可筛选、排序等
  // 但排序/筛选直接用 Ant Design 原生配置即可
}

export interface BaseTableProps<T> extends Omit<TableProps<T>,'columns' |'pagination'> {
  /** 数据源 */
  dataSource:T[],
  /** 业务列配置（不包含序号列和操作列） */
  columns:BaseColumnType<T>[]
  /** 每行数据的唯一键 */
  rowKey: keyof T | string;
   /** 是否显示序号列，默认 true */
  showIndex?: boolean;
  /** 序号列的标题，默认 '序号' */
  indexTitle?: string;
   /** 序号列宽度，默认 80 */
  indexWidth?: number;
  /** 业务列默认宽度，默认 120 */
  defaultColumnWidth?: number;
  /** 列对齐方式，默认 'center' */
  align?: 'left' | 'center' | 'right';
   /** 操作列渲染函数，不传则不显示操作列 */
  renderActions?: (record: T, index: number) => React.ReactNode;
  /** 操作列标题，默认 '操作' */
  actionsTitle?: string;
  /** 操作列宽度，默认 150 */
  actionsWidth?: number;
  /** 分页配置，设为 false 则禁用分页 */
  pagination?: PaginationProps | false;
   /** 加载状态 */
  loading?: boolean;
  /** 空状态展示内容 */
  emptyText?: React.ReactNode;
}

/**
 * useTable Hook 返回类型
 */
export interface UseTableReturn<T>{
   /** 当前数据列表 */
  data: T[];
   /** 加载状态 */
  loading: boolean;
  /** 分页参数 */
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
   /** 排序参数 */
  sort: {
    field?: string;
    order?: 'ascend' | 'descend';
  };
  /** 筛选参数 */
  filters: Record<string, any>;
  /** 设置数据 */
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  /** 设置加载状态 */
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  /** 设置分页 */
  setPagination: React.Dispatch<React.SetStateAction<UseTableReturn<T>['pagination']>>;
   /** 设置排序 */
  setSort: React.Dispatch<React.SetStateAction<UseTableReturn<T>['sort']>>;
  /** 设置筛选 */
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  /** 处理表格变化（分页、排序、筛选） */
  handleTableChange: (pagination: any, filters: any, sorter: any) => void;
  /** 重置所有状态 */
  reset: () => void;
}