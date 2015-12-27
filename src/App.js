import React, { Component } from 'react';

import Summary from './sections/Summary';
import Table from './sections/Table';
import Header from './Header';

import { processLicense, processPaste } from './licenseProcessor';

export default class App extends Component {
  static propTypes = {}

  state = {
    summary: false,
    results: null
  }

  render() {
    const { summary, results } = this.state;
    const View = summary ? Summary : Table;

    const mainViewMarkup = results ? (
      <View {...results} />
    ) : (
      <div></div>
    );

    return (
      <div style={{ marginTop: 80 }}>
        <Header />
        <br />
        <textarea onChange={this.receivePaste} />
        <br />
        <input type="file" onChange={this.receiveFile} />
        <br />
        <button onClick={e => this.setState({ summary: !summary })}>
          {summary ? 'Back to Listing' : 'Summary View'}
        </button>
        {mainViewMarkup}
      </div>
    );
  }

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onload = e => this.setState({ results: processLicense(this.reader.result) });
  }

  receiveFile = (event) => {
    if (event.target.files[0]) {
      this.reader.readAsText(event.target.files[0]);
    }
  }

  receivePaste = (event) => {
    this.setState({ results: processPaste(event.target.value) });
  }
}
