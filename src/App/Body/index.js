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
      <Display modules={modules} serverID={serverID} />
    ) : (
      <InputOptions />
    );

    return (
      <div style={containerStyle}>
        {viewMarkup}
      </div>
    )
  }

  switchView = () => {
    this.setState({ showResults: !this.state.showResults });
  }
}

const containerStyle = {
  width: pageWidth,
  margin: '3rem auto'
};
