import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

export default ({ onTouchTap }) => (
  <RaisedButton
    label="BACK TO START"
    labelPosition="after"
    labelStyle={labelStyle}
    onTouchTap={onTouchTap}
  >
    <FontIcon className="material-icons" style={iconStyle}>
      chevron_left
    </FontIcon>
  </RaisedButton>
);

const iconStyle = {
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'middle',
  padding: 0,
  lineHeight: '2rem',
  fontSize: '2rem'
};

const labelStyle = {
  paddingLeft: 0
};
