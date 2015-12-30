export { moduleIsExpired, moduleHasExpiration } from './moduleHelpers';
export { isDateField, isUnlimitedField } from './columnHelpers';
export { processLicenseFile, processLicensePaste } from './licenseProcessor';

export function zipObject(names, values) {
  return names.reduce(
    (obj, name, i) => ({
      ...obj,
      [name]: values[i]
    }),
    {}
  );
}

export function member(arr, elem) {
  return arr.indexOf(elem) !== -1;
}

export function sortBy(prop) {
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
