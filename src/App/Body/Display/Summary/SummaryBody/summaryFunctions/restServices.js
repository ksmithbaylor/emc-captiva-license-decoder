import { withName, withFeature } from './shared';
import { moduleIsExpired } from 'util';

export default function restServices(modules) {
  const server = modules.find(withName('SERVER'));
  return server && withFeature('W')(server) && !moduleIsExpired(server)
    ? 'Yes'
    : 'No';
}
