import { computed, onUnmounted, ref, toRaw, watch } from "vue";
import useUtils from "../useUtils";
import type { SortDirection } from "../../types/utils";
import type {
  GridProps,
  GridColumn,
  GridAggregates,
  GridAggregateType,
  GridSort,
  ColumnSorted
} from "../../types/grid";

const useGrid = (
  props: GridProps = {
    columns: [],
    rows: [],
    currentPage: 1,
    perPage: 10,
    pageRangeDisplayed: 4,
    footer: false,
    loading: false,
    serverSide: false
  }
) => {
  const { sorting, formatDate, separateNumber, toFixed } = useUtils();

  const sort = ref<string>("");

  /* Element Ref */
  const gGrid = ref<HTMLElement>();

  /* Current Page */
  const currentPage = ref<number>(props.currentPage);

  /* Total Pages */
  const totalPages = computed((): number => Math.ceil(getTotalRows.value / props.perPage));

  /* Watch For Change Current Page */
  watch(
    () => props.currentPage,
    (value: number) => {
      currentPage.value = value;
    }
  );

  /* Total Rows */
  const getTotalRows = computed((): number => {
    //For Server Side
    if (props.serverSide && props.totalRows) {
      return props.totalRows;
    }

    //For Client Side
    return props.rows.length;
  });

  /* Start Index */
  const startIndex = computed((): number => (currentPage.value - 1) * props.perPage);

  /* End Index */
  const endIndex = computed((): number => {
    const value: number = startIndex.value + props.perPage;

    if (value > getTotalRows.value) {
      return getTotalRows.value;
    }

    return value;
  });

  /* Get Columns */
  const getColumns = computed(() => props.columns);

  /* Get Rows */
  const getRows = computed((): object[] => {
    const value: object[] = [...toRaw(props.rows)];

    //Sorting
    if (sort.value) {
      const { field: sortField, direction } = getSort.value;

      //Sorting Value
      sorting(value, sortField, direction);
    }

    //For Server Side
    if (props.serverSide) return value;

    //For Client Side
    return value.slice(startIndex.value, endIndex.value);
  });

  /* Has Next Page */
  const hasNextPage = computed((): boolean => endIndex.value < getTotalRows.value);

  /* Has Previous Page */
  const hasPreviousPage = computed((): boolean => startIndex.value > 0);

  /* Get Aggregates */
  const getAggregates = computed((): GridAggregates => {
    const result: GridAggregates = {};

    props.columns.forEach((column: GridColumn) => {
      if (column.aggregate) {
        const key: string = column.field;
        const type: GridAggregateType = column.aggregate;

        getRows.value.forEach((item: any) => {
          if (!result[key]) {
            result[key] = 0;
          }

          result[key] += Number(item[key]);
        });

        if (type === "avg") {
          result[key] = Number(result[key] / getRows.value.length);
        }

        if (result[key] % 1 != 0) {
          result[key] = Number(toFixed(result[key], 2));
        }
      }
    });

    return result;
  });

  /* Get Sort */
  const getSort = computed((): GridSort => {
    const [field, direction] = sort.value.split(",");

    return {
      field: field,
      direction: direction as SortDirection
    };
  });

  /* Pages To Display  */
  const pagesToDisplay = computed((): number[] => {
    const maxPages = Math.min(totalPages.value, props.pageRangeDisplayed);

    const halfMaxPages = Math.floor(maxPages / 2);
    const start = Math.max(1, Math.min(currentPage.value - halfMaxPages, totalPages.value - maxPages + 1));

    return Array.from({ length: maxPages }, (_, i) => start + i);
  });

  /* Get Row Value */
  const getRowValue = (row: any, column: GridColumn): string => {
    let value = row[column.field];

    //For Nested Object
    if (column.field.includes(".")) {
      const parts = column.field.split(".");

      let currentObject = row;

      for (const part of parts) {
        if (currentObject) {
          currentObject = currentObject[part] || "";
        }
      }

      value = currentObject;
    }

    //For Type Date
    if (column.type === "date") {
      return formatDate(value, column.format);
    }

    //For Type toFixed
    if (column.type === "toFixed") {
      return toFixed(value, Number(column.format) || 2);
    }

    //For Type separateNumber
    if (column.type === "separateNumber") {
      return separateNumber(value, column.format);
    }

    return value || "-";
  };

  /* Next Page */
  const nextPage = (): void => {
    if (!hasNextPage.value) return;

    handleChangePage(currentPage.value + 1);
  };

  /* Previous Page */
  const previousPage = (): void => {
    if (!hasPreviousPage.value) return;

    handleChangePage(currentPage.value - 1);
  };

  /* First Page */
  const firstPage = () => {
    handleChangePage(1);
  };

  /* Last Page */
  const lastPage = () => {
    handleChangePage(totalPages.value);
  };

  /* Change Page Number */
  const handleChangePage = (page: number): void => {
    if (!hasNextPage.value && !hasPreviousPage.value) return;

    if (page === currentPage.value && props.loading) return;

    //For Server Side
    if (props.serverSide && props.readData) {
      props.readData(page);
    }

    currentPage.value = page;
  };

  /* Has Column Sorted */
  const hasColumnSorted = (column: GridColumn): ColumnSorted => {
    const result: ColumnSorted = { isValid: false, icon: "" };

    const { field: sortField, direction } = getSort.value;

    if (column.sortable && sortField === column.field) {
      result.isValid = true;

      if (direction === "up") {
        result.icon = "mdi mdi-arrow-up-thin";
      }

      if (direction === "down") {
        result.icon = "mdi mdi-arrow-down-thin";
      }
    }

    return result;
  };

  /* Sort Data */
  const handleSortData = (column: GridColumn): void => {
    const { field: sortField, direction } = getSort.value;

    if (column.sortable) {
      if (sortField === column.field && direction === "down") {
        sort.value = "";
      } else if (sortField === column.field && direction === "up") {
        sort.value = column.field + ",down";
      } else {
        sort.value = column.field + ",up";
      }
    }
  };

  /* Get Width Data */
  const width = (column: GridColumn): string | number => {
    if (column.width) return column.width;

    return "";
  };

  onUnmounted(() => {
    sort.value = "";

    currentPage.value = props.currentPage;
  });

  return {
    gGrid,
    currentPage,
    totalPages,
    getTotalRows,
    startIndex,
    endIndex,
    getColumns,
    getRows,
    hasNextPage,
    hasPreviousPage,
    getAggregates,
    pagesToDisplay,
    getRowValue,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    handleChangePage,
    hasColumnSorted,
    handleSortData,
    width
  };
};

export default useGrid;
