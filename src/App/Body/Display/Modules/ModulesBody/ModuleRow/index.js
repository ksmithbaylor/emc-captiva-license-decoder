import React from 'react';
import { moduleIsExpired, moduleHasExpiration } from 'util';
import colors from 'data/colors';
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
  return moduleIsExpired(module)
    ? colored('red')
    : moduleHasExpiration(module)
      ? colored('green')
      : {};
}

function colored(color) {
  return {
    color: colors[color].dark,
    backgroundColor: colors[color].light
  };
}
