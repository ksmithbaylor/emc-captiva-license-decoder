import { withName } from './shared';
import { FEATURES } from 'data/columnNames';

export default function isEnterprise(modules) {
  const serverModule = modules.find(withName('SERVER'));

  const hasFeatures = /[CDEFSW]/.test(serverModule[FEATURES]);
  const hasModules = ['DPMANAGER', 'WSINPUT', 'WSOUTPUT', 'ECOPY'].some(name => (
    modules.some(withName(name))
  ));

  return hasFeatures || hasModules;
}
