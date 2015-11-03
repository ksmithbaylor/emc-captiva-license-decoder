import React, { Component } from 'react';

import Summary from './sections/Summary';
import Table from './sections/Table';

import { zipObject, parseDate, formatDate } from './util';
import COLUMN_NAMES, { ENTER_BY, ISSUED, VALID, MODULE, PAGES } from './data/columnNames';
import old_license from 'raw!./data/license.lic';

export class App extends Component {
  state = {
    license: null,
    serverID: '',
    summary: false
  }

  render() {
    const display = (this.state.summary) ? (
      <Summary license={this.state.license} serverID={this.state.serverID} />
    ) : (
      <Table license={this.state.license} serverID={this.state.serverID} />
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
    this.setState(getStateFromRaw(old_license));
  }

  toggleSummary = () => {
    this.setState({ summary: !this.state.summary });
  }

  receiveFile = (event) => {
    const reader = new FileReader();
    reader.onload = e => this.setState(getStateFromRaw(reader.result));
    reader.readAsText(event.target.files[0]);
  }
}

function getStateFromRaw(text) {
  return {
    serverID: getServerID(text),
    license: convertDateFields(
      zipRowsWithColumns(
        onlyValidRows(
          splitLines(
            rawToLines(text)
          )
        )
      )
    ).sort(byModuleName).reduce(customReducingSort(), [])
  };
}

function customReducingSort() {
  const skips = [];
  const notSkipped = i => skips.indexOf(i) === -1;
  const hasNoLetters = str => !/[a-zA-z]/.test(str);
  const addSpaces = str => `   ${str}`;
  const lowerCaseEqual = (a, b) => a.toLowerCase() === b.toLowerCase();

  return (acc, next, i, orig) => {
    if (notSkipped(i)) {
      if (hasNoLetters(next[PAGES])) {
        skips.push(i);
        acc.push(next);
      }

      let nextMatchingIndex;

      while (nextMatchingIndex !== -1) {
        if (nextMatchingIndex) {
          skips.push(nextMatchingIndex);
          acc.push({
            ...orig[nextMatchingIndex],
            [MODULE]: addSpaces(orig[nextMatchingIndex][MODULE])
          });
        }

        nextMatchingIndex = orig.findIndex((potentialMatch, i) => (
          notSkipped(i) && lowerCaseEqual(potentialMatch[PAGES], next[MODULE])
        ));
      }
    }

    return acc;
  }
}

function rawToLines(text) {
  return text.split('\n').filter(line => line.indexOf('\'') !== 0);
}

function splitLines(lines) {
  return lines.map(line => line.split(';'));
}

function onlyValidRows(rows) {
  return rows.filter(line => line.length === 9);
}

function zipRowsWithColumns(grid) {
  return grid.map(row => zipObject(COLUMN_NAMES, row));
}

function convertDateFields(rows) {
  return rows.map(row => {
    [VALID, ENTER_BY, ISSUED].forEach(field => {
      row[field] = parseDate(row[field]);
    });

    return row;
  });
}

function getServerID(text) {
  const words = text.split('\n')[0].split(' ');
  return words[words.length - 1];
}

function byModuleName(a, b) {
  if (a[MODULE] < b[MODULE]) return -1;
  if (a[MODULE] > b[MODULE]) return 1;
  return 0;
}
