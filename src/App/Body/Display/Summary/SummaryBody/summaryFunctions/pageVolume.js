import { withName, sumOf, notExpired } from './shared';
import { PAGES } from 'data/columns';

export default function pageVolume(modules) {
  const annuals = modules
    .filter(withName('ANNUAL'))
    .filter(notExpired);

  return annuals.some(a => a[PAGES] === '0')
    ? 'Unlimited'
    : sumOf(PAGES, annuals);
}
