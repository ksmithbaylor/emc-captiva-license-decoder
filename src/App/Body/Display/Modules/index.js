import React from 'react';
import { columnsToDisplay } from 'data/columns';
import Paper from 'material-ui/lib/paper';
import Table from 'material-ui/lib/table/table';
import ModulesHeader from './ModulesHeader';
import ModulesBody from './ModulesBody';

export default function Modules({ modules }) {
  return (
    <Paper zDepth={2} style={containerStyle}>
      <Table selectable={false}>
        <ModulesHeader columns={columnsToDisplay} />
        <ModulesBody columns={columnsToDisplay} modules={modules} />
      </Table>
    </Paper>
  );
}

const containerStyle = {
  marginTop: '1rem',
  display: 'inline-block'
};
