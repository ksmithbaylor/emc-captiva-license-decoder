import React from 'react';

import Divider from 'material-ui/lib/divider';

import BackButton from './BackButton';
import Summary from './Summary';
import Table from './Table';

export default ({ modules, serverID, backToStart }) => (
  <div>
    <div>
      <BackButton onTouchTap={backToStart} />
      <span style={{ marginLeft: '2rem', fontSize: '1.5rem', verticalAlign: 'middle', display: 'inline-block' }}>
        License ID: {serverID}
      </span>
    </div>
    <br />
    <Divider />
    <Summary modules={modules} serverID={serverID} />
    <Table modules={modules} serverID={serverID} />
  </div>
);
