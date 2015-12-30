import React from 'react';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import FileInput from './FileInput';
import PasteInput from './PasteInput';

export default function Inputs({ requestResults }) {
  return (
    <Paper zDepth={2}>
      <FileInput
        requestResults={requestResults}
        styles={{ sectionStyle, buttonStyle }}
      />
      <Divider />
      <PasteInput
        requestResults={requestResults}
        styles={{ sectionStyle, buttonStyle }}
      />
    </Paper>
  );
}

const sectionStyle = {
  padding: '2rem'
};

const buttonStyle = {
  textAlign: 'center',
  marginRight: '2rem'
};
