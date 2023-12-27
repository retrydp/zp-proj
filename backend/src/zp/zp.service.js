const wrongRequest = require('../utils/wrongRequest');
const successRequest = require('../utils/successRequest');
const path = require('path');
const fs = require('fs');
const v8 = require('v8');

const dbPath = path.join(__dirname, '..', 'data', 'salary.v8data');

const getData = () => {
  const rawData = fs.readFileSync(dbPath);
  const dateMap = v8.deserialize(rawData);
  return dateMap;
};

const storeData = (data) => {
  const serialized = v8.serialize(data);
  fs.writeFileSync(dbPath, serialized);
};

const findOne = (date) => {
  const dataMap = getData();
  const data = dataMap.get(date);

  if (!data) return wrongRequest(404, 'Date not found');

  return successRequest(data);
};

const addOne = (userData) => {
  const { date, values } = userData;
  const { id } = values;
  const dataMap = getData();
  const dateArray = dataMap.get(date);

  if (!Array.isArray(dateArray)) {
    dataMap.set(date, [values]);
    storeData(dataMap);
    return successRequest(values);
  }

  const dayObj = dateArray.find((day) => day.id === id);

  if (!dayObj) {
    dateArray.push(values);
    dataMap.set(date, dateArray);
  } else {
    const updatedDateArray = dateArray.map((el) =>
      el.id === id ? values : el
    );
    dataMap.set(date, updatedDateArray);
  }

  storeData(dataMap);

  return successRequest(values);
};

const deleteOne = (userData) => {
  const { date, id } = userData;
  const dataMap = getData();
  const dateArray = dataMap.get(date);

  if (!dateArray) {
    return wrongRequest(404, 'No such date in the database.');
  }

  const dayObj = dateArray.find((day) => day.id === id);

  if (!dayObj) {
    return wrongRequest(404, 'No such date in the database.');
  }

  const updatedDateArray = dateArray.filter((el) => el.id !== id);

  dataMap.set(date, updatedDateArray);
  storeData(dataMap);

  return successRequest(`${id} successfully deleted.`);
};

module.exports = { findOne, addOne, deleteOne };
