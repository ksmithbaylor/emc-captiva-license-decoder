import { withName, notExpired } from './shared';

export default function productionAutoLearning(modules) {
  return modules.filter(notExpired).find(withName('DPCOLLEC'))
    ? 'Yes'
    : 'No';
}
