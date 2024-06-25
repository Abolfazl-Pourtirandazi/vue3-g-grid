import moment from "moment-jalaali";

const useUtils = () => {
  /* To Fixed Number */
  const toFixed = (value: number, digits: number = 2, fallback: string = "0"): string => {
    value = Number(value);

    if (!isNumeric(value)) return fallback;

    return value.toFixed(digits);
  };

  /* Format Date */
  const formatDate = (date: string, format: string = "YYYY-MM-DD HH:mm"): string => {
    if (date) {
      return moment(date).format(format);
    }

    return moment().format(format);
  };

  /* Cehck Numeric */
  const isNumeric = (value: any): Boolean => {
    return !isNaN(value);
  };

  return { formatDate, toFixed };
};

export default useUtils;
