import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';

// Needed for material-ui until it removes the dependency
injectTapEventPlugin();

// Render main app to root div
render(<App />, document.getElementById('root'));
