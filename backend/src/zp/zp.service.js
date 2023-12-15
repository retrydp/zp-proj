const wrongRequest = require('../utils/wrongRequest');
const successRequest = require('../utils/successRequest');
const path = require('path');
const fs = require('fs');
const v8 = require('v8');

const getData = () => {
  const rawData = fs.readFileSync(
    path.join(__dirname, '..', 'data', 'salary.v8data')
  );
  const dateMap = v8.deserialize(rawData);
  return dateMap;
};

const storeData = (data) => {
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'salary.v8data'), data);
};

const findOne = (date) => {
  const dataMap = getData();
  const data = dataMap.get(date);

  if (!data) return wrongRequest(404, 'Date not found');

  return successRequest(data);
};

const addOne = (userData) => {
  const { date, values } = userData;
  const { id, type, comment, salary, workplace } = values;

  const dataMap = getData();
  dataMap.set(date, userData.values);
  const serialized = v8.serialize(dataMap);
  // storeData(serialized);

  return successRequest(date);
};

module.exports = { findOne, addOne };
