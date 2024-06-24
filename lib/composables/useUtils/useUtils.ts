import moment from "moment-jalaali";

const useUtils = () => {
  /* Format Date */
  const formatDate = (date: string, format: string = "YYYY-MM-DD HH:mm"): string => {
    if (date) {
      return moment(date).format(format);
    }

    return moment().format(format);
  };

  return { formatDate };
};

export default useUtils;
