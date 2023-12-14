// putValidator.js
const { addOne } = require('../zp/zp.service');
const {
  validateDataLength,
  validateJSON,
  validateDate,
  validateValues,
  validateId,
} = require('./validation');

const putValidator = (req) => {
  let body = '';

  req.on('data', (data) => {
    body += data;
    validateDataLength(body);
  });

  req.on('end', () => {
    validateJSON(body);

    const parsed = JSON.parse(body);
    const date = parsed?.date;

    validateDate(date);

    const values = parsed?.values;

    validateValues(values);

    validateId(values.id, date);

    addOne(parsed);
  });
};

module.exports = putValidator;
