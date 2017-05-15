import { withName } from './shared';
import { formatDate } from 'util';
import { ENTER_BY } from 'data/columns';

export default function enterByDate(modules) {
  const annual = modules.find(withName('ANNUAL'));
  return annual
    ? formatDate(annual[ENTER_BY])
    : '- -';
}
