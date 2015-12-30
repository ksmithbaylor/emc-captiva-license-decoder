import React from 'react';
import Paper from 'material-ui/lib/paper';
import SummaryBody from './SummaryBody';

export default ({ modules, serverID }) => (
  <Paper zDepth={2} style={containerStyle}>
    <h2 style={headerStyle}>
      Summary for License #{serverID}
    </h2>
    <table style={tableStyle}>
      <SummaryBody modules={modules} />
    </table>
  </Paper>
);

const containerStyle = {
  marginTop: '1rem',
  padding: '1rem'
};

const headerStyle = {
  marginTop: 0,
  color: '#00406E',
  textAlign: 'center'
};

const tableStyle = {
  borderStyle: 'hidden',
  borderCollapse: 'collapse',
  margin: '0 auto'
};
