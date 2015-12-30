import { NAME, FEATURES, VALID } from 'data/columnNames';
import { lowerCaseEqual } from 'util';

export function withName(name) {
  return module => lowerCaseEqual(name, module[NAME]);
}

export function withFeature(code) {
  return module => (
    new RegExp(code.toLowerCase())
    .test(module[FEATURES].toLowerCase())
  );
}

export function sumOf(column, modules) {
  return (
    modules
    .map(module => parseInt(module[column]))
    .reduce((a, b) => a + b, 0)
  );
}

export function notExpired(module) {
  return !module[VALID] || module[VALID] > new Date();
}
