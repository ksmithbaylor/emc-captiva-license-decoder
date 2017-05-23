import { withName } from './shared';
import { moduleIsExpired } from 'util';

export default function isEnterprise(modules) {
  const hasModules = ['WSINPUT', 'WSOUTPUT', 'ECOPY'].some(name =>
    modules.some(module => withName(name)(module) && !moduleIsExpired(module))
  );

  return hasModules;
}
