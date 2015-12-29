import COLUMN_NAMES, { ENTER_BY, ISSUED, VALID, NAME, PAGES } from 'data/columnNames';
import { zipObject, parseDate, formatDate, pipe, member, by, hasLetters, lowerCaseEqual } from 'util';

////////////////////////////////////////////////////////////////////////////////
// Composed pipelines for file and pasted inputs

const commonSteps = [
  rowsZippedWithColumns,
  dateFieldsConverted,
  sortedByModuleName,
  correctlyOrdered
];

export function processLicense(rawFile) {
  return {
    serverID: pipe(rawFile, getFileServerID),
    modules: pipe(
      rawFile,
      rawToLines,
      commentsRemoved,
      linesToGrid,
      onlyRowsOfLength(9),
      ...commonSteps
    )
  };
}

export function processPaste(pasted) {
  return {
    serverID: pipe(pasted, getPastedServerID),
    modules: pipe(
      pasted,
      onlyValidSection,
      rawToLines,
      replaceTabsWithSemicolons,
      linesToGrid,
      onlyRowsOfLength(11),
      correctPastedColumnOrder,
      removeHeaderLine,
      ...commonSteps
    )
  };
}

////////////////////////////////////////////////////////////////////////////////
// Steps only for file input

function getFileServerID(rawFile) {
  return rawToLines(rawFile)[0].split(' ').slice(-1)[0];
}

function rawToLines(rawFile) {
  return rawFile.split('\n');
}

function commentsRemoved(lines) {
  return lines.filter(line => line.indexOf('\'') !== 0);
}

function linesToGrid(lines) {
  return lines.map(line => line.split(';').map(col => col.trim()));
}

function onlyRowsOfLength(length) {
  return function (grid) {
    return grid.filter(row => row.length === length);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Steps only for pasted input

function getPastedServerID(pasted) {
  return rawToLines(pasted).find(line => line.includes('Server ID:')).split('\t')[1];
}

function onlyValidSection(pasted) {
  return pasted.split('License Details')[1].split('License Files')[0];
}

function replaceTabsWithSemicolons(lines) {
  return lines.map(line => line.replace(new RegExp('\t', 'g'), ';'));
}

function correctPastedColumnOrder(grid) {
  return grid.map(row => ([
    ...row.slice(0, 4),
    row[7],
    ...row.slice(4, 7),
    row[9]
  ]));
}

function removeHeaderLine(grid) {
  return grid.slice(1);
}

////////////////////////////////////////////////////////////////////////////////
// Common steps used by both file and pasted input

function rowsZippedWithColumns(grid) {
  return grid.map(row => zipObject(COLUMN_NAMES, row));
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

function sortedByModuleName(modules) {
  return modules.sort(by(NAME));
}

function correctlyOrdered(modules) {
  return modules.reduce(
    groupModulesReducer,
    { orderedModules: [], skipped: [] }
  ).orderedModules;
}

////////////////////////////////////////////////////////////////////////////////
// Sorting functionality, used for both

function groupModulesReducer({ orderedModules, skipped }, __, _, allModules) {
  const pairs = allModules.map((module, index) => [module, index]);
  const nonSkipped = pairs.filter(([module, index]) => !member(skipped, index));

  // Parent: First module with a numeric PAGES column
  const [parentModule, parentIndex] = nonSkipped.find(([module, index]) => !hasLetters(module[PAGES])) || [undefined, undefined];

  // Siblings: All modules with the same NAME as the parent and numeric PAGES column
  const siblings = parentModule !== undefined ? nonSkipped.filter(([module, index]) => (
    index !== parentIndex
    && lowerCaseEqual(module[NAME], parentModule[NAME])
    && !hasLetters(module[PAGES])
  )) : [];

  // Children: All modules with a PAGES column identical to the parent's NAME and not already in the siblings
  const children = parentModule !== undefined ? nonSkipped.filter(([module, index]) => (
    index !== parentIndex
    && !member(siblings.map(([module, i]) => i), index)
    && lowerCaseEqual(module[PAGES], parentModule[NAME])
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
