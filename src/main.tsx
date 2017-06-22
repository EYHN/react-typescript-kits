import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

const Main = () => (
    <App />
);

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
