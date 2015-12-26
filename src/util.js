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
  if (text === '' || text === '0' || text.toLowerCase() === 'unlimited') return null;

  const [day, month, maybeYear] = [
    text.substr(text.length - 2),
    text.substr(text.length - 4, 2),
    text.substr(0, text.length - 4)
  ].map(x => parseInt(x, 10));

  const year = maybeYear >= 20 ? Math.floor(maybeYear / 10) : maybeYear;

  return new Date(year + 2000, month - 1, day);
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

export function pipe(input, ...fs) {
  return fs.reduce(
    ((nextInput, f) => f.call(null, nextInput)),
    input
  );
}
