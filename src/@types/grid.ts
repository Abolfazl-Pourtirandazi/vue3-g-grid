export interface GridProps {
  columns: GridColumn[];
  rows: object[];
}

export interface GridColumn {
  title: string;
  field: string;
}
