import { ENTER_BY, ISSUED, VALID, CONNECTIONS, PAGES } from 'data/columnNames';

export { moduleIsExpired, moduleHasExpiration } from './moduleHelpers';

export function zipObject(names, values) {
  return names.reduce(
    (obj, name, i) => ({
      ...obj,
      [name]: values[i]
    }),
    {}
  );
}

export function isDateField(column) {
  return member([ENTER_BY, ISSUED, VALID], column);
}

export function isUnlimited(column) {
  return member([CONNECTIONS, PAGES, VALID], column);
}

export function member(arr, elem) {
  return arr.indexOf(elem) !== -1;
}

export function by(prop) {
  return function (a, b) {
    if (a[prop] < b[prop]) return -1;
    if (a[prop] > b[prop]) return 1;
    return 0;
  }
}

export function hasLetters(str) {
  return /[a-zA-z]/.test(str);
}

export function lowerCaseEqual(a, b) {
  return a.toLowerCase().trim() === b.toLowerCase().trim();
}

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function pipe(input, ...fs) {
  return fs.reduce(
    ((nextInput, f) => {
      let result;

      try {
        if (nextInput.error) throw new Error();
        result = f.call(null, nextInput);
      } catch (ex) {
        result = { error: true };
      }

      return result;
    }),
    input
  );
}
