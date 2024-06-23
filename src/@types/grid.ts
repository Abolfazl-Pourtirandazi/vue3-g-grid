export interface GridProps {
  columns: GridColumn[];
  rows: object[];
  currentPage: number;
  perPage: number;
  totalRows?: number;
  serverSide?: boolean;
  height?: number | string;
  readData?: null | ((page: number) => void);
}

export interface GridColumn {
  title: string;
  field: string;
  width?: string | number;
  columnClassName?: string;
  rowClassName?: string;
}
