import React from 'react';
import colors from 'data/colors';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';

export default function ModulesHeaderCell({ column }) {
  return (
    <TableHeaderColumn style={cellStyle}>
      {column}
    </TableHeaderColumn>
  );
}

const cellStyle = {
  overflow: 'visible',
  textAlign: 'center',
  whiteSpace: 'normal',
  fontSize: '1rem',
  color: colors.white,
  padding: 0
};
