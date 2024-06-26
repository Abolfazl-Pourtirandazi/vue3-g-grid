import moment from "moment-jalaali";
import type { SortDirection, SortableItem } from "../../types/utils";

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
  const sorting = (items: SortableItem[], field: string, direction: SortDirection = "up"): void => {
    items.sort((a, b) => {
      const aData: any = a[field];
      const bData: any = b[field];

      //Sort Default
      if (!aData && !bData) {
        return 0;
      }

      //Sort String
      const sortString = () => {
        const nameA = aData.toUpperCase();
        const nameB = bData.toUpperCase();

        //Up Sort
        if (direction === "down") {
          if (nameA > nameB) {
            return -1;
          }

          if (nameA < nameB) {
            return 1;
          }
        }

        //Down Sort
        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        //Default
        return 0;
      };

      //Sort Number
      const sortNumber = () => {
        //Down Sort
        if (direction === "down") {
          return aData - bData;
        }

        //Up Sort
        return bData - aData;
      };

      if (!isNumeric(aData) && !isNumeric(bData)) {
        return sortString();
      }

      return sortNumber();
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
