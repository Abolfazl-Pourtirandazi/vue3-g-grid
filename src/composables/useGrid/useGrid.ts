import { ref } from "vue";
import type { GridColumn } from "@/@types/grid";

const useGrid = () => {
  /* Element Ref */
  const gGrid = ref<HTMLElement>();

  /* Get Row Data */
  const getRowData = (row: any, column: GridColumn): string => {
    return row[column.field];
  };

  /* Get Width Data */
  const width = (column: GridColumn): string | number => {
    if (column.width) return column.width;

    return "";
  };

  return {
    gGrid,
    getRowData,
    width
  };
};

export default useGrid;
