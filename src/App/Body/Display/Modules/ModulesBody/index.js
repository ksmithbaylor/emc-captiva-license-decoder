import React from 'react';

import ModuleRow from './ModuleRow';

import TableBody from 'material-ui/lib/table/table-body';

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

// For material-ui (expects a TableBody inside Table)
ModulesBody.displayName = 'TableBody';
