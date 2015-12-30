import React from 'react';

import Paper from 'material-ui/lib/paper';

import Row from './Row';

import { NAME, CONNECTIONS, PAGES, FEATURES, VALID } from 'data/columnNames';

export default ({ modules, serverID }) => (
  <Paper zDepth={2} style={containerStyle}>
    <h2 style={headerStyle}>
      Summary for License #{serverID}
    </h2>
    <table style={tableStyle}>
      <tbody>
        {rows(modules)}
      </tbody>
    </table>
  </Paper>
);

const containerStyle = {
  marginTop: '1rem',
  padding: '1rem'
};

const headerStyle = {
  marginTop: 0,
  color: '#00406E',
  textAlign: 'center'
};

const tableStyle = {
  borderStyle: 'hidden',
  borderCollapse: 'collapse',
  margin: '0 auto'
};

function rows(modules) {
  const rowData = {
    'Server Type': isEnterprise(modules) ? 'Enterprise' : 'Standard',
    'Page Volume (PPY)': pageVolume(modules),
    'Advanced Recognition Volume': advancedRecognitionVolume(modules),
    'Production Auto Learning': productionAutoLearning(modules),
    'Attended Clients': attendClients(modules),
    'ScanPlus (standard)': scanPlus(modules, false),
    'ScanPlus (premium)': scanPlus(modules, true),
    'Major Exporters': majorExporters(modules)
  };

  return Object.keys(rowData).map((title, i) => (
    <Row
      title={title}
      value={rowData[title]}
      key={i}
    />
  ));
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
  const classifs = modules.filter(withName('CLASSIF'));
  const extracts = modules.filter(withName('EXTRACT'));
  const classifsSum = sumOf(PAGES, classifs);
  const extractsSum = sumOf(PAGES, extracts);
  const unlimited = classifsSum === 0 || extractsSum === 0;

  return (classifs.length > 0 || extracts.length > 0) ? (
    unlimited ? 'Unlimited' : Math.max(classifsSum, extractsSum)
  ) : 0;
}

function productionAutoLearning(modules) {
  return modules.find(withName('DPCOLLEC')) ? 'Yes' : 'No';
}

function attendClients(modules) {
  return sumOf(CONNECTIONS, modules.filter(withName('GROUP4')));
}

function scanPlus(modules, premium) {
  const unlimited = modules.some(m => (
    withName('SCANPLUS')(m) && m[CONNECTIONS] == '0'
  ));

  return unlimited ? 'Unlimited' : sumOf(
    CONNECTIONS,
    modules
      .filter(withName('SCANPLUS'))
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
  )).map((str, i) => <div key={i}>{str}</div>);
}

function withName(name) {
  return module => module[NAME].toLowerCase().includes(name.toLowerCase());
}

function withFeature(code) {
  return module => new RegExp(code).test(module[FEATURES]);
}

function sumOf(column, modules) {
  return modules
    .map(module => parseInt(module[column]))
    .reduce((a, b) => a + b, 0);
}

function notExpired(module) {
  return !module[VALID] || (module[VALID] > new Date());
}
