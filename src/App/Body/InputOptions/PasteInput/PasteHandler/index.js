import React from 'react';
import { processPaste } from 'processor';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import PasteTextField from './PasteTextField';

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
        <PasteTextField onEnterKeyDown={this.handlePaste} ref="textField" />
      </Dialog>
    );
  }

  handlePaste = (event) => {
    this.props.closeMe();
    setTimeout((() => this.props.requestResults(
      processPaste(this.refs.textField.refs.pasteInput.getValue())
    )), 200);
  }
}
