import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default ({ open, closeMe }) => (
  <Dialog
    title="Error"
    open={open}
    actions={[
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.closeErrorModal}
      />
    ]}
    modal={false}
    onRequestClose={closeMe}
  >
    The input was invalid.
  </Dialog>
);
