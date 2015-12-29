import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import request from 'superagent';

import Paper from 'material-ui/lib/paper';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import { isUnlimited, isExpired, hasExpiry, isDateField, formatDate, numberWithCommas } from 'util';
import COLUMN_NAMES, { VALID, NAME, CODE, DISABLES } from 'data/columnNames';

let functions = {};
request('/src/data/functions.json', (err, res) => {
  functions = res.body;
});

const columnsToDisplay = COLUMN_NAMES.filter(name => name !== CODE && name !== DISABLES);
columnsToDisplay.splice(1, 0, 'Function');

export default class DisplayTable extends Component {
  state = {
    height: getTableHeight()
  }

  render() {
    const { modules, serverID } = this.props;
    const { height } = this.state;

    return (!modules || !serverID) ? (
      <span></span>
    ) : (
      <Paper zDepth={2} style={{ marginTop: '1rem', display: 'inline-block' }}>
        <Table
          ref="mainTable"
          height={height}
          selectable={false}
          fixedHeader={true}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={headerStyle}>
              {columnsToDisplay.map((column, i) => (
                <TableRowColumn style={{ overflow: 'visible', textAlign: 'center', whiteSpace: 'normal', fontSize: '1rem', padding: 0 }} key={i}>
                  {column}
                </TableRowColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {modules.map((module, i) => (
              <TableRow style={rowStyle(module)} key={i}>
                {columnsToDisplay.map((column, i) => (
                  <TableRowColumn style={cellStyle(module, column)} key={i}>
                    {cellContents(module, column)}
                  </TableRowColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  componentDidMount() {
    this.lastViewportHeight = window.innerHeight;
    this.resizeListener = window.addEventListener('resize', this.onResize);

    this.paper = findDOMNode(this);
    this.tableBody = findDOMNode(this.refs.mainTable.refs.tableDiv);
    this.tableBody.style.overflow = 'hidden';
    window.tableBody = this.tableBody;
    this.wasVisible = false;
    this.scrollListener = window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = () => {
    console.timeStamp('scroll handler');
    const elemBottom = this.paper.getBoundingClientRect().bottom;
    const isVisible = elemBottom <= window.innerHeight;

    if (isVisible && !this.wasVisible) {
      console.log('trying to start scrolling');
      this.wasVisible = true;
      this.tableBody.style.overflow = 'inherit';
    } else if (!isVisible && this.wasVisible) {
      console.log('trying to stop scrolling');
      this.wasVisible = false;
      this.tableBody.style.overflow = 'hidden';
    }
    console.timeEnd('scroll handler');
  }

  onResize = () => {
    if (this.lastViewportHeight !== window.innerHeight) {
      this.setState({
        height: getTableHeight()
      });
    }
  }
}

function getTableHeight() {
  const viewPortHeightPx = window.innerHeight;
  const rootFontSizePx = parseInt(window.getComputedStyle(document.querySelector(':root')).fontSize)
  const viewPortHeightRem = viewPortHeightPx / rootFontSizePx;
  return (viewPortHeightRem - 10) + 'rem';
}

function cellContents(module, column) {
  if (isDateField(column)) return formatDate(module[column]);
  if (isUnlimited(column) && module[column === '0']) return 'Unlimited';
  if (column === 'Function') return functions[module[NAME]];
  return numberWithCommas(module[column]);
}

const headerStyle = {
  backgroundColor: '#00406E',
  color: '#ffffff'
};

function rowStyle(module) {
  return isExpired(module) ? {
    color: '#B71C1C',
    backgroundColor: '#FFCDD2'
  } : hasExpiry(module) ? {
    color: '#1B5E20',
    backgroundColor: '#C8E6C9'
  } : {};
}

function cellStyle(module, column) {
  const isIndented = module[NAME].startsWith(' ');

  return {
    whiteSpace: isIndented ? 'pre' : 'pre-wrap',
    overflow: 'visible',
    height: '1.5rem',
    fontWeight: (column === VALID) ? 'bold' : 'inherit',
    textAlign: (column === CODE || column === NAME) ? 'left' : 'center',
    backgroundColor: (column === NAME) ? (
      isIndented ? '#B6E0FE' : '#60B3EE'
    ) : undefined,
    color: (column === NAME) ? '#000000' : undefined
  };
}
