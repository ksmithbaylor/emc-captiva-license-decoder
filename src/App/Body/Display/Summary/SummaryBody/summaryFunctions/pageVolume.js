import { withName, sumOf } from './shared';
import { PAGES } from 'data/columnNames';

export default function pageVolume(modules) {
  const annuals = modules.filter(withName('ANNUAL'));

  return annuals.some(a => a[PAGES] == '0')
    ? 'Unlimited'
    : sumOf(PAGES, annuals);
}
