import React from 'react';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

// For material-ui (expects a TableHeader inside Table)
ModulesHeader.displayName = 'TableHeader';

export default function ModulesHeader({ columns }) {
  return (
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow style={rowStyle}>
        {columns.map(cell)}
      </TableRow>
    </TableHeader>
  );
}

// TODO: split into separate component
function cell(column, i) {
  return (
    <TableRowColumn style={cellStyle} key={i}>
      {column}
    </TableRowColumn>
  );
}

const rowStyle = {
  backgroundColor: '#00406E',
  color: '#ffffff'
};

const cellStyle = {
  overflow: 'visible',
  textAlign: 'center',
  whiteSpace: 'normal',
  fontSize: '1rem',
  padding: 0
};
