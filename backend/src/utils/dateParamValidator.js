const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

const dateParamValidation = (param, format = 'YYYY-MM') => {
  return dayjs(param, format, true).isValid();
};

module.exports = dateParamValidation;
