import React from 'react';
import { processPaste } from 'processor';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';

export default class PasteInput extends React.Component {
  state = {
    pasteModalOpen: false
  }

  render() {
    const { sectionStyle, buttonStyle } = this.props;

    const cancelButton = (
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closePasteModal}
      />
    );

    const submitButton = (
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.receivePaste}
      />
    );

    return (
      <div style={sectionStyle}>
        <RaisedButton
          label="PASTE"
          primary={true}
          style={buttonStyle}
          onTouchTap={this.openPasteModal}
        />
        Copy and paste from the C4 screen
        <Dialog
          title="Paste a license"
          open={this.state.pasteModalOpen}
          actions={[ cancelButton, submitButton ]}
          modal={false}
          onRequestClose={this.closePasteModal}
        >
          While viewing the license in C4, press Ctrl+A (to select all text)
          and then Ctrl+C (to copy to the clipboard).  Navigate to this
          screen’s text box below, then press Ctrl-V (to paste the license
          file into the box) and click the SUBMIT button below or press the
          Enter key.
          <TextField
            ref="pasteInput"
            multiLine={true}
            rows={1}
            rowsMax={5}
            fullWidth={true}
            onEnterKeyDown={this.receivePaste}
            autoFocus
            hintText="Paste clipboard here"
            hintStyle={{ marginLeft: '5px' }}
            underlineStyle={{ bottom: 0, borderColor: '#a0a0a0' }}
            underlineFocusStyle={{ borderColor: '#2c95dd' }}
            style={{ marginTop: '1rem', border: '1px solid #a0a0a0', borderBottom: 'none', verticalAlign: 'top' }}
          />
        </Dialog>
      </div>
    );
  }

  openPasteModal = () => this.setState({ pasteModalOpen: true })
  closePasteModal = () => this.setState({ pasteModalOpen: false })

  receivePaste = (event) => {
    this.closePasteModal();
    setTimeout((() => this.props.requestResults(
      processPaste(this.refs.pasteInput.getValue())
    )), 200);
  }
}
