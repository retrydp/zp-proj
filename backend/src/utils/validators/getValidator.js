const { findOne } = require('../../zp/zp.service');
const wrongRequest = require('../wrongRequest');
const { dateParamValidation } = require('../helpers');

const getValidator = (req) => {
  const { url } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const date = parsedUrl.searchParams.get('date');

  if (!date || !dateParamValidation(date))
    return wrongRequest(400, 'Wrong date format');

  return findOne(date);
};

module.exports = getValidator;
