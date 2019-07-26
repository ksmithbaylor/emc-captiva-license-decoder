import React from 'react';
import colors from 'data/colors';
import Paper from 'material-ui/lib/paper';
import SummaryBody from './SummaryBody';

export default function Summary({ modules, serverID }) {
  return (
    <Paper zDepth={2} style={style.container}>
      <h2 style={style.header}>Summary for License #{serverID}</h2>
      <table style={style.table}>
        <SummaryBody modules={modules} />
      </table>
    </Paper>
  );
}

const style = {
  container: {
    marginTop: '1rem',
    padding: '1rem'
  },
  header: {
    marginTop: 0,
    color: colors.emc.blue.dark,
    textAlign: 'center'
  },
  table: {
    borderStyle: 'hidden',
    borderCollapse: 'collapse',
    margin: '0 auto'
  }
};
