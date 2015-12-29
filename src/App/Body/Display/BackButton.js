import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';

export default ({ onTouchTap }) => (
  <RaisedButton
    label="BACK TO START"
    labelPosition="after"
    labelStyle={{ paddingLeft: '0.5rem', }}
    onTouchTap={onTouchTap}
  >
    <span style={iconStyle}>&lsaquo;</span>
  </RaisedButton>
);

const iconStyle = {
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
  padding: 0,
  paddingLeft: '0.5rem',
  lineHeight: '2rem',
  fontSize: '2rem'
};
