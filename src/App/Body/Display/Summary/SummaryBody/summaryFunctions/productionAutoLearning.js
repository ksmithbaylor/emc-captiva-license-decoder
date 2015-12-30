import { withName } from './shared';

export default function productionAutoLearning(modules) {
  return modules.find(withName('DPCOLLEC')) ? 'Yes' : 'No';
}
