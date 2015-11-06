import { ENTER_BY, ISSUED, VALID, CONNECTIONS, PAGES } from './data/columnNames';

export function isExpired(module) {
  return hasExpiry(module) && (module[VALID] < new Date());
}

export function hasExpiry(module) {
  return module[VALID];
}

export function zipObject(names, values) {
  const obj = {};
  names.forEach((name, i) => obj[name] = values[i]);
  return obj;
}

export function parseDate(text) {
  if (text === '' || text === '0') return null;
  const arr = text.match(/.{2}/g).map(n => parseInt(n));
  return new Date(arr[0] + 2000, arr[1], arr[2]);
}

export function formatDate(date) {
  if (!date) return '';
  const shortMonth = date.toLocaleString('en-us', { month: 'short' });
  return `${shortMonth} ${date.getDate()}, ${date.getFullYear()}`;
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
  return a.toLowerCase() === b.toLowerCase();
}

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
