import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export default function BackButton({ goBack }) {
  return (
    <RaisedButton
      label="BACK TO START"
      labelPosition="after"
      labelStyle={style.label}
      onTouchTap={goBack}
    >
      <span style={style.icon}>&lsaquo;</span>
    </RaisedButton>
  );
}

const style = {
  label: {
    paddingLeft: '0.5rem'
  },
  icon: {
    height: '100%',
    display: 'inline-block',
    verticalAlign: 'top',
    padding: 0,
    paddingLeft: '0.5rem',
    lineHeight: '2rem',
    fontSize: '2rem'
  }
};
