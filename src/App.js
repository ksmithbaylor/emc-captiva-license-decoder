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
          {summary ? 'Back to Listing' : 'Summary View'}
        </button>
        {rawFile ? (
          <View {...processLicense(rawFile)} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onload = e => this.setState({ rawFile: this.reader.result });
  }

  receiveFile = (event) => {
    if (event.target.files[0]) {
      this.reader.readAsText(event.target.files[0]);
    }
  }
}
