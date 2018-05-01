import React from 'react';
import { pageWidth } from 'data/constants';
import colors from 'data/colors';
import Paper from 'material-ui/lib/paper';

export default function Header() {
  return (
    <Paper rounded={false} zDepth={1} style={style.bar}>
      <div style={style.centerContainer}>
        <Paper rounded={false} zDepth={2} style={style.logo}>
          <img src="logo.png" style={style.logoImage} />
        </Paper>
        <span style={style.title}>
          CAPTIVA License Decoder
        </span>
      </div>
    </Paper>
  );
}

const style = {
  bar: {
    backgroundColor: colors.emc.grey,
    height: '5rem',
    width: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000
  },
  centerContainer: {
    width: pageWidth,
    margin: '0 auto',
    zIndex: 1001
  },
  logo: {
    backgroundColor: colors.emc.blue.logo,
    display: 'inline-block',
    fontSize: 0
  },
  logoImage: {
    display: 'inline-block',
    padding: '0.75rem 0.8rem',
    height: '4.5rem',
  },
  title: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: '1.5rem',
    fontSize: '2rem',
    lineHeight: '5rem',
    color: 'white'
  }
};
