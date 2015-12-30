import React from 'react';
import request from 'superagent';

import TableBody from 'material-ui/lib/table/table-body';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import { isUnlimited, isExpired, hasExpiry, isDateField, formatDate, numberWithCommas } from 'util';
import COLUMN_NAMES, { VALID, NAME, CODE, DISABLES } from 'data/columnNames';

export default function ModulesBody({ modules, columns }) {
  return (
    <TableBody displayRowCheckbox={false}>
      {modules.map(row.bind(null, columns))}
    </TableBody>
  );
}

// For material-ui (expects a TableBody inside Table)
ModulesBody.displayName = 'TableBody';

function row(columns, module, i) {
  return (
    <TableRow style={rowStyle(module)} key={i}>
      {columns.map(cell.bind(null, module))}
    </TableRow>
  );
}

function cell(module, column, i) {
  return (
    <TableRowColumn style={cellStyle(module, column)} key={i}>
      {cellContents(module, column)}
    </TableRowColumn>
  );
}

function rowStyle(module) {
  return isExpired(module) ? {
    color: '#B71C1C',
    backgroundColor: '#FFCDD2'
  } : hasExpiry(module) ? {
    color: '#1B5E20',
    backgroundColor: '#C8E6C9'
  } : {};
}

function cellStyle(module, column) {
  const isIndented = module[NAME].startsWith(' ');

  return {
    whiteSpace: isIndented ? 'pre' : 'pre-wrap',
    overflow: 'visible',
    height: '1.5rem',
    fontWeight: (column === VALID) ? 'bold' : 'inherit',
    textAlign: (column === CODE || column === NAME) ? 'left' : 'center',
    backgroundColor: (column === NAME) ? (
      isIndented ? '#B6E0FE' : '#60B3EE'
    ) : undefined,
    color: (column === NAME) ? '#000000' : undefined
  };
}

let functions = {};
request('/src/data/functions.json', (err, res) => {
  functions = res.body;
});

function cellContents(module, column) {
  if (isDateField(column)) return formatDate(module[column]);
  if (isUnlimited(column) && module[column === '0']) return 'Unlimited';
  if (column === 'Function') return functions[module[NAME]];
  return numberWithCommas(module[column]);
}
