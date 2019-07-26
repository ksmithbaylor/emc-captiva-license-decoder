import React from 'react';
import Divider from 'material-ui/lib/divider';
import BackButton from './BackButton';
import Summary from './Summary';
import Modules from './Modules';

export default function Display({ modules, serverID, backToStart }) {
  return (
    <div>
      <BackButton goBack={backToStart} />
      <br className="print-hidden" />
      <br className="print-hidden" />
      <Divider className="print-hidden" />
      <Summary modules={modules} serverID={serverID} />
      <Modules modules={modules} />
    </div>
  );
}
