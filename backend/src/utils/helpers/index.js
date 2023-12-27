const isJsonString = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const dayjs = require('dayjs');

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const dateParamValidation = (param, format = 'YYYY-MM') => {
  return dayjs(param, format, true).isValid();
};

module.exports = { isJsonString, dateParamValidation };
