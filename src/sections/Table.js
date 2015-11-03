import React from 'react';

import { isUnlimited, isExpired, hasExpiry, isDateField, formatDate } from '../util';
import COLUMN_NAMES, { VALID, MODULE, CODE } from '../data/columnNames';

export default class Table extends React.Component {
  render() {
    if (!this.props.license) {
      return <span></span>;
    }

    return (
      <table>
        <tbody>
          <tr>
            {COLUMN_NAMES.map((column, i) => (
              <th key={i}>{column}</th>
            ))}
          </tr>
          {this.props.license.map((row, i) => (
            <tr style={getRowStyle(row)} key={i}>
              {COLUMN_NAMES.map((column, i) => (
                <td style={getCellStyle(row, column)} key={i}>
                  {getCellContents(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function getCellContents(row, column) {
  return isDateField(column) ? (
    formatDate(row[column])
  ) : (
    (isUnlimited(column) && row[column] === '0') ? 'Unlimited' : row[column]
  );
}

function getCellStyle(row, column) {
  return {
    fontWeight: column === VALID ? 'bold' : 'inherit',
    textAlign: (column === MODULE || column === CODE) ? 'left' : 'center'
  };
}

function getRowStyle(row) {
  return isExpired(row) ? {
    color: 'white',
    backgroundColor: 'darkred'
  } : hasExpiry(row) ? {
    color: 'red',
    backgroundColor: 'pink'
  } : {};
}
