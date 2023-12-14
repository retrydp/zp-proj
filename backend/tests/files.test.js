const fs = require('fs');
const path = require('path');

const fileMap = {
  dataFile: path.join(__dirname, '..', 'src', 'data', 'salary.v8data'),
  constants: path.join(__dirname, '..', 'src', 'utils', 'constants.js'),
};
const isFilePresent = fs.existsSync;

describe('Verifying files', () => {
  test(`Database file is present`, () => {
    expect(isFilePresent(fileMap['dataFile'])).toBeTruthy();
  });

  test(`Constants file is present`, () => {
    expect(isFilePresent(fileMap['constants'])).toBeTruthy();
  });
});
