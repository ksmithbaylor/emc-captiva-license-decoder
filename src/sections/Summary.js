import React from 'react';

import { NAME, COPIES, PAGES, FEATURES } from '../data/columnNames';

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
          {row(
            'Advanced Recognition Volume',
            advancedRecognitionVolume(modules)
          )}
          {row(
            'Production Auto Learning',
            productionAutoLearning(modules)
          )}
          {row(
            'Attend Clients',
            attendClients(modules)
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
  );
}

function isEnterprise(modules) {
  const serverModule = modules.find(withName('SERVER'));

  const hasFeatures = /[CDEFSW]/.test(serverModule[FEATURES]);
  const hasModules = ['DPMANAGER', 'WSINPUT', 'WSOUTPUT', 'ECOPY'].some(name => (
    modules.some(withName(name))
  ));

  return hasFeatures || hasModules;
}

function pageVolume(modules) {
  return sumOf(PAGES, modules.filter(withName('ANNUAL')));
}

function advancedRecognitionVolume(modules) {
  const classifs = modules.filter(withName('CLASSIF'));
  const extracts = modules.filter(withName('EXTRACT'));

  return (classifs.length > 0 || extracts.length > 0) ? (
    Math.max(sumOf(PAGES, classifs), sumOf(PAGES, extracts))
  ) : 0;
}

function productionAutoLearning(modules) {
  return modules.find(withName('DPCOLLEC')) ? 'Yes' : 'No';
}

function attendClients(modules) {
  return sumOf(COPIES, modules.filter(withName('GROUP4')));
}

function withName(name) {
  return module => module[NAME].toLowerCase().includes(name.toLowerCase());
}

function sumOf(column, modules) {
  return modules.map(module => parseInt(module[column])).reduce((a, b) => a + b, 0);
}
