import { NAME, FEATURES, VALID } from 'data/columnNames';

export function withName(name) {
  return module => module[NAME].toLowerCase().includes(name.toLowerCase());
}

export function withFeature(code) {
  return module => new RegExp(code).test(module[FEATURES]);
}

export function sumOf(column, modules) {
  return modules
    .map(module => parseInt(module[column]))
    .reduce((a, b) => a + b, 0);
}

export function notExpired(module) {
  return !module[VALID] || (module[VALID] > new Date());
}
