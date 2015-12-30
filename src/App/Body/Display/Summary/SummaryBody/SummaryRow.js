import React from 'react';
import { hasLetters, numberWithCommas } from 'util';
import colors from 'data/colors';

export default function SummaryRow({ title, value }) {
  return (
    <tr style={style.row}>
      <td style={style.title}>{title}:</td>
      <td style={style.value}>{format(value)}</td>
    </tr>
  );
}

function format(value) {
  return hasLetters(value) ? value : numberWithCommas(value);
}

const style = {
  row: {
    border: `1px solid ${colors.grey.light}`
  },
  title: {
    fontWeight: 'bold',
    verticalAlign: 'top',
    padding: '0.25rem 1rem'
  },
  value: {
    padding: '0.25rem 1rem'
  }
};
