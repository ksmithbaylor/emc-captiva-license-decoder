import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

// TODO: convert all arrow-function exports to named functions
export default ({ open, closeMe }) => {
  const okButton = (
    <FlatButton
      label="OK"
      primary={true}
      onTouchTap={closeMe}
    />
  );

  return (
    <Dialog
      title="Error"
      open={open}
      actions={[ okButton ]}
      modal={false}
      onRequestClose={closeMe}
    >
      The input was invalid.
    </Dialog>
  );
}
