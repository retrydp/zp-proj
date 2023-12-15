// putValidator.js
const { addOne } = require('../zp/zp.service');
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

const putValidator = (req) => {
  let body = '';

  req.on('data', (data) => {
    body += data;
    if (data.length > 500) {
      return wrongRequest(400, 'Data length exceeds the maximum allowed limit');
    }
  });

  req.on('end', () => {
    if (!isJsonString(body)) {
      return wrongRequest(400, 'Invalid JSON received');
    }

    const parsed = JSON.parse(body);
    const date = parsed?.date;

    if (!dateParamValidator(date) || !date) {
      return wrongRequest(400, 'Invalid date format received');
    }

    const values = parsed?.values;

    if (!values) {
      return wrongRequest(400, 'Invalid values received');
    }

    const allValues = ['id', 'type', 'salary', 'comment', 'workplace'];
    const userValues = Object.keys(values);
    const missingKeys = allValues.filter((key) => !userValues.includes(key));

    if (missingKeys.length > 0) {
      return wrongRequest(400, `Missing keys: ${missingKeys}`);
    }

    const { id } = values;
    const checkSameMonth = id.replace(/-\d+$/, '') === date;

    if (!dateParamValidator(id, 'YYYY-MM-DD') || !checkSameMonth) {
      return wrongRequest(400, 'Invalid date format for Id');
    }

    addOne(parsed);
  });
};

module.exports = putValidator;
