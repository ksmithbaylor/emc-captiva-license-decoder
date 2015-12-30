import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FileHandler from './FileHandler';

export default function FileInput({ requestResults, styles }) {
  return (
    <div style={styles.sectionStyle}>
      <RaisedButton
        label="OPEN"
        primary={true}
        linkButton={true}
        style={styles.buttonStyle}
      >
        <FileHandler requestResults={requestResults} />
      </RaisedButton>
      Open a license file from your computer
    </div>
  );
}
