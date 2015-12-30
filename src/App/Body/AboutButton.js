import React from 'react';
import { version } from 'root/package.json';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

export default class AboutButton extends React.Component {
  state = {
    dialogIsOpen: false
  }

  render() {
    const okButton = (
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.closeDialog}
      />
    );

    return (
      <div style={containerStyle}>
        <RaisedButton
          label="About"
          onTouchTap={this.openDialog}
        />
        <Dialog
          title="About this tool"
          open={this.state.dialogIsOpen}
          actions={[ okButton ]}
          onRequestClose={this.closeDialog}
          modal={false}
        >
          <p>CAPTIVA License Decoder (version {version})</p>
          <p>
            {'Concept and functionality by Jim Smith. Created and designed by '}
            <a href="https://www.linkedin.com/in/ksmithbaylor" target="_blank">
              Kevin Smith
            </a>.
          </p>
        </Dialog>
      </div>
    );
  }

  closeDialog = () => this.setState({ dialogIsOpen: false })
  openDialog = () => this.setState({ dialogIsOpen: true })
}

const containerStyle = {
  margin: '2rem 0',
  textAlign: 'center'
};