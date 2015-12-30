import { ENTER_BY, ISSUED, VALID, CONNECTIONS, PAGES } from 'data/columnNames';
import { member } from 'util';

export function isDateField(column) {
  return member([ENTER_BY, ISSUED, VALID], column);
}

export function isUnlimitedField(column) {
  return member([CONNECTIONS, PAGES, VALID], column);
}
