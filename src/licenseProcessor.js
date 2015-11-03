import { zipObject, parseDate, formatDate, member, by, hasLetters, lowerCaseEqual } from './util';
import COLUMN_NAMES, { ENTER_BY, ISSUED, VALID, NAME, PAGES } from './data/columnNames';

export function processLicense(rawFile) {
  return {
    serverID: getServerID(rawFile),
    modules: correctlyOrdered(
      sortedByModuleName(
        convertDateFields(
          zipRowsWithColumns(
            onlyValidRows(
              linesToGrid(
                removeComments(
                  rawToLines(rawFile)
                )
              )
            )
          )
        )
      )
    )
  };
}

function getServerID(rawFile) {
  return rawToLines(rawFile)[0].split(' ').slice(-1)[0];
}

function correctlyOrdered(modules) {
  return modules.reduce(
    groupModulesReducer,
    { orderedModules: [], skipped: [] }
  ).orderedModules;
}

function groupModulesReducer(accumulator, nextModule, index, allModules) {
  const shouldSkip = member(accumulator.skipped, index) || hasLetters(nextModule[PAGES]);

  return shouldSkip ? accumulator : (
    addNextChildren(accumulator, nextModule, index, allModules)
  );
}

function addNextChildren({ orderedModules, skipped }, nextModule, index, allModules) {
  const { modules, indices } = children(nextModule, allModules, skipped);

  return {
    orderedModules: [
      ...orderedModules,
      nextModule,
      ...modules.map(indentedModule)
    ],
    skipped: [
      ...skipped,
      index,
      ...indices
    ]
  };
}

function children(nextModule, allModules, skipped) {
  return allModules
    .map((module, index) => [module, index])
    .filter(nonSkippedChildrenPairs.bind(null, nextModule, skipped))
    .reduce(
      (acc, nextPair) => ({
        modules: [ ...acc.modules, nextPair[0] ],
        indices: [ ...acc.indices, nextPair[1] ]
      }),
      { modules: [], indices: [] }
    );
}

function nonSkippedChildrenPairs(nextModule, skipped, [module, index]) {
  return !member(skipped, index) && lowerCaseEqual(module[PAGES], nextModule[NAME]);
}

function indentedModule(module) {
  return {
    ...module,
    [NAME]: '   ' + module[NAME]
  };
}

function sortedByModuleName(modules) {
  return modules.sort(by(NAME));
}

function convertDateFields(modules) {
  return modules.map(module => {
    [VALID, ENTER_BY, ISSUED].forEach(field => {
      module[field] = parseDate(module[field]);
    });

    return module;
  });
}

function zipRowsWithColumns(grid) {
  return grid.map(row => zipObject(COLUMN_NAMES, row));
}

function onlyValidRows(grid) {
  return grid.filter(row => row.length === 9);
}

function linesToGrid(lines) {
  return lines.map(line => line.split(';'));
}

function removeComments(lines) {
  return lines.filter(line => line.indexOf('\'') !== 0);
}

function rawToLines(rawFile) {
  return rawFile.split('\n');
}
