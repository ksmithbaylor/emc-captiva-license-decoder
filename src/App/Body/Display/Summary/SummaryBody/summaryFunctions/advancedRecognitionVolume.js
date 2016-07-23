import { withName, sumOf, notExpired } from './shared';
import { PAGES } from 'data/columns';

function advancedRecognition(moduleName) {
  return function (modules) {
    const modulesToUse = modules
      .filter(withName(moduleName))
      .filter(notExpired);
    const pagesSum = sumOf(PAGES, modulesToUse);
    const unlimited = pagesSum === 0

    return modulesToUse.length > 0
      ? (unlimited ? 'Unlimited' : pagesSum)
      : 0;
  }
}

export const classificationAR = advancedRecognition('CLASSIF');
export const extractionAR = advancedRecognition('EXTRACT');
