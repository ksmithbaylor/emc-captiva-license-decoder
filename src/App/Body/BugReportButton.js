import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export default function BugReportButton() {
  return (
    <div style={style.container}>
      <RaisedButton
        label="Feedback?"
        linkButton
        href="mailto:ksmithbaylor@gmail.com?subject=EMC License Decoder Feedback"
      />
    </div>
  );
}

const style = {
  container: {
    display: 'inline-block',
    marginLeft: '0.5em',
    marginRight: '0.5em'
  }
};
