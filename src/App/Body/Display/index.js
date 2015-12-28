import React from 'react';

import BackButton from './BackButton';
import Summary from './Summary';
import Table from './Table';

export default ({ modules, serverID, backToStart }) => (
  <div>
    <BackButton onTouchTap={backToStart} />
    <Summary modules={modules} serverID={serverID} />
    <Table modules={modules} serverID={serverID} />
  </div>
);
