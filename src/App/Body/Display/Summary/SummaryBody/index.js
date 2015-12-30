import React from 'react';
import * as S from './summaryFunctions';
import SummaryRow from './SummaryRow';

export default function SummaryBody({ modules }) {
  const rowData = rowDataFor(modules);

  const rows = Object.keys(rowData).map(title => (
    <SummaryRow title={title} value={rowData[title]} key={title} />
  ));

  return (
    <tbody>
      {rows}
    </tbody>
  );
}

const rowDataFor = modules => ({
  'Server Type': S.isEnterprise(modules) ? 'Enterprise' : 'Standard',
  'Page Volume (PPY)': S.pageVolume(modules),
  'Advanced Recognition Volume': S.advancedRecognitionVolume(modules),
  'Production Auto Learning': S.productionAutoLearning(modules),
  'Attended Clients': S.attendClients(modules),
  'ScanPlus (standard)': S.scanPlus(modules, false),
  'ScanPlus (premium)': S.scanPlus(modules, true),
  'Major Exporters': S.majorExporters(modules)
});
