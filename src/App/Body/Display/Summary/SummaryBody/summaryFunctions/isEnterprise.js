import { withName } from './shared';

export default function isEnterprise(modules) {
  const hasModules = ['WSINPUT', 'WSOUTPUT', 'ECOPY'].some(name => (
    modules.some(withName(name))
  ));

  return hasModules;
}
