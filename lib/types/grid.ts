import type { Icons } from "./icon";

export interface GridProps {
  columns: GridColumn[];
  rows: object[];
  currentPage: number;
  perPage: number;
  totalRows?: number;
  pageRangeDisplayed: number;
  sortOptions: SortOptions;
  striped?: boolean;
  hover?: boolean;
  footer?: boolean;
  loading?: boolean;
  serverSide?: boolean;
  height?: number | string;
  rtl?: boolean;
  dark?: boolean;
  readData?: null | ((page: number) => void);
}

export interface SortOptions {
  multiple: boolean;
}

export type GridAggregateType = "sum" | "avg";

export type GridType = "date" | "toFixed" | "separateNumber";

export interface GridColumn {
  title: string;
  field: string;
  sortable?: boolean;
  width?: string;
  aggregate?: GridAggregateType;
  type?: GridType;
  format?: string;
  columnCell?: string;
  rowCell?: string;
  footerCell?: string;
  footer?: string | number;
  columnClassName?: string;
  rowClassName?: string;
  hide?: boolean;
}

export interface GridAggregates {
  [key: string]: number;
}

export enum SortType {
  ascending = 0,
  descending = 1
}

export interface GridSort {
  field: string;
  type: SortType;
}

export interface SortInfo {
  icon: Icons;
  priority?: number | string;
}
