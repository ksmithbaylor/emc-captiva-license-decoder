import React from 'react';

import { NAME, CONNECTIONS, PAGES, FEATURES, VALID } from 'data/columnNames';
import { hasLetters, numberWithCommas } from 'util';

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
            'Page Volume (PPY)',
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
            'Attended Clients',
            attendClients(modules)
          )}
          {row(
            'ScanPlus (standard)',
            scanPlus(modules, false)
          )}
          {row(
            'ScanPlus (premium)',
            scanPlus(modules, true)
          )}
          {row(
            'Major Exporters',
            majorExporters(modules)
          )}
        </tbody>
      </table>
    </div>
  )
);

function row(title, value) {
  return (
    <tr>
      <td style={{ fontWeight: 'bold' }}>
        {title}:
      </td>
      <td style={{ paddingLeft: '1em' }}>
        {hasLetters(value) ? value : numberWithCommas(value)}
      </td>
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
  // TODO if any of them are 0, means unlimited
  return sumOf(PAGES, modules.filter(withName('ANNUAL')));
}

function advancedRecognitionVolume(modules) {
  // TODO if 0, means unlimited for either one
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
  return sumOf(CONNECTIONS, modules.filter(withName('GROUP4')));
}

function scanPlus(modules, premium) {
  // TODO if any SCANPLUS present with 0 in the connections, then it means
  // unlimited
  return sumOf(
    CONNECTIONS,
    modules.filter(withName('SCANPLUS'))
           .filter(notExpired)
           .filter(withFeature(premium ? 'D' : 'C'))
  );
}

function majorExporters(modules) {
  const exporterMappings = {
    'EMC': [ 'EXAX', 'IAEXDM' ],
    'IBM + FileNet': [ 'IAXNET2', 'EXFNCM', 'IAEXVI', 'IAEXFAF', 'EXICM', 'EXCSSAP' ],
    'SharePoint': [ 'EXSHRPT2' ],
    'GLOBAL360': [ 'IAEXWNT' ],
    'OPENTEXT LIVELINK': [ 'EXLL2' ],
    'SAP Archive and AP Connect': [ 'EXSAPAL', 'ASISAP' ]
  };


  return Object.keys(exporterMappings).filter(exporter => (
    exporterMappings[exporter].some(name => (
      modules.find(withName(name))
    ))
  )).join('\n');
}

function withName(name) {
  return module => module[NAME].toLowerCase().includes(name.toLowerCase());
}

function withFeature(code) {
  return module => new RegExp(code).test(module[FEATURES]);
}

function sumOf(column, modules) {
  return modules.map(module => parseInt(module[column])).reduce((a, b) => a + b, 0);
}

function notExpired(module) {
  return !module[VALID] || (module[VALID] > new Date());
}
