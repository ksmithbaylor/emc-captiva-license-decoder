import React from 'react';
import colors from 'data/colors';
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
  border: `1px solid ${colors.grey.medium}`,
  borderBottom: 'none',
  verticalAlign: 'top'
};

// TODO: make a single style object for all components
const underlineStyle = {
  bottom: 0,
  borderColor: colors.grey.medium
};

const underlineFocusStyle = {
  borderColor: colors.emc.blue.logo
};

const hintStyle = {
  marginLeft: '5px'
};
