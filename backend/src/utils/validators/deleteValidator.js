const { deleteOne } = require('../../zp/zp.service');
const { isJsonString, dateParamValidation } = require('../helpers');
const wrongRequest = require('../wrongRequest');

const deleteValidator = (req) => {
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

    const id = parsed?.id;

    if (!id || !dateParamValidation(id, 'YYYY-MM-DD')) {
      return wrongRequest(400, 'Invalid day format');
    }

    deleteOne(parsed);
  });
};

module.exports = deleteValidator;
