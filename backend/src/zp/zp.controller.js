//calls service funcs
const getValidator = require('../utils/getValidator');
const putValidator = require('../utils/putValidator');
const wrongRequest = require('../utils/wrongRequest');
const appEmitter = require('../utils/appEmitter');

const methodMap = {
  GET: () => getValidator,
  POST: () => (console.log(`POST`), () => {}),
  PUT: () => putValidator,
};

const zpController = (req, res) => {
  const { method } = req;

  const useMethod = methodMap?.[method]?.();

  appEmitter.on('success', (code, data) => {
    res.statusCode = code;
    res.end(JSON.stringify({ success: true, payload: data }));
  });

  appEmitter.on('failure', (code, data) => {
    res.statusCode = code;
    res.end(JSON.stringify({ success: false, payload: data }));
  });

  useMethod ? useMethod(req) : wrongRequest(400, 'wrong method');
};

module.exports = zpController;
