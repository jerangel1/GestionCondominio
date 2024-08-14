import { Skeleton } from "@/components/form/loaders/Skeleton";


type ColumnType<T> = {
  columns?: ColumnType<T>[];
} & T;


type RowType<T> = {
  index: number;
} & T;

export const getSkeletonTablePlaceholder = <T extends Record<string, unknown>>(
  columns: ColumnType<T>[]
): ColumnType<T>[] =>
  columns.map((column) => {
    if (column.columns) {
      return {
        ...column,
        columns: getSkeletonTablePlaceholder(column.columns),
      };
    }

    return {
      ...column,
      cell: ({ row }: { row: RowType<T> }) => (
        <Skeleton
          className="w-10/12 h-4 !rounded-full"
          style={{
            opacity: (100 - row.index * 5) / 100,
          }}
        />
      ),
    };
  });