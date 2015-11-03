import React from 'react';

import { isUnlimited, isExpired, hasExpiry, isDateField, formatDate } from '../util';
import COLUMN_NAMES, { VALID, NAME, CODE } from '../data/columnNames';

export default ({ modules, serverID }) => (
  (!modules || !serverID) ? (
    <span></span>
  ) : (
    <div>
      <h2>Captiva Capture License ID: {serverID}</h2>
      <table>
        <tbody>
          <tr>
            {COLUMN_NAMES.map((column, i) => (
              <th key={i}>{column}</th>
            ))}
          </tr>
          {modules.map((row, i) => (
            <tr style={rowStyle(row)} key={i}>
              {COLUMN_NAMES.map((column, i) => (
                <td style={cellStyle(row, column)} key={i}>
                  {cellContents(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
);

function cellContents(row, column) {
  return isDateField(column) ? (
    formatDate(row[column])
  ) : (
    (isUnlimited(column) && row[column] === '0') ? 'Unlimited' : row[column]
  );
}

function cellStyle(row, column) {
  return {
    fontWeight: column === VALID ? 'bold' : 'inherit',
    textAlign: (column === CODE) ? 'left' : (
      (column === NAME) ? (
        (row._indent) ? 'right' : 'left'
      ) : 'center'
    )
  };
}

function rowStyle(row) {
  return isExpired(row) ? {
    color: 'red',
    backgroundColor: 'pink'
  } : hasExpiry(row) ? {
    color: 'darkgreen',
    backgroundColor: 'lightgreen'
  } : {};
}
