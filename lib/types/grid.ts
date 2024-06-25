export interface GridProps {
  columns: GridColumn[];
  rows: object[];
  currentPage: number;
  perPage: number;
  totalRows?: number;
  footer?: boolean;
  loading?: boolean;
  serverSide?: boolean;
  height?: number | string;
  readData?: null | ((page: number) => void);
}

export type GridType = "date";

export interface GridColumn {
  title: string;
  field: string;
  width?: string | number;
  type?: GridType;
  format?: string;
  columnClassName?: string;
  rowClassName?: string;
}
