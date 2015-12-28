import React from 'react';

import Paper from 'material-ui/lib/paper';

import { sideMargin, pageWidth } from 'data/layout';

export default () => (
  <Paper rounded={false} zDepth={1} style={barStyle}>
    <div style={centerContainerStyle}>
      <Paper rounded={false} zDepth={2} style={logoStyle}>
        <img src="logo.png" style={logoImageStyle} />
      </Paper>
      <span style={titleStyle}>
        CAPTIVA License Decoder
      </span>
    </div>
  </Paper>
);

const barStyle = {
  backgroundColor: '#4e5052',
  height: '5rem',
  width: '100%',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 1000
};

const centerContainerStyle = {
  width: pageWidth,
  margin: '0 auto',
  zIndex: 1001
};

const logoStyle = {
  backgroundColor: '#2c95dd',
  display: 'inline-block',
  fontSize: 0
};

const logoImageStyle = {
  display: 'inline-block',
  height: '6rem',
};

const titleStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  marginLeft: '1.5rem',
  fontSize: '2rem',
  lineHeight: '5rem',
  color: 'white'
};
