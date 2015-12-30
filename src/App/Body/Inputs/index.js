import React from 'react';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import FileInput from './FileInput';
import PasteInput from './PasteInput';

export default function Inputs({ requestResults }) {
  const inputProps = { requestResults, style };

  return (
    <Paper zDepth={2}>
      <FileInput {...inputProps} />
      <Divider />
      <PasteInput {...inputProps} />
    </Paper>
  );
}

const style = {
  section: {
    padding: '2rem'
  },
  button: {
    textAlign: 'center',
    marginRight: '2rem'
  }
};
