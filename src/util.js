import { ENTER_BY, ISSUED, VALID } from './data/columnNames';

export function isExpired(row) {
  return hasExpiry(row) && (row[VALID] < new Date());
}

export function hasExpiry(row) {
  return row[VALID];
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
  if (date === null) return '';
  const shortMonth = date.toLocaleString('en-us', { month: 'short' });
  return `${shortMonth} ${date.getDate()}, ${date.getFullYear()}`;
}

export function isDateField(column) {
  return [ENTER_BY, ISSUED, VALID].indexOf(column) !== -1;
}
