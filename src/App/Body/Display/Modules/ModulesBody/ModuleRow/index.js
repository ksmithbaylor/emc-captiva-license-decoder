import React from 'react';
import { moduleIsExpired, moduleHasExpiration } from 'util';
import colors from 'data/colors';
import TableRow from 'material-ui/lib/table/table-row';
import ModuleCell from './ModuleCell';

export default function ModuleRow({ module, columns }) {
  const cells = columns.map((column, i) => (
    <ModuleCell module={module} column={column} key={i} />
  ));

  return <TableRow style={style.row(module)}>{cells}</TableRow>;
}

const style = {
  row(module) {
    return moduleIsExpired(module)
      ? style.colored('red')
      : moduleHasExpiration(module)
      ? style.colored('green')
      : {};
  },

  colored(color) {
    return {
      color: colors[color].dark,
      backgroundColor: colors[color].light
    };
  }
};
