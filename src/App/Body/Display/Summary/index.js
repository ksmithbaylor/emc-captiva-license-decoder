import React from 'react';
import colors from 'data/colors';
import Paper from 'material-ui/lib/paper';
import SummaryBody from './SummaryBody';

export default function Summary({ modules, serverID }) {
  return (
    <Paper zDepth={2} style={containerStyle}>
      <h2 style={headerStyle}>
        Summary for License #{serverID}
      </h2>
      <table style={tableStyle}>
        <SummaryBody modules={modules} />
      </table>
    </Paper>
  );
}

const containerStyle = {
  marginTop: '1rem',
  padding: '1rem'
};

const headerStyle = {
  marginTop: 0,
  color: colors.emc.blue.dark,
  textAlign: 'center'
};

const tableStyle = {
  borderStyle: 'hidden',
  borderCollapse: 'collapse',
  margin: '0 auto'
};
