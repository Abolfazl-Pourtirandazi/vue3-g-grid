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

export type GridAggregateType = "sum" | "avg";

export type GridType = "date" | "toFixed";

export interface GridColumn {
  title: string;
  field: string;
  width?: string | number;
  aggregate?: GridAggregateType;
  type?: GridType;
  format?: string;
  columnClassName?: string;
  rowClassName?: string;
}

export interface GridAggregates {
  [key: string]: number;
}
