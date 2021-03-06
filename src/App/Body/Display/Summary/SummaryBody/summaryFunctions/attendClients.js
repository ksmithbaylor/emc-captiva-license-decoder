import { withName, sumOf, notExpired } from './shared';
import { CONNECTIONS } from 'data/columns';

export default function attendClients(modules) {
  return sumOf(CONNECTIONS, modules.filter(withName('GROUP4')).filter(notExpired));
}
