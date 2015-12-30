import React from 'react';
import { pageWidth } from 'data/layout';
import colors from 'data/colors';
import Paper from 'material-ui/lib/paper';

export default function Header() {
  return (
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
}

const barStyle = {
  backgroundColor: colors.emc.grey,
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
  backgroundColor: colors.emc.blue.logo,
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
