import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FileHandler from './FileHandler';

export default function FileInput({ sectionStyle, buttonStyle, requestResults }) {
  return (
    <div style={sectionStyle}>
      <RaisedButton
        label="OPEN"
        primary={true}
        linkButton={true}
        style={buttonStyle}
      >
        <FileHandler requestResults={requestResults} />
      </RaisedButton>
      Open a license file from your computer
    </div>
  );
}
