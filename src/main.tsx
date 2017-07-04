import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import LanguageProvider from './containers/LanguageProvider';
import { Messages } from 'react-intl';
import configureStore from './store';
import 'sanitize.css/sanitize.css';
import { translationMessages } from './i18n';
import { Routers } from './router';

// 注入 sw
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

const history = createHistory();

const initialState = {};
const store = configureStore(initialState, history);

const render = (messages: LanguageMessages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <Routers />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
    , document.getElementById('app')
  );
};

if (module.hot) {
  module.hot.accept('./i18n', () => {
    render(require('./i18n').translationMessages);
  });
}

if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(System.import('intl'));
  }))
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}
