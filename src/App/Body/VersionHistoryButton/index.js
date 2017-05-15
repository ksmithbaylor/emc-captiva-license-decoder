import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import versionHistory from './history.md';

export default class AboutButton extends React.Component {
  state = {
    dialogIsOpen: false
  };

  render() {
    const okButton = (
      <FlatButton
        label="OK"
        primary
        onTouchTap={this.closeDialog}
      />
    );

    return (
      <div style={style.container}>
        <RaisedButton
          label="Version History"
          onTouchTap={this.openDialog}
        />
        <Dialog
          title="Version History"
          open={this.state.dialogIsOpen}
          actions={[okButton]}
          onRequestClose={this.closeDialog}
          modal={false}
          autoScrollBodyContent
        >
          <div dangerouslySetInnerHTML={{ __html: versionHistory }} />
        </Dialog>
      </div>
    );
  }

  closeDialog = () => this.setState({ dialogIsOpen: false });
  openDialog = () => this.setState({ dialogIsOpen: true });
}

const style = {
  container: {
    display: 'inline-block',
    marginLeft: '0.5em'
  }
};
