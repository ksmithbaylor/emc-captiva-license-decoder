import { VALID } from 'data/columnNames';

export function moduleIsExpired(module) {
  return moduleHasExpiration(module) && (module[VALID] < new Date());
}

export function moduleHasExpiration(module) {
  return module[VALID];
}
