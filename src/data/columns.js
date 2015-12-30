export const NAME = 'Module Name';
export const FUNCTION = 'Function';
export const CONNECTIONS = 'Connections / Group';
export const PAGES = 'Pages / Group';
export const VALID = 'Valid Until';
export const ENTER_BY = 'Install By';
export const FEATURES = 'Feature Codes';
export const ISSUED = 'Issue Date';
export const DISABLES = 'Disables';
export const CODE = 'License Code';

export default [
  NAME,
  // FUNCTION // Not in the original .lic files
  CONNECTIONS,
  PAGES,
  VALID,
  ENTER_BY,
  FEATURES,
  ISSUED,
  DISABLES,
  CODE
];

export const columnsToDisplay = [
  NAME,
  FUNCTION,
  CONNECTIONS,
  PAGES,
  VALID,
  ENTER_BY,
  FEATURES,
  ISSUED
  //DISABLES // Asked not to display
  //CODE // Asked not to display
];

export const dateFields = [
  ENTER_BY,
  ISSUED,
  VALID
];

export const unlimitedFields = [
  CONNECTIONS,
  PAGES,
  VALID
];
