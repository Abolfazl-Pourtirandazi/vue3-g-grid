import moment from "moment-jalaali";
import { SortType } from "../../types/grid";
import type { GridSort } from "../../types/grid";

const useUtils = () => {
  /* To Fixed Number */
  const toFixed = (value: number, digits: number = 2, fallback: string = "0"): string => {
    value = Number(value);

    if (!isNumeric(value)) return fallback;

    return value.toFixed(digits);
  };

  /* Separate Number */
  const separateNumber = (value: string, separator: string = ",", fallback: string = ""): string => {
    if (value) {
      value = toEnDigit(value.toString());

      return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + separator);
    } else {
      return fallback;
    }
  };

  /* Format Date */
  const formatDate = (date: string, format: string = "YYYY-MM-DD HH:mm"): string => {
    if (date) {
      return moment(date).format(format);
    }

    return moment().format(format);
  };

  /* Sort */
  const sorting = (sort: GridSort[], items: object[]): void => {
    if (!items.length) return;

    const sortField = (sort: GridSort, a: any, b: any): number => {
      const aData = a[sort.field];
      const bData = b[sort.field];

      if (!isNumeric(aData) && !isNumeric(bData)) {
        return compareAlphanumeric(aData as string, bData as string);
      }

      return compareNumeric(aData as number, bData as number);
    };

    const compareAlphanumeric = (a: string, b: string): number => {
      if (a === b) {
        return 0;
      }

      if (a < b) {
        return -1;
      }

      return 1;
    };

    const compareNumeric = (a: number, b: number) => {
      return a - b;
    };

    items.sort((a: any, b: any): number => {
      for (const _sortItem of sort) {
        const compare = sortField(_sortItem, a, b);

        if (compare !== 0) {
          return _sortItem.type === SortType.descending ? compare * -1 : compare;
        }
      }

      return 0;
    });
  };

  /* To En Digit */
  const toEnDigit = (value: string): string => {
    return value.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (match): string => {
      return String(match.charCodeAt(0) & 0xf);
    });
  };

  /* Cehck Numeric */
  const isNumeric = (value: any): Boolean => {
    return !isNaN(value);
  };

  return { sorting, formatDate, separateNumber, toFixed };
};

export default useUtils;
