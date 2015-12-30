import { withName, sumOf } from './shared';
import { CONNECTIONS } from 'data/columnNames';

export default function attendClients(modules) {
  return sumOf(CONNECTIONS, modules.filter(withName('GROUP4')));
}
