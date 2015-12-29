import React, { Component } from 'react';

import { pageWidth } from 'data/layout';

import InputOptions from './InputOptions';
import Display from './Display';

export default class Body extends Component {
  state = {
    showResults: false,
    modules: null,
    serverID: null
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
      </div>
    )
  }

  handleNewResults = ({ modules, serverID }) => {
    this.setState({ modules, serverID, showResults: true });
  }

  backToStart = () => {
    this.setState({ showResults: false });
  }
}

const containerStyle = {
  width: pageWidth,
  marginTop: '8rem',
  marginLeft: 'auto',
  marginRight: 'auto'
};