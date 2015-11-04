import React from 'react';

import { NAME, PAGES, FEATURES } from '../data/columnNames';

export default ({ modules, serverID }) => (
  (!modules || !serverID) ? (
    <span></span>
  ) : (
    <div>
      <h2>Captiva Capture License ID: {serverID}</h2>
      <table style={{ border: 'none' }}>
        <tbody>
          {row(
            'Server Type',
            isEnterprise(modules) ? 'Enterprise' : 'Standard'
          )}
          {row(
            'Page Volume',
            pageVolume(modules)
          )}
        </tbody>
      </table>
    </div>
  )
);

function row(title, value) {
  return (
    <tr>
      <td style={{ fontWeight: 'bold' }}>{title}:</td>
      <td style={{ paddingLeft: '1em' }}>{value}</td>
    </tr>
  )
}

function isEnterprise(modules) {
  const serverModule = modules.find(module => module[NAME].includes('SERVER'));

  const hasFeatures = /[CDEFSW]/.test(serverModule[FEATURES]);
  const hasModules = modules.some(module => (
    ['DPMANAGER', 'WSINPUT', 'WSOUTPUT', 'ECOPY'].some(name => (
      module[NAME].includes(name)
    ))
  ));

  return hasFeatures || hasModules;
}

function pageVolume(modules) {
  return modules.filter(
    module => module[NAME].includes('ANNUAL')
  ).map(
    module => module[PAGES]
  ).reduce((a, b) => (
    parseInt(a) + parseInt(b)
  ), 0);
}
