import React from 'react';
import TextField from 'material-ui/lib/text-field';

export default class PasteTextField extends React.Component {
  render() {
    return (
      <TextField
        autoFocus
        ref="pasteInput"
        hintText="Paste clipboard here"
        onEnterKeyDown={this.props.onEnterKeyDown}
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
