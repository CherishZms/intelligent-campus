// 状态管理 Hook
import { useState, useCallback } from 'react';
import { UseTableReturn } from './types';

interface UseTableOptions<T> {
  /** 初始数据 */
  initialData?: T[];
  /** 初始分页 */
  initialPagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
  };
  /** 是否自动加载 */
  autoLoad?: boolean;
}

/**
 * 表格状态管理 Hook
 * 用于统一管理分页、排序、筛选、加载状态
 */
export function useTable<T = any>(
  options: UseTableOptions<T> = {}
): UseTableReturn<T> {
  const {
    initialData = [],
    initialPagination = { current: 1, pageSize: 10, total: 0 },
  } = options;

  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    current: initialPagination.current || 1,
    pageSize: initialPagination.pageSize || 10,
    total: initialPagination.total || 0,
  });
  const [sort, setSort] = useState<{ field?: string; order?: 'ascend' | 'descend' }>(
    {}
  );
  const [filters, setFilters] = useState<Record<string, any>>({});

  // 处理表格变化（分页、排序、筛选）
  const handleTableChange = useCallback(
    (paginationState: any, filtersState: any, sorterState: any) => {
      // 更新分页
      setPagination((prev) => ({
        ...prev,
        current: paginationState.current || 1,
        pageSize: paginationState.pageSize || 10,
      }));

      // 更新筛选
      setFilters(filtersState);

      // 更新排序（处理多列排序情况）
      if (Array.isArray(sorterState)) {
        // 多列排序，取第一个
        const firstSorter = sorterState[0];
        setSort({
          field: firstSorter?.field || firstSorter?.columnKey,
          order: firstSorter?.order,
        });
      } else {
        setSort({
          field: sorterState?.field || sorterState?.columnKey,
          order: sorterState?.order,
        });
      }
    },
    []
  );

  // 重置所有状态
  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setPagination({
      current: initialPagination.current || 1,
      pageSize: initialPagination.pageSize || 10,
      total: initialPagination.total || 0,
    });
    setSort({});
    setFilters({});
  }, [initialData, initialPagination]);

  return {
    data,
    loading,
    pagination,
    sort,
    filters,
    setData,
    setLoading,
    setPagination,
    setSort,
    setFilters,
    handleTableChange,
    reset,
  };
}

export default useTable;