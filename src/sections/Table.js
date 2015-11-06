import React from 'react';

import { isUnlimited, isExpired, hasExpiry, isDateField, formatDate, numberWithCommas } from '../util';
import COLUMN_NAMES, { VALID, NAME, CODE } from '../data/columnNames';

export default ({ modules, serverID }) => (
  (!modules || !serverID) ? (
    <span></span>
  ) : (
    <div>
      <h2>Captiva Capture License ID: {serverID}</h2>
      <table>
        <tbody>
          <tr style={headerStyle()}>
            {COLUMN_NAMES.map((column, i) => (
              <th style={{ padding: '5px' }} key={i}>{column}</th>
            ))}
          </tr>
          {modules.map((module, i) => (
            <tr style={rowStyle(module)} key={i}>
              {COLUMN_NAMES.map((column, i) => (
                <td style={cellStyle(module, column)} key={i}>
                  {cellContents(module, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
);

function headerStyle() {
  return {
    backgroundColor: '#1565C0',
    color: '#ffffff',
    fontSize: '1.1em'
  };
}

function cellContents(module, column) {
  return isDateField(column) ? (
    formatDate(module[column])
  ) : (isUnlimited(column) && module[column] === '0') ?
    'Unlimited' : numberWithCommas(module[column]);
}

function cellStyle(module, column) {
  return {
    fontWeight: (column === VALID) ? 'bold' : 'inherit',
    textAlign: (column === CODE || column === NAME) ? 'left' : 'center',
    backgroundColor: (column === NAME) ? (
      (module[NAME].startsWith(' ')) ? '#BBDEFB' : '#64B5F6'
    ) : undefined,
    color: (column === NAME) ? '#000000' : undefined
  };
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
