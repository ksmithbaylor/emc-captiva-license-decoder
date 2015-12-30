import React from 'react';
import { pageWidth } from 'data/layout';
import Display from './Display';
import InputOptions from './InputOptions';
import AboutButton from './AboutButton';
import ErrorDialog from './ErrorDialog';

export default class Body extends React.Component {
  state = {
    showResults: false,
    errorDialogOpen: false,
    modules: null,
    serverID: null
  }

  render() {
    const { modules, serverID, showResults, errorDialogOpen } = this.state;

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
        <AboutButton />
        <ErrorDialog open={errorDialogOpen} closeMe={this.closeErrorDialog} />
      </div>
    );
  }

  backToStart = () => this.setState({ showResults: false })
  closeErrorDialog = () => this.setState({ errorDialogOpen: false })

  handleNewResults = ({ modules, serverID }) => {
    if (!modules || !serverID || modules.length === 0 || modules.error) {
      this.setState({ errorDialogOpen: true });
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
