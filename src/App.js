import React, { Component } from 'react';

import Summary from './sections/Summary';
import Table from './sections/Table';

import { zipObject, parseDate, formatDate } from './util';
import COLUMN_NAMES, { ENTER_BY, ISSUED, VALID, MODULE } from './data/columnNames';
import old_license from 'raw!./data/license.lic';

export class App extends Component {
  state = {
    license: null,
    summary: false
  }

  render() {
    const display = (this.state.summary) ? (
      <Summary license={this.state.license} />
    ) : (
      <Table license={this.state.license} />
    );

    return (
      <div>
        <input type="file" onChange={this.receiveFile}></input>
        <br />
        <button onClick={this.toggleSummary}>Toggle Summary</button>
        {display}
      </div>
    );
  }

  componentDidMount() {
    this.setState({ license: processText(old_license) });
  }

  toggleSummary = () => {
    this.setState({ summary: !this.state.summary });
  }

  receiveFile = (event) => {
    const reader = new FileReader();
    reader.onload = e => this.setState({license: processText(reader.result)});
    reader.readAsText(event.target.files[0]);
  }
}

function processText(text) {
  const lines = text.split('\n').filter(line => line.indexOf('\'') !== 0);
  const grid = lines.map(line => line.split(';')).filter(line => line.length === 9);
  const rows = grid.map(row => zipObject(COLUMN_NAMES, row));

  [ENTER_BY, ISSUED, VALID].forEach(field => (
    rows.forEach(row => {
      row[field] = parseDate(row[field]);
    })
  ));

  return rows.sort((a, b) => {
    if (a[MODULE] < b[MODULE]) return -1;
    if (a[MODULE] > b[MODULE]) return 1;
    return 0;
  });
}
