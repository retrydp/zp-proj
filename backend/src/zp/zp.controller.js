//calls service funcs
const getValidator = require('../utils/validators/getValidator');
const postValidator = require('../utils/validators/postValidator');
const deleteValidator = require('../utils/validators/deleteValidator');
const wrongRequest = require('../utils/wrongRequest');
const appEmitter = require('../utils/helpers/appEmitter');

const methodMap = {
  GET: () => getValidator,
  POST: () => postValidator,
  DELETE: () => deleteValidator,
};

const zpController = (req, res) => {
  try {
    const { method } = req;
    const useMethod = methodMap?.[method]?.();

    appEmitter.on('success', (code, data) => {
      res.statusCode = code;
      res.end(JSON.stringify({ success: true, payload: data }));
      return;
    });

    appEmitter.on('failure', (code, data) => {
      res.statusCode = code;
      res.end(JSON.stringify({ success: false, payload: data }));
      return;
    });

    useMethod ? useMethod(req) : wrongRequest(400, 'wrong method');
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, payload: 'Server error' }));
    console.warn(error);
  }
};

module.exports = zpController;


