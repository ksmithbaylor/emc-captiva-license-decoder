import { zipObject, parseDate, formatDate, member, by, hasLetters, lowerCaseEqual } from './util';
import COLUMN_NAMES, { ENTER_BY, ISSUED, VALID, NAME, PAGES } from './data/columnNames';

export function processLicense(rawFile) {
  return {
    serverID: getServerID(rawFile),
    modules: correctlyOrdered(
      sortedByModuleName(
        dateFieldsConverted(
          rowsZippedWithColumns(
            onlyValidRows(
              linesToGrid(
                commentsRemoved(
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

function groupModulesReducer({ orderedModules, skipped }, nextModule, index, allModules) {
  const pairs = allModules.map((module, index) => [module, index]);
  const nonSkipped = pairs.filter(([module, index]) => !member(skipped, index));

  // Parent: First module with a numeric PAGES column
  const [parentModule, parentIndex] = nonSkipped.find(([module, index]) => !hasLetters(module[PAGES])) || [undefined, undefined];

  // Siblings: All modules with the same name as the parent
  const siblings = parentModule !== undefined ? nonSkipped.filter(([module, index]) => (
    index !== parentIndex
    && lowerCaseEqual(module[NAME], parentModule[NAME])
    && !hasLetters(module[PAGES])
  )) : [];

  // Children: All modules with a PAGES column identical to the parent's NAME
  const children = parentModule !== undefined ? nonSkipped.filter(([module, index]) => (
    index !== parentIndex && lowerCaseEqual(module[PAGES], parentModule[NAME])
  )) : [];

  return {
    orderedModules: [
      ...orderedModules,
      ...(parentModule !== undefined ? [parentModule] : []),
      ...siblings.map(([module, index]) => module),
      ...children.map(([module, index]) => indentedModule(module))
    ],
    skipped: [
      ...skipped,
      ...(parentIndex !== undefined ? [parentIndex] : []),
      ...siblings.map(([module, index]) => index),
      ...children.map(([module, index]) => index)
    ]
  };
}

function indentedModule(module) {
  return {
    ...module,
    [NAME]: `    ${module[NAME]}`
  };
}

function sortedByModuleName(modules) {
  return modules.sort(by(NAME));
}

function dateFieldsConverted(modules) {
  return modules.map(module => ({
    ...module,
    ...[VALID, ENTER_BY, ISSUED].reduce(
      (obj, field) => ({
        ...obj,
        [field]: parseDate(module[field])
      }),
      {}
    )
  }));
}

function rowsZippedWithColumns(grid) {
  return grid.map(row => zipObject(COLUMN_NAMES, row));
}

function onlyValidRows(grid) {
  return grid.filter(row => row.length === 9);
}

function linesToGrid(lines) {
  return lines.map(line => line.split(';'));
}

function commentsRemoved(lines) {
  return lines.filter(line => line.indexOf('\'') !== 0);
}

function rawToLines(rawFile) {
  return rawFile.split('\n');
}
