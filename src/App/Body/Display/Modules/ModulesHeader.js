import React from 'react';

import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

export default function ModulesHeader({ columns }) {
  return (
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow style={headerStyle}>
        {columns.map((column, i) => (
          <TableRowColumn style={cellStyle} key={i}>
            {column}
          </TableRowColumn>
        ))}
      </TableRow>
    </TableHeader>
  );
}

// For material-ui (expects a TableHeader inside Table)
ModulesHeader.displayName = 'TableHeader';

const headerStyle = {
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
