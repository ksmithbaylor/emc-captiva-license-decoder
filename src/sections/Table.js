import React from 'react';

import { isExpired, hasExpiry, isDateField, formatDate } from '../util';
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
  return {
    ...expiredStyle(row, column),
    ...alignStyle(row, column)
  };
}

function expiredStyle(row, column) {
  return column === VALID ? (
    isExpired(row) ? {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'darkred'
    } : {
      fontWeight: 'bold'
    }
  ) : {};
}

function alignStyle(row, column) {
  return (column === MODULE || column === CODE) ? {
    textAlign: 'left'
  } : {
    textAlign: 'center'
  };
}

function getRowStyle(row) {
  return hasExpiry(row) ? {
    color: 'red',
    backgroundColor: 'pink'
  } : {};
}
