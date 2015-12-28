import React, { Component } from 'react';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';

import { processLicense, processPastedLicense } from 'processor';

export default class InputOptions extends Component {
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
            <RaisedButton label="PASTE" secondary={true} style={buttonStyle} />
            Copy and paste from the C4 screen
          </div>
        </Paper>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <RaisedButton label="Display Help" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fileReader = new FileReader();
    this.fileReader.onload = event => this.props.newResults(
      processLicense(this.fileReader.result)
    );
  }

  receiveFile = (event) => {
    if (event.target.files[0]) {
      this.fileReader.readAsText(event.target.files[0])
    }
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
