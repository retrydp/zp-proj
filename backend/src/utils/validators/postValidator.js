// postValidator.js
const { addOne } = require('../../zp/zp.service');
const wrongRequest = require('../wrongRequest');
const { dateParamValidation, isJsonString } = require('../helpers');

const postValidator = (req) => {
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

    if (!dateParamValidation(date) || !date) {
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

    if (!dateParamValidation(id, 'YYYY-MM-DD') || !checkSameMonth) {
      return wrongRequest(400, 'Invalid date format for Id');
    }

    addOne(parsed);
  });
};

module.exports = postValidator;
