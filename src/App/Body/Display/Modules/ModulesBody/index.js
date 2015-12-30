import React from 'react';
import TableBody from 'material-ui/lib/table/table-body';
import ModuleRow from './ModuleRow';

// For material-ui (expects a TableBody inside Table)
ModulesBody.displayName = 'TableBody';

export default function ModulesBody({ modules, columns }) {
  const rows = modules.map((module, i) => (
    <ModuleRow
      module={module}
      columns={columns}
      key={i}
    />
  ));

  return (
    <TableBody displayRowCheckbox={false}>
      {rows}
    </TableBody>
  );
}
