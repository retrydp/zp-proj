const regexp = require('../src/utils/dateParamValidator');

describe('Regexp test', () => {
  test(`Valid date YYYY-MM-DD`, () => {
    expect(regexp('2023-10-13', 'YYYY-MM-DD')).toBeTruthy();
  });

  test(`Valid date 2023-10  YYYY-MM`, () => {
    expect(regexp('2023-10', 'YYYY-MM')).toBeTruthy();
  });

  test(`February 31 2000`, () => {
    expect(regexp('2000-02-31', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`Random input dsa1`, () => {
    expect(regexp('dsa1', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`Bad year -100-12-12`, () => {
    expect(regexp('-100-12-12', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`Bad day 2000-12-335`, () => {
    expect(regexp('2000-12-335', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`Bad month 2000-335-01`, () => {
    expect(regexp('2000-335-01', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`One symbol day 2000-12-1`, () => {
    expect(regexp('2000-12-1', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`One symbol month 2000-1-12`, () => {
    expect(regexp('2000-1-12', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`February 29 2000`, () => {
    expect(regexp('2000-02-29', 'YYYY-MM-DD')).toBeTruthy();
  });

  test(`February 29 2001`, () => {
    expect(regexp('2001-02-29', 'YYYY-MM-DD')).toBeFalsy();
  });

  test(`Additional text 2000-11-11dsa`, () => {
    expect(regexp('2000-11-11dsa', 'YYYY-MM-DD')).toBeFalsy();
  });
});
