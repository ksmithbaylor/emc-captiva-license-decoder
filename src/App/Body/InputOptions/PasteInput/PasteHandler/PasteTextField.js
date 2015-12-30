import React from 'react';
import TextField from 'material-ui/lib/text-field';

export default function PasteTextField({ onEnterKeyDown }) {
  return (
    <TextField
      autoFocus
      hintText="Paste clipboard here"
      onEnterKeyDown={onEnterKeyDown}
      ref="pasteInput"
      multiLine={true}
      rows={1}
      rowsMax={5}
      fullWidth={true}
      style={textFieldStyle}
      underlineStyle={underlineStyle}
      underlineFocusStyle={underlineFocusStyle}
      hintStyle={hintStyle}
    />
  );
}

const textFieldStyle = {
  marginTop: '1rem',
  border: '1px solid #a0a0a0',
  borderBottom: 'none',
  verticalAlign: 'top'
};

// TODO: make a single style object for all components
const underlineStyle = {
  bottom: 0,
  borderColor: '#a0a0a0'
};

const underlineFocusStyle = {
  borderColor: '#2c95dd'
};

const hintStyle = {
  marginLeft: '5px'
};