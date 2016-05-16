import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export default function BugReportButton() {
  return (
    <div style={style.container}>
      <RaisedButton
        label="Feedback?"
        linkButton
        href="mailto:jim.smith@emc.com?subject=License Decoder Feedback"
      />
    </div>
  );
}

const style = {
  container: {
    display: 'inline-block',
    marginLeft: '0.5em'
  }
};
