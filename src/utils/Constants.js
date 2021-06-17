import moment from "moment";

export const convertDatetoReportFormat = (dateObject) => {
  const formattedDate = {
    day: dateObject.getDate(),
    month: `0${dateObject.getMonth() + 1}`,
    year: dateObject.getFullYear(),
  };
  return formattedDate;
};

export const mapChangesToState = (state, value, setState) => {
  setState({ ...state, ...value });
};

export const isString = (string) => Object.prototype.toString.call(string);

export const capitalizeFirstLetter = (string) => {
  return (
    string &&
    isString(string) &&
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  );
};

export const converDatatoDropDownData = (data, label, value) => {
  return (
    data &&
    data.map((item) => ({ ...item, label: item[label], value: item[value] }))
  );
};

export const getOnlyLabelValuePair = (data) => {
  return data && data.map((item) => ({ label: item.label, value: item.value }));
};

export const isValueEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (value.hasOwnProperty("length") && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
};
export const returnBlankIfEmpty = (value) => {
  return isValueEmpty(value) ? "-" : value;
};

export const truncateText = (string, maxLength) => {
  return string.length > maxLength
    ? string.substring(-1, maxLength) + "..."
    : string;
};

export const getDateAndTime = (timestamp) => {
  return moment(timestamp).format("DD/MM/YYYY, hh:mm A");
};