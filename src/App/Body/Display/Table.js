import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import request from 'superagent';

import Paper from 'material-ui/lib/paper';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import { isUnlimited, isExpired, hasExpiry, isDateField, formatDate, numberWithCommas } from 'util';
import COLUMN_NAMES, { VALID, NAME, CODE, DISABLES } from 'data/columnNames';

let functions = {};
request('/src/data/functions.json', (err, res) => {
  functions = res.body;
});

const columnsToDisplay = COLUMN_NAMES.filter(name => name !== CODE && name !== DISABLES);
columnsToDisplay.splice(1, 0, 'Function');

export default ({ modules, serverID }) => (
  <Paper zDepth={2} style={{ marginTop: '1rem', display: 'inline-block' }}>
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow style={headerStyle}>
          {columnsToDisplay.map((column, i) => (
            <TableRowColumn style={{ overflow: 'visible', textAlign: 'center', whiteSpace: 'normal', fontSize: '1rem', padding: 0 }} key={i}>
              {column}
            </TableRowColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {modules.map((module, i) => (
          <TableRow style={rowStyle(module)} key={i}>
            {columnsToDisplay.map((column, i) => (
              <TableRowColumn style={cellStyle(module, column)} key={i}>
                {cellContents(module, column)}
              </TableRowColumn>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

function cellContents(module, column) {
  if (isDateField(column)) return formatDate(module[column]);
  if (isUnlimited(column) && module[column === '0']) return 'Unlimited';
  if (column === 'Function') return functions[module[NAME]];
  return numberWithCommas(module[column]);
}

const headerStyle = {
  backgroundColor: '#00406E',
  color: '#ffffff'
};

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
