export type Column<T> = {
  key: keyof T;
  label: string;
};

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowSelect?: (row: T | null) => void;
}
