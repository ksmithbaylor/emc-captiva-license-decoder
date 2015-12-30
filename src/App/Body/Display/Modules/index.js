import React from 'react';
import COLUMN_NAMES, { CODE, DISABLES } from 'data/columnNames';
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

// TODO: organize this better, maybe in columnHelpers? along with dateColumns?
let columnsToDisplay = COLUMN_NAMES.filter(
  name => name !== CODE && name !== DISABLES
);
columnsToDisplay.splice(1, 0, 'Function');
