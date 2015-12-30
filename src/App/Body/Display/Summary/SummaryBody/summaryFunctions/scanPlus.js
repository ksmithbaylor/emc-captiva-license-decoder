import { withName, withFeature, sumOf, notExpired } from './shared';
import { CONNECTIONS } from 'data/columns';

export default function scanPlus(modules, premium) {
  const unlimited = modules.some(m => (
    withName('SCANPLUS')(m) && m[CONNECTIONS] == '0'
  ));

  return unlimited
    ? 'Unlimited'
    : sumOf(
      CONNECTIONS,
      (
        modules
        .filter(withName('SCANPLUS'))
        .filter(notExpired)
        .filter(withFeature(premium ? 'D' : 'C'))
      )
    );
}
