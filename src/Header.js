import React, { Component } from 'react';

import Paper from 'material-ui/lib/paper';

export default class Header extends Component {
  render() {
    return (
      <div style={outerContainerStyle}>
        <Paper rounded={false} zDepth={1} circle={false} style={barStyle} />
        <div style={centerContainerStyle}>
          <Paper rounded={false} zDepth={2} circle={false} style={logoStyle}>
            <img src="logo.png" style={logoImageStyle} />
          </Paper>
          <span style={titleStyle}>CAPTIVA License Decoder</span>
        </div>
      </div>
    )
  }
}

const outerContainerStyle = {
  fontSize: '2em'
};

const barStyle = {
  backgroundColor: '#4e5052',
  height: '2.5em',
  width: '100%',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 1000
};

const centerContainerStyle = {
  position: 'fixed',
  width: '100%',
  left: 0,
  top: 0,
  paddingLeft: '2em',
  paddingRight: '2em',
  zIndex: 1001
};

const logoImageStyle = {
  height: '3em',
  width: '3em'
}

const logoStyle = {
  backgroundColor: '#2c95dd',
  position: 'fixed',
  ...logoImageStyle
};

const titleStyle = {
  marginLeft: '4em',
  lineHeight: '2.5em',
  color: 'white'
};
