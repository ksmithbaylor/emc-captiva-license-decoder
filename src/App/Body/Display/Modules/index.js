import React from 'react';
import { columnsToDisplay } from 'data/columns';
import { chunk } from 'util';
import Paper from 'material-ui/lib/paper';
import Table from 'material-ui/lib/table/table';
import ModulesHeader from './ModulesHeader';
import ModulesBody from './ModulesBody';

export default function Modules({ modules }) {
  const moduleChunks = chunk(modules, 20);

  return (
    <div>
      <Paper zDepth={2} style={style.container} className="print-hidden">
        <Table selectable={false}>
          <ModulesHeader columns={columnsToDisplay} />
          <ModulesBody columns={columnsToDisplay} modules={modules} />
        </Table>
      </Paper>
      {moduleChunks.map((modules, i) => (
        <Paper
          key={i}
          zDepth={2}
          style={style.container}
          className="print-break-after screen-hidden"
        >
          <Table selectable={false}>
            <ModulesHeader columns={columnsToDisplay} />
            <ModulesBody columns={columnsToDisplay} modules={modules} />
          </Table>
        </Paper>
      ))}
    </div>
  );
}

const style = {
  container: {
    marginTop: '1rem',
    display: 'inline-block'
  }
};
