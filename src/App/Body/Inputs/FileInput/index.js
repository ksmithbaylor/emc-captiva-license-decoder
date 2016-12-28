import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FileHandler from './FileHandler';

export default function FileInput({ requestResults, style }) {
  return (
    <div style={style.section}>
      <RaisedButton
        label="OPEN"
        primary
        linkButton
        onTouchTap={fileDecoded}
        style={style.button}
      >
        <FileHandler requestResults={requestResults} />
      </RaisedButton>
      Open a license file from your computer
    </div>
  );
}

function fileDecoded(event) {
  if (typeof window.ga === 'function') {
    ga('send', 'event', 'Decode', 'file');
  }
}
