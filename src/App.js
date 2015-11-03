import React, { Component } from 'react';

import Summary from './sections/Summary';
import Table from './sections/Table';

import { processLicense } from './licenseProcessor';

export class App extends Component {
  state = {
    summary: false,
    rawFile: null
  }

  render() {
    const { summary, rawFile } = this.state;
    const View = summary ? Summary : Table;

    return (
      <div>
        <input type="file" onChange={this.receiveFile}></input>
        <br />
        <button onClick={e => this.setState({ summary: !summary })}>
          Toggle Summary
        </button>
        {rawFile ? (
          <View {...processLicense(rawFile)} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  receiveFile = (event) => {
    const reader = new FileReader();
    reader.onload = e => this.setState({ rawFile: reader.result });
    reader.readAsText(event.target.files[0]);
  }
}
