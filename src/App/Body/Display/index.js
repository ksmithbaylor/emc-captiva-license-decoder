import React from 'react';

import Summary from './Summary';
import Table from './Table';

export default ({ modules, serverID }) => (
  <div>
    <Summary modules={modules} serverID={serverID} />
    <Table modules={modules} serverID={serverID} />
  </div>
);
