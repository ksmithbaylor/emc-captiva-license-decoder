import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import PasteHandler from './PasteHandler';

export default class PasteInput extends React.Component {
  state = {
    handlerIsOpen: false
  }

  render() {
    const { styles, requestResults } = this.props;

    return (
      <div style={styles.sectionStyle}>
        <RaisedButton
          label="PASTE"
          primary={true}
          style={styles.buttonStyle}
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

  openHandler = () => this.setState({ handlerIsOpen: true })
  closeHandler = () => this.setState({ handlerIsOpen: false })
}
