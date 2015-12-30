import { withName, sumOf } from './shared';
import { PAGES } from 'data/columns';

export default function advancedRecognitionVolume(modules) {
  const classifs = modules.filter(withName('CLASSIF'));
  const extracts = modules.filter(withName('EXTRACT'));
  const classifsSum = sumOf(PAGES, classifs);
  const extractsSum = sumOf(PAGES, extracts);
  const unlimited = classifsSum === 0 || extractsSum === 0;

  return (classifs.length > 0 || extracts.length > 0) ? (
    unlimited ? 'Unlimited' : Math.max(classifsSum, extractsSum)
  ) : 0;
}
