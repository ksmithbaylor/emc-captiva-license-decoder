import React, { Component } from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

import Header from './Header';
import Body from './Body';

@ThemeDecorator(ThemeManager.getMuiTheme({ palette: { accent1Color: '#2c95dd' } }))
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}
