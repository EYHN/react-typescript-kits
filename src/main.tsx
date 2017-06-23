import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import LanguageProvider from './containers/LanguageProvider';
import { Messages } from 'react-intl';
import configureStore from './store';
import { Helloworld } from './components/helloworld/helloworld';
import 'sanitize.css/sanitize.css';
import { translationMessages } from './i18n';

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
          <div>
            <Route
              exact
              path='/'
              component={Helloworld as any}
            />
          </div>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
    , document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
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
