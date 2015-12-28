import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

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

export default class DisplayTable extends Component {
  state = {
    scrollingAllowed: false,
    height: getTableHeight()
  }

  render() {
    const { modules, serverID } = this.props;
    const { scrollingAllowed, height } = this.state;

    return (!modules || !serverID) ? (
      <span></span>
    ) : (
      <Paper zDepth={2} style={{ marginTop: '1rem', display: 'inline-block' }}>
        <Table
          height={height}
          selectable={false}
          fixedHeader={true}
          bodyStyle={{ overflow: scrollingAllowed ? 'inherit' : 'hidden' }}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={headerStyle}>
              {onlyCertainColumns.map((column, i) => (
                <TableRowColumn style={{ overflow: 'visible', textAlign: 'center', whiteSpace: 'normal', fontSize: '1rem', padding: 0 }} key={i}>
                  {column}
                </TableRowColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {modules.map((module, i) => (
              <TableRow style={rowStyle(module)} key={i}>
                {onlyCertainColumns.map((column, i) => (
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
    let lastViewportHeight = window.innerHeight;
    window.addEventListener('resize', event => {
      if (lastViewportHeight !== window.innerHeight) {
        this.setState({
          height: getTableHeight()
        });
      }
    });

    const paper = findDOMNode(this);
    let wasVisible = false;
    window.addEventListener('scroll', event => {
      const elemBottom = paper.getBoundingClientRect().bottom;
      const isVisible = elemBottom <= window.innerHeight;

      if (isVisible && !wasVisible) {
        wasVisible = true;
        this.setState({ scrollingAllowed: true });
      } else if (!isVisible && wasVisible) {
        wasVisible = false;
        this.setState({ scrollingAllowed: false });
      }
    });
  }
}

function getTableHeight() {
  const viewPortHeightPx = window.innerHeight;
  const rootFontSizePx = parseInt(window.getComputedStyle(document.querySelector(':root')).fontSize)
  const viewPortHeightRem = viewPortHeightPx / rootFontSizePx;
  return (viewPortHeightRem - 10) + 'rem';
}

const onlyCertainColumns = COLUMN_NAMES.filter(name => name !== CODE && name !== DISABLES);

function cellContents(module, column) {
  return isDateField(column) ? (
    formatDate(module[column])
  ) : (isUnlimited(column) && module[column] === '0') ?
    'Unlimited' : numberWithCommas(module[column]);
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
  return {
    whiteSpace: 'pre',
    fontWeight: (column === VALID) ? 'bold' : 'inherit',
    textAlign: (column === CODE || column === NAME) ? 'left' : 'center',
    backgroundColor: (column === NAME) ? (
      (module[NAME].startsWith(' ')) ? '#B6E0FE' : '#60B3EE'
    ) : undefined,
    color: (column === NAME) ? '#000000' : undefined
  };
}
