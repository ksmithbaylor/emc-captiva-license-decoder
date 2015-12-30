import React from 'react';
import { pageWidth } from 'data/layout';
import InputOptions from './InputOptions';
import Display from './Display';
import ErrorDialog from './ErrorDialog';

export default class Body extends React.Component {
  state = {
    showResults: false,
    errorModalOpen: false,
    modules: null,
    serverID: null
  }

  render() {
    const { modules, serverID, showResults, errorModalOpen } = this.state;

    const mainViewMarkup = showResults ? (
      <Display
        modules={modules}
        serverID={serverID}
        backToStart={this.backToStart}
      />
    ) : (
      <InputOptions newResults={this.handleNewResults} />
    );

    return (
      <div style={containerStyle}>
        {mainViewMarkup}
        <ErrorDialog open={errorModalOpen} closeMe={this.closeErrorModal} />
      </div>
    );
  }

  backToStart = () => this.setState({ showResults: false })
  closeErrorModal = () => this.setState({ errorModalOpen: false })

  handleNewResults = ({ modules, serverID }) => {
    if (!modules || !serverID || modules.length === 0 || modules.error) {
      this.setState({ errorModalOpen: true });
    } else {
      this.setState({ modules, serverID, showResults: true });
    }
  }
}

const containerStyle = {
  width: pageWidth,
  marginTop: '8rem',
  marginLeft: 'auto',
  marginRight: 'auto'
};
