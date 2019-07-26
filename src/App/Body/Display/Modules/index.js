import React from 'react';
import { detect } from 'detect-browser';
import { columnsToDisplay } from 'data/columns';
import { chunk } from 'util';
import Paper from 'material-ui/lib/paper';
import Table from 'material-ui/lib/table/table';
import ModulesHeader from './ModulesHeader';
import ModulesBody from './ModulesBody';

const browser = detect();

export default function Modules({ modules }) {
  if (browser.name === 'chrome') {
    return <ModuleTable modules={modules} />;
  } else {
    const moduleChunks = chunk(modules, 20);

    return (
      <div>
        <ModuleTable modules={modules} className="print-hidden" />
        {moduleChunks.map((chunk, i) => (
          <ModuleTable
            key={i}
            modules={chunk}
            className="print-break-after screen-hidden"
          />
        ))}
      </div>
    );
  }
}

function ModuleTable({ modules, className }) {
  return (
    <Paper zDepth={2} style={style.container} className={className}>
      <Table selectable={false}>
        <ModulesHeader columns={columnsToDisplay} />
        <ModulesBody columns={columnsToDisplay} modules={modules} />
      </Table>
    </Paper>
  );
}

const style = {
  container: {
    marginTop: '1rem',
    display: 'inline-block'
  }
};
