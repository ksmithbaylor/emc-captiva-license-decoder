import React from 'react';
import { hasLetters, numberWithCommas } from 'util';
import colors from 'data/colors';

export default ({ title, value }) => (
  <tr style={rowStyle}>
    <td style={titleStyle}>{title}:</td>
    <td style={valueStyle}>{format(value)}</td>
  </tr>
);

function format(value) {
  return hasLetters(value) ? value : numberWithCommas(value);
}

const rowStyle = {
  border: `1px solid ${colors.grey.light}`
};

const titleStyle = {
  fontWeight: 'bold',
  verticalAlign: 'top',
  padding: '0.25rem 1rem'
};

const valueStyle = {
  padding: '0.25rem 1rem'
};
