import React from 'react';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';

export default () => (
  <div>
    <Paper zDepth={2}>
      <div style={sectionStyle}>
        <RaisedButton label="OPEN" primary={true} style={buttonStyle} />
        Open a license file from your computer
      </div>
      <Divider />
      <div style={sectionStyle}>
        <RaisedButton label="PASTE" secondary={true} style={buttonStyle} />
        Copy and paste from the C4 screen
      </div>
    </Paper>
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <RaisedButton label="Display Help" />
    </div>
  </div>
);

const sectionStyle = {
  padding: '2rem'
};

const buttonStyle = {
  marginRight: '2rem'
}
