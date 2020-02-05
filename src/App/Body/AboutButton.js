import React from 'react';
import { version } from 'root/package.json';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

export default class AboutButton extends React.Component {
  state = {
    dialogIsOpen: false
  };

  render() {
    const okButton = (
      <FlatButton
        label="OK"
        primary
        onTouchTap={this.closeDialog}
      />
    );

    return (
      <div style={style.container}>
        <RaisedButton
          label="About"
          onTouchTap={this.openDialog}
        />
        <Dialog
          title="About this tool"
          open={this.state.dialogIsOpen}
          actions={[okButton]}
          onRequestClose={this.closeDialog}
          modal={false}
        >
          <p>Intelligent Capture License Decoder (version {version})</p>
          <p>
            {'Concept and specifications by Jim Smith. Designed and implemented by '}
            <a href="https://www.linkedin.com/in/ksmithbaylor" target="_blank">
              Kevin Smith
            </a>.
          </p>
        </Dialog>
      </div>
    );
  }

  closeDialog = () => this.setState({ dialogIsOpen: false });
  openDialog = () => this.setState({ dialogIsOpen: true });
}

const style = {
  container: {
    display: 'inline-block',
    marginRight: '0.5em'
  }
};
