import React from 'react';
import { render } from 'react-dom';

// For material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './App';
render(<App />, document.getElementById('root'));
