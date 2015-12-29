import React, { Component } from 'react';

import { pageWidth } from 'data/layout';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import InputOptions from './InputOptions';
import Display from './Display';

export default class Body extends Component {
  state = {
    showResults: false,
    modules: null,
    serverID: null,
    errorModalOpen: false
  }

  render() {
    const { modules, serverID, showResults } = this.state;

    const viewMarkup = showResults ? (
      <Display
        modules={modules}
        serverID={serverID}
        backToStart={this.backToStart}
      />
    ) : (
      <InputOptions
        newResults={this.handleNewResults}
      />
    );

    return (
      <div style={containerStyle}>
        {viewMarkup}
        <Dialog
          title="Error"
          open={this.state.errorModalOpen}
          modal={false}
          actions={[
            <FlatButton
              label="OK"
              primary={true}
              onTouchTap={this.closeErrorModal}
            />
          ]}
          onRequestClose={this.closeErrorModal}
        >
          The input was invalid.
        </Dialog>
      </div>
    )
  }

  handleNewResults = ({ modules, serverID }) => {
    if (!modules || !serverID || modules.length === 0 || modules.error) {
      this.setState({ errorModalOpen: true });
    } else {
      this.setState({ modules, serverID, showResults: true });
    }
  }

  backToStart = () => {
    this.setState({ showResults: false });
  }

  closeErrorModal = () => {
    this.setState({ errorModalOpen: false });
  }
}

const containerStyle = {
  width: pageWidth,
  marginTop: '8rem',
  marginLeft: 'auto',
  marginRight: 'auto'
};
