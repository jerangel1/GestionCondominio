import { Paginated } from "@/types/types";
import { getSkeletonTablePlaceholder } from "@/utils/getSkeletonTablePlaceholder";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  type FetchNextPageOptions,
} from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo, useCallback } from "react";

export function useInfiniteScroll<T = unknown>({
  data,
  isFetching,
  fetchNextPage,
  isLoading,
  columns,
}: {
  data?: InfiniteData<Paginated<T>>;
  isFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >;
  isLoading: boolean;
  columns: ColumnDef<T>[];
}) {
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.page) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.total ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  const tableColumns = useMemo<ColumnDef<T>[]>(
    () => (isLoading ? getSkeletonTablePlaceholder(columns) : columns),
    [columns, isLoading]
  );

  const tableData: T[] = useMemo(
    () => (isLoading ? Array(30).fill({}) : flatData ?? ([] as T[])),
    [isLoading, flatData]
  );

  return { tableColumns, tableData, fetchMoreOnBottomReached } as const;
}
