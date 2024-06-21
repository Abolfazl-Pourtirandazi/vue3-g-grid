export interface GridProps {
  columns: GridColumn[];
  rows: object[];
  currentPage: number;
  perPage: number;
  totalRows?: number;
}

export interface GridColumn {
  title: string;
  field: string;
  width?: string | number;
  columnClassName?: string;
  rowClassName?: string;
}
