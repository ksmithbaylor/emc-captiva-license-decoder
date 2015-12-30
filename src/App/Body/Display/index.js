import React from 'react';

import Divider from 'material-ui/lib/divider';

import BackButton from './BackButton';
import Summary from './Summary';
import Table from './Table';

export default ({ modules, serverID, backToStart }) => (
  <div>
    <BackButton goBack={backToStart} />
    <br /><br />
    <Divider />
    <Summary modules={modules} serverID={serverID} />
    <Table modules={modules} serverID={serverID} />
  </div>
);
