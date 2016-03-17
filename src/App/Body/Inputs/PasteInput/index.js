import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import PasteHandler from './PasteHandler';

export default class PasteInput extends React.Component {
  static propTypes = {
    style: React.PropTypes.shape({
      section: React.PropTypes.object,
      button: React.PropTypes.object
    }),
    requestResults: React.PropTypes.func
  };

  state = {
    handlerIsOpen: false
  };

  render() {
    const { style, requestResults } = this.props;

    return (
      <div style={style.section}>
        <RaisedButton
          label="PASTE"
          primary
          style={style.button}
          onTouchTap={this.openHandler}
        />
        <PasteHandler
          open={this.state.handlerIsOpen}
          closeMe={this.closeHandler}
          requestResults={requestResults}
        />
        Copy and paste from the C4 screen
      </div>
    );
  }

  openHandler = () => this.setState({ handlerIsOpen: true });
  closeHandler = () => this.setState({ handlerIsOpen: false });
}
