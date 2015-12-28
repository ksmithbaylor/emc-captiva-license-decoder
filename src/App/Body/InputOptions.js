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
    pasteModalOpen: false
  }

  render() {
    return  (
      <div>
        <Paper zDepth={2}>
          <div style={sectionStyle}>
            <RaisedButton label="OPEN" primary={true} style={buttonStyle}>
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
              secondary={true}
              style={buttonStyle}
              onTouchTap={this.openPasteModal}
            />
            Copy and paste from the C4 screen
          </div>
        </Paper>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <RaisedButton label="Display Help" />
        </div>
        <Dialog
          title="Paste a license"
          open={this.state.pasteModalOpen}
          actions={[
            <FlatButton
              label="Cancel"
              secondary={true}
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
            multiline={true}
            rows={2}
            fullWidth={true}
            onEnterKeyDown={this.receivePaste}
            style={{ marginTop: '1rem', backgroundColor: '#f0f0f0' }}
          />
        </Dialog>
      </div>
    );
  }

  componentDidMount() {
    this.fileReader = new FileReader();
    this.fileReader.onload = event => this.props.newResults(
      processLicense(this.fileReader.result)
    );
  }

  closePasteModal = () => this.setState({ pasteModalOpen: false })
  openPasteModal = () => this.setState({ pasteModalOpen: true })

  receiveFile = (event) => {
    if (event.target.files[0]) {
      this.fileReader.readAsText(event.target.files[0])
    }
  }

  receivePaste = (event) => {
    this.closePasteModal();
    this.props.newResults(
      processPaste(this.refs.pasteInput.getValue())
    );
  }
}

const sectionStyle = {
  padding: '2rem'
};

const buttonStyle = {
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
