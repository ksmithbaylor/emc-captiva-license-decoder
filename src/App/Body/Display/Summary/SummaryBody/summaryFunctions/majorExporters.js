import React from 'react';
import { withName } from './shared';

export default function majorExporters(modules) {
  return (
    Object.keys(exporterMappings)
    .filter(exporter => (
      exporterMappings[exporter]
      .some(name => (
        modules.find(withName(name))
      ))
    ))
    .map((str, i) => <div key={i}>{str}</div>)
  );
}

const exporterMappings = {
  'EMC': [ 'EXAX', 'IAEXDM' ],
  'IBM + FileNet': [ 'IAXNET2', 'EXFNCM', 'IAEXVI', 'IAEXFAF', 'EXICM', 'EXCSSAP' ],
  'SharePoint': [ 'EXSHRPT2' ],
  'GLOBAL360': [ 'IAEXWNT' ],
  'OPENTEXT LIVELINK': [ 'EXLL2' ],
  'SAP Archive and AP Connect': [ 'EXSAPAL', 'ASISAP' ]
};
