import React, { Component } from 'react';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';

import { processLicense, processPaste } from 'processor';

export default class InputOptions extends Component {
  state = {
    pasteModalOpen: false,
    aboutModalOpen: false
  }

  render() {
    return  (
      <div>
        <Paper zDepth={2}>
          <div style={sectionStyle}>
            <RaisedButton
              label="OPEN"
              primary={true}
              linkButton={true}
              style={buttonStyle}
            >
              <input
                type="file"
                onChange={this.receiveFile}
                style={invisibleFileInputStyle}
              />
            </RaisedButton>
            Open a license file from your computer
          </div>
          <Divider />
          <div style={sectionStyle}>
            <RaisedButton
              label="PASTE"
              primary={true}
              style={buttonStyle}
              onTouchTap={this.openPasteModal}
            />
            Copy and paste from the C4 screen
          </div>
        </Paper>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <RaisedButton label="About" onTouchTap={this.openAboutModal} />
        </div>
        <Dialog
          title="About this tool"
          open={this.state.aboutModalOpen}
          modal={false}
          actions={[
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={this.closeAboutModal}
            />
          ]}
          onRequestClose={this.closeAboutModal}
        >
          <p>CAPTIVA License Decoder (version 1.1)</p>
          <p>{'Concept and functionality by Jim Smith. Created and designed by '}
            <a href="https://www.linkedin.com/in/ksmithbaylor" target="_blank">
              Kevin Smith
            </a>.
          </p>
        </Dialog>
        <Dialog
          title="Paste a license"
          open={this.state.pasteModalOpen}
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.closePasteModal}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onTouchTap={this.receivePaste}
            />
          ]}
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

  componentDidMount() {
    this.fileReader = new FileReader();
    this.fileReader.onload = event => setTimeout((() => this.props.newResults(
      processLicense(this.fileReader.result)
    )), 200);
  }

  closePasteModal = () => this.setState({ pasteModalOpen: false })
  openPasteModal = () => this.setState({ pasteModalOpen: true })
  closeAboutModal = () => this.setState({ aboutModalOpen: false })
  openAboutModal = () => this.setState({ aboutModalOpen: true })

  receiveFile = (event) => {
    if (event.target.files[0]) {
      this.fileReader.readAsText(event.target.files[0])
    }
  }

  receivePaste = (event) => {
    this.closePasteModal();
    setTimeout((() => this.props.newResults(
      processPaste(this.refs.pasteInput.getValue())
    )), 200);
  }
}

const sectionStyle = {
  padding: '2rem'
};

const buttonStyle = {
  textAlign: 'center',
  marginRight: '2rem'
};

const invisibleFileInputStyle = {
  opacity: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  cursor: 'pointer',
  position: 'absolute',
  width: '100%'
};
