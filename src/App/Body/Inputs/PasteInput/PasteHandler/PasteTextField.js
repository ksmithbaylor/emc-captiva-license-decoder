import React from 'react';
import colors from 'data/colors';
import TextField from 'material-ui/lib/text-field';

export default class PasteTextField extends React.Component {
  static propTypes = {
    onEnterKeyDown: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <TextField
        autoFocus
        ref="pasteInput"
        hintText="Paste clipboard here"
        onEnterKeyDown={this.props.onEnterKeyDown}
        fullWidth
        multiLine
        rows={1}
        rowsMax={5}
        style={style.textField}
        underlineStyle={style.underline}
        underlineFocusStyle={style.underlineFocus}
        hintStyle={style.hint}
      />
    );
  }
}

const style = {
  textField: {
    marginTop: '1rem',
    border: `1px solid ${colors.grey.medium}`,
    borderBottom: 'none',
    verticalAlign: 'top'
  },
  underline: {
    bottom: 0,
    borderColor: colors.grey.medium
  },
  underlineFocus: {
    borderColor: colors.emc.blue.logo
  },
  hint: {
    marginLeft: '5px'
  }
};
