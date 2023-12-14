// validation.js
const wrongRequest = require('./wrongRequest');
const dateParamValidator = require('./dateParamValidator');

const isJsonString = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const validateDataLength = (data) => {
  if (data.length > 500) {
    wrongRequest(400, 'Data length exceeds the maximum allowed limit');
  }
};

const validateJSON = (str) => {
  if (!isJsonString(str)) {
    wrongRequest(400, 'Invalid JSON received');
  }
};

const validateDate = (date) => {
  if (!dateParamValidator(date)) {
    wrongRequest(400, 'Invalid date format received');
  }
};

const validateValues = (values) => {
  const allValues = ['id', 'type', 'salary', 'comment', 'workplace'];
  const userValues = Object.keys(values);
  const missingKeys = allValues.filter((key) => !userValues.includes(key));

  if (missingKeys.length > 0) {
    wrongRequest(400, `Missing keys: ${missingKeys}`);
  }
};

const validateId = (id, date) => {
  const checkSameMonth = id.replace(/-\d+$/, '') === date;
  if (!dateParamValidator(id, 'YYYY-MM-DD') || !checkSameMonth) {
    wrongRequest(400, 'Invalid date format for Id');
  }
};

module.exports = {
  isJsonString,
  validateDataLength,
  validateJSON,
  validateDate,
  validateValues,
  validateId,
};
