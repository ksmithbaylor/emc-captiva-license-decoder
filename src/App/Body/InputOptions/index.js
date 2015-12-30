import React from 'react';
import { version } from 'root/package.json';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FileInput from './FileInput';
import PasteInput from './PasteInput';

export default class InputOptions extends React.Component {
  state = {
    aboutModalOpen: false
  }

  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <FileInput
            requestResults={this.props.newResults}
            styles={{ sectionStyle, buttonStyle }}
          />
          <Divider />
          <PasteInput
            requestResults={this.props.newResults}
            styles={{ sectionStyle, buttonStyle }}
          />
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
          <p>CAPTIVA License Decoder (version {version})</p>
          <p>{'Concept and functionality by Jim Smith. Created and designed by '}
            <a href="https://www.linkedin.com/in/ksmithbaylor" target="_blank">
              Kevin Smith
            </a>.
          </p>
        </Dialog>
      </div>
    );
  }

  closeAboutModal = () => this.setState({ aboutModalOpen: false })
  openAboutModal = () => this.setState({ aboutModalOpen: true })
}

const sectionStyle = {
  padding: '2rem'
};

const buttonStyle = {
  textAlign: 'center',
  marginRight: '2rem'
};
