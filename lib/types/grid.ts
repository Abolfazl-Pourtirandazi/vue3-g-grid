import type { SortDirection } from "./utils";

export interface GridProps {
  columns: GridColumn[];
  rows: object[];
  currentPage: number;
  perPage: number;
  totalRows?: number;
  pageRangeDisplayed: number;
  footer?: boolean;
  loading?: boolean;
  serverSide?: boolean;
  height?: number | string;
  rtl?: boolean;
  dark?: boolean;
  readData?: null | ((page: number) => void);
}

export type GridAggregateType = "sum" | "avg";

export type GridType = "date" | "toFixed" | "separateNumber";

export interface GridColumn {
  title: string;
  field: string;
  sortable?: boolean;
  width?: string | number;
  aggregate?: GridAggregateType;
  type?: GridType;
  format?: string;
  columnCell?: string;
  rowCell?: string;
  footerCell?: string;
  footer?: string | number;
  columnClassName?: string;
  rowClassName?: string;
}

export interface GridAggregates {
  [key: string]: number;
}

export interface GridSort {
  field: string;
  direction: SortDirection;
}

export interface ColumnSorted {
  isValid: boolean;
  icon: string;
}
