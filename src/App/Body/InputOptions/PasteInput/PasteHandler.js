import React from 'react';
import { processPaste } from 'processor';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';

export default class PasteHandler extends React.Component {
  render() {
    const { open, closeMe } = this.props;

    const cancelButton = (
      <FlatButton label="Cancel" primary={true} onTouchTap={closeMe} />
    );

    const submitButton = (
      <FlatButton label="Submit" primary={true} onTouchTap={this.handlePaste} />
    );

    return (
      <Dialog
        title="Paste a license"
        open={open}
        actions={[ cancelButton, submitButton ]}
        onRequestClose={closeMe}
        modal={false}
      >
        While viewing the license in C4, press Ctrl+A (to select all text)
        and then Ctrl+C (to copy to the clipboard).  Navigate to this
        screen’s text box below, then press Ctrl-V (to paste the license
        file into the box) and click the SUBMIT button below or press the
        Enter key.
        <TextField
          autoFocus
          hintText="Paste clipboard here"
          onEnterKeyDown={this.handlePaste}
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
      </Dialog>
    );
  }

  handlePaste = (event) => {
    this.props.closeMe();
    setTimeout((() => this.props.requestResults(
      processPaste(this.refs.pasteInput.getValue())
    )), 200);
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
