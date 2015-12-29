import React, { Component } from 'react';
import request from 'superagent';

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
    helpModalOpen: false,
    helpText: null
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
          <RaisedButton label="Display Help" onTouchTap={this.openHelpModal} />
        </div>
        <Dialog
          title="How to use this tool"
          open={this.state.helpModalOpen}
          modal={false}
          actions={[
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={this.closeHelpModal}
            />
          ]}
          onRequestClose={this.closeHelpModal}
        >
          <span style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.helpText ? this.state.helpText : 'Loading...'}
          </span>
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
          While viewing the license in C4, press Ctrl+A and then Ctrl+C to
          select all the text on the page. Then, press Ctrl+V in the text
          box below.
          <TextField
            ref="pasteInput"
            multiLine={true}
            rows={3}
            rowsMax={3}
            fullWidth={true}
            onEnterKeyDown={this.receivePaste}
            autoFocus
            underlineFocusStyle={{ borderColor: '#2c95dd' }}
            style={{ marginTop: '1rem', backgroundColor: '#f0f0f0' }}
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

    request('/help.txt', (err, res) => {
      this.setState({ helpText: res.text });
    });
  }

  closePasteModal = () => this.setState({ pasteModalOpen: false })
  openPasteModal = () => this.setState({ pasteModalOpen: true })
  closeHelpModal = () => this.setState({ helpModalOpen: false })
  openHelpModal = () => this.setState({ helpModalOpen: true })

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
