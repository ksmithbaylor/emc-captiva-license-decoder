import { dateFields, unlimitedFields } from 'data/columns';
import { member } from 'util';

export function isDateField(column) {
  return member(dateFields, column);
}

export function isUnlimitedField(column) {
  return member(unlimitedFields, column);
}

export function formatDate(date) {
  if (!date) return '';
  const shortMonth = date.toLocaleString('en-us', { month: 'short' });
  return `${shortMonth} ${date.getDate()}, ${date.getFullYear()}`;
}
