import React from 'react';
import colors from 'data/colors';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Header from './Header';
import Body from './Body';

@ThemeDecorator(ThemeManager.getMuiTheme({
  palette: { accent1Color: colors.emc.blue.logo }
}))
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}
