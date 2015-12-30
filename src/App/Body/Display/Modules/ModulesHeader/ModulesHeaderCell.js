import React from 'react';
import colors from 'data/colors';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';

export default function ModulesHeaderCell({ column }) {
  return (
    <TableHeaderColumn style={style.cell}>
      {column}
    </TableHeaderColumn>
  );
}

const style = {
  cell: {
    overflow: 'visible',
    textAlign: 'center',
    whiteSpace: 'normal',
    fontSize: '1rem',
    color: colors.white,
    padding: 0
  }
};
