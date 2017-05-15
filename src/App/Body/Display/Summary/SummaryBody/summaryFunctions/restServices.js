import { withName, withFeature } from './shared';

export default function restServices(modules) {
  const server = modules.find(withName('SERVER'));
  return server && withFeature('W')(server)
    ? 'Yes'
    : 'No';
}
