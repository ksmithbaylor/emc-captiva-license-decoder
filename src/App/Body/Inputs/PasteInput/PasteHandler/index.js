import React from 'react';
import { processLicensePaste } from 'util';
import { processingDelay } from 'data/constants';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import PasteTextField from './PasteTextField';

export default class PasteHandler extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    closeMe: React.PropTypes.func.isRequired,
    requestResults: React.PropTypes.func.isRequired
  }

  render() {
    const cancelButton = (
      <FlatButton label="Cancel" primary onTouchTap={this.props.closeMe} />
    );

    const submitButton = (
      <FlatButton label="Submit" primary onTouchTap={this.handlePaste} />
    );

    return (
      <Dialog
        title="Paste a license"
        open={this.props.open}
        actions={[cancelButton, submitButton]}
        onRequestClose={this.props.closeMe}
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

  handlePaste = () => {
    this.props.closeMe();
    setTimeout(() => {
      this.props.requestResults(
        processLicensePaste(this.refs.textField.refs.pasteInput.getValue())
      );
    }, processingDelay);
  }
}
