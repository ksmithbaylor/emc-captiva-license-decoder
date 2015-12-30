import React from 'react';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import FileInput from './FileInput';
import PasteInput from './PasteInput';

// TODO: rename newResults to requestResults
// TODO: rename as Inputs
export default function InputOptions({ newResults }) {
  return (
    <Paper zDepth={2}>
      <FileInput
        requestResults={newResults}
        styles={{ sectionStyle, buttonStyle }}
      />
      <Divider />
      <PasteInput
        requestResults={newResults}
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
