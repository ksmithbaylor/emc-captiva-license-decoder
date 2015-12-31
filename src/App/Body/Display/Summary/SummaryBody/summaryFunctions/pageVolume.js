import { withName, sumOf } from './shared';
import { PAGES } from 'data/columns';

export default function pageVolume(modules) {
  const annuals = modules.filter(withName('ANNUAL'));

  return annuals.some(a => a[PAGES] === '0')
    ? 'Unlimited'
    : sumOf(PAGES, annuals);
}
