import React from 'react';
import { isExpired, hasExpiry } from 'util';
import TableRow from 'material-ui/lib/table/table-row';
import ModuleCell from './ModuleCell';

export default function ModuleRow({ module, columns }) {
  const cells = columns.map((column, i) => (
    <ModuleCell
      module={module}
      column={column}
      key={i}
    />
  ));

  return (
    <TableRow style={rowStyle(module)}>
      {cells}
    </TableRow>
  );
}

function rowStyle(module) {
  return isExpired(module) ? {
    color: '#B71C1C',
    backgroundColor: '#FFCDD2'
  } : hasExpiry(module) ? {
    color: '#1B5E20',
    backgroundColor: '#C8E6C9'
  } : {};
}
