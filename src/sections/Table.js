import React from 'react';

import COLUMN_NAMES from '../data/columnNames';

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
            <tr key={i}>
              {COLUMN_NAMES.map((column, i) => (
                  <td style={{ color: (column === 'Valid Until' && row[column] !== '0') ? 'red' : 'black' }}
                      key={i}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
