import React from 'react';
import colors from 'data/colors';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRow from 'material-ui/lib/table/table-row';
import ModulesHeaderCell from './ModulesHeaderCell';

// For material-ui (expects a TableHeader inside Table)
ModulesHeader.displayName = 'TableHeader';

export default function ModulesHeader({ columns }) {
  const cells = columns.map((column, i) => (
    <ModulesHeaderCell column={column} key={i} />
  ));

  return (
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow style={rowStyle}>
        {cells}
      </TableRow>
    </TableHeader>
  );
}

const rowStyle = {
  backgroundColor: colors.emc.blue.dark
};
