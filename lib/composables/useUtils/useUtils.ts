import moment from "moment-jalaali";

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

  return { formatDate, separateNumber, toFixed };
};

export default useUtils;
