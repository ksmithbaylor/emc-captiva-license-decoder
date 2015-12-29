import React from 'react';

import Paper from 'material-ui/lib/paper';

import { NAME, CONNECTIONS, PAGES, FEATURES, VALID } from 'data/columnNames';
import { hasLetters, numberWithCommas } from 'util';

export default ({ modules, serverID }) => (
  (!modules || !serverID) ? (
    <span></span>
  ) : (
    <Paper zDepth={2} style={{ marginTop: '1rem', padding: '1rem' }}>
      <h2 style={{ marginTop: 0, color: '#00406E', textAlign: 'center' }}>Summary for License #{serverID}</h2>
      <table style={{ borderStyle: 'hidden', borderCollapse: 'collapse', margin: '0 auto' }}>
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
    </Paper>
  )
);

function row(title, value) {
  return (
    <tr style={{ border: '1px solid #e0e0e0' }}>
      <td style={{ fontWeight: 'bold', verticalAlign: 'top', padding: '0.25rem 1rem' }}>
        {title}:
      </td>
      <td style={{ padding: '0.25rem 1rem' }}>
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
  const annuals = modules.filter(withName('ANNUAL'));
  return annuals.some(a => a[PAGES] == '0')
    ? 'Unlimited'
    : sumOf(PAGES, annuals);
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
  )).map((str, i) => <div key={i}>{str}</div>)
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
