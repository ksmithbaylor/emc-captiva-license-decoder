import React from 'react';

import Paper from 'material-ui/lib/paper';

import { sideMargin, pageWidth } from 'data/layout';

export default () => (
  <div>
    <Paper rounded={false} zDepth={1} style={barStyle} />
    <div style={centerContainerStyle}>
      <Paper rounded={false} zDepth={2} style={logoStyle}>
        <img src="logo.png" style={logoImageStyle} />
      </Paper>
      <span style={titleStyle}>
        CAPTIVA License Decoder
      </span>
    </div>
  </div>
);

const logoSide = 6;
const barHeight = 5;

const barStyle = {
  backgroundColor: '#4e5052',
  height: barHeight + 'rem',
  width: '100%',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 1000
};

const centerContainerStyle = {
  position: 'fixed',
  top: 0,
  left: sideMargin,
  width: pageWidth,
  margin: '0 auto',
  fontSize: '2rem',
  zIndex: 1001
};

const logoImageStyle = {
  height: logoSide + 'rem',
  width: logoSide + 'rem'
}

const logoStyle = {
  backgroundColor: '#2c95dd',
  position: 'fixed',
  ...logoImageStyle
};

const titleStyle = {
  marginLeft: (logoSide + 1.5) + 'rem',
  lineHeight: barHeight + 'rem',
  color: 'white'
};
