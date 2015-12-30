import React from 'react';

import SummaryRow from './SummaryRow';

import {
  isEnterprise, pageVolume, advancedRecognitionVolume, productionAutoLearning,
  attendClients, scanPlus, majorExporters
} from './summaryFunctions';

export default ({ modules }) => {
  const rowData = rowDataFor(modules);

  const rows = Object.keys(rowData).map(title => (
    <SummaryRow title={title} value={rowData[title]} key={title} />
  ));

  return <tbody>{rows}</tbody>;
};

const rowDataFor = modules => ({
  'Server Type': isEnterprise(modules) ? 'Enterprise' : 'Standard',
  'Page Volume (PPY)': pageVolume(modules),
  'Advanced Recognition Volume': advancedRecognitionVolume(modules),
  'Production Auto Learning': productionAutoLearning(modules),
  'Attended Clients': attendClients(modules),
  'ScanPlus (standard)': scanPlus(modules, false),
  'ScanPlus (premium)': scanPlus(modules, true),
  'Major Exporters': majorExporters(modules)
});
