import { ref } from "vue";
import type { GridColumn } from "@/@types/grid";

const useGrid = () => {
  /* Element Ref */
  const gGrid = ref<HTMLElement>();

  /* Get Row Data */
  const getRowData = (row: any, column: GridColumn): string => {
    return row[column.field];
  };

  return {
    gGrid,
    getRowData
  };
};

export default useGrid;
