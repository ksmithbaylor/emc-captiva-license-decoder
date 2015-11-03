import React from 'react';

import { isExpired, hasExpiry, isDateField, formatDate } from '../util';
import COLUMN_NAMES, { VALID } from '../data/columnNames';

const boldRed = {
  color: 'red',
  backgroundColor: 'pink'
};

const darkBoldRed = {
  color: 'white',
  fontWeight: 'bold',
  backgroundColor: 'darkred'
};

const bold = {
  fontWeight: 'bold'
};

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
                  {optionallyFormatDate(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function optionallyFormatDate(row, column) {
  return isDateField(column) ? formatDate(row[column]) : row[column];
}

function getCellStyle(row, column) {
  return column === VALID ? (
    isExpired(row) ? darkBoldRed : bold
  ) : {};
}

function getRowStyle(row) {
  return hasExpiry(row) ? boldRed : {};
}
