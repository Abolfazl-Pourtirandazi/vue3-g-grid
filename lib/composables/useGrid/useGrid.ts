import { computed, onUnmounted, ref, toRaw, watch } from "vue";
import useUtils from "../useUtils";
import type { GridProps, GridColumn, GridAggregates, GridAggregateType } from "../../types/grid";

const useGrid = (
  props: GridProps = {
    columns: [],
    rows: [],
    currentPage: 1,
    perPage: 10,
    footer: false,
    loading: false,
    serverSide: false
  }
) => {
  const { formatDate, separateNumber, toFixed } = useUtils();

  const maxPaginate: number = 8;

  const startPaginate = ref<number>(0);
  const endPaginate = ref<number>(maxPaginate);

  /* Element Ref */
  const gGrid = ref<HTMLElement>();

  /* Current Page */
  const currentPage = ref<number>(props.currentPage);

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

  /* Get Item Extend row data */
  const getItems = computed((): object[] => {
    const value: object[] = [...toRaw(props.rows)];

    //For Server Side
    if (props.serverSide) return value;

    //For Client Side
    return value.slice(startIndex.value, endIndex.value);
  });

  /* Has Next Page */
  const hasNextPage = computed((): boolean => endIndex.value < getTotalRows.value);

  /* Has Previous Page */
  const hasPreviousPage = computed((): boolean => startIndex.value > 0);

  /* Pagination Number */
  const totalPages = computed((): number => Math.ceil(getTotalRows.value / props.perPage));

  /* Get Aggregates */
  const getAggregates = computed((): GridAggregates => {
    const result: GridAggregates = {};

    props.columns.forEach((column: GridColumn) => {
      if (column.aggregate) {
        const key: string = column.field;
        const type: GridAggregateType = column.aggregate;

        getItems.value.forEach((item: any) => {
          if (!result[key]) {
            result[key] = 0;
          }

          result[key] += Number(item[key]);
        });

        if (type === "avg") {
          result[key] = Number(result[key] / getItems.value.length);
        }

        if (result[key] % 1 != 0) {
          result[key] = Number(toFixed(result[key], 2));
        }
      }
    });

    return result;
  });

  /* Paginate */
  const paginate = computed((): number[] => {
    const array: number[] = Object.keys(Array(totalPages.value).fill(null)).map(Number);

    if (!array.length) return array;

    if (array.length + 1 < endPaginate.value) {
      endPaginate.value = array.length;
    } else {
      const start: number = startPaginate.value;
      const end: number = endPaginate.value;

      if (currentPage.value === 1) {
        startPaginate.value = 0;
        endPaginate.value = totalPages.value <= maxPaginate ? totalPages.value : maxPaginate;
      } else if (currentPage.value === totalPages.value) {
        startPaginate.value = totalPages.value - maxPaginate;
        endPaginate.value = totalPages.value;
      } else {
        if (currentPage.value <= start + 1 && end > maxPaginate) {
          startPaginate.value = start + 2 - maxPaginate / 2;
          endPaginate.value = start + 2;
        } else if (currentPage.value > end - 1) {
          startPaginate.value = end - 2;
          endPaginate.value = end + maxPaginate - 2;
        }
      }
    }

    return array.slice(startPaginate.value, endPaginate.value);
  });

  /* Get Row Data */
  const getRowData = (row: any, column: GridColumn): string => {
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

  /* Get Width Data */
  const width = (column: GridColumn): string | number => {
    if (column.width) return column.width;

    return "";
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

  onUnmounted(() => {
    currentPage.value = props.currentPage;
  });

  return {
    gGrid,
    currentPage,
    totalPages,
    getItems,
    hasNextPage,
    getAggregates,
    hasPreviousPage,
    startIndex,
    endIndex,
    getTotalRows,
    paginate,
    getRowData,
    width,
    nextPage,
    previousPage,
    handleChangePage
  };
};

export default useGrid;
