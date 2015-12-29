import React from 'react';

import { pageWidth } from 'data/layout';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import InputOptions from './InputOptions';
import Display from './Display';

export default class Body extends React.Component {
  state = {
    showResults: false,
    errorModalOpen: false,
    modules: null,
    serverID: null
  }

  render() {
    const { modules, serverID, showResults, errorModalOpen } = this.state;

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

    const okButtonMarkup = (
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.closeErrorModal}
      />
    );

    return (
      <div
        style={{
          width: pageWidth,
          marginTop: '8rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        {viewMarkup}
        <Dialog
          title="Error"
          open={errorModalOpen}
          modal={false}
          actions={ [okButtonMarkup] }
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
