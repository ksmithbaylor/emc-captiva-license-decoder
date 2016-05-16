import React from 'react';
import { pageWidth } from 'data/constants';
import Display from './Display';
import Inputs from './Inputs';
import AboutButton from './AboutButton';
import BugReportButton from './BugReportButton';
import ErrorDialog from './ErrorDialog';

export default class Body extends React.Component {
  state = {
    showResults: false,
    errorDialogOpen: false,
    modules: null,
    serverID: null
  };

  render() {
    const { modules, serverID, showResults, errorDialogOpen } = this.state;

    const mainViewMarkup = showResults ? (
      <Display
        modules={modules}
        serverID={serverID}
        backToStart={this.backToStart}
      />
    ) : (
      <Inputs requestResults={this.handleNewResults} />
    );

    return (
      <div style={style.container}>
        {mainViewMarkup}
        <div style={style.buttons}>
          <AboutButton />
          <BugReportButton />
        </div>
        <ErrorDialog open={errorDialogOpen} closeMe={this.closeErrorDialog} />
      </div>
    );
  }

  backToStart = () => this.setState({ showResults: false });
  closeErrorDialog = () => this.setState({ errorDialogOpen: false });

  handleNewResults = ({ modules, serverID }) => {
    if (!modules || !serverID || modules.length === 0 || modules.error) {
      this.setState({ errorDialogOpen: true });
    } else {
      this.setState({ modules, serverID, showResults: true });
    }
  };
}

const style = {
  container: {
    width: pageWidth,
    marginTop: '8rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttons: {
    margin: '2rem 0',
    textAlign: 'center'
  }
};
