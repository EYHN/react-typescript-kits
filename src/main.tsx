import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import LanguageProvider from './containers/LanguageProvider';
import configureStore from './store';
import 'sanitize.css/sanitize.css';
import { translationMessages } from './i18n';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import App from './containers/App';
import ThemeProvider from './containers/ThemeProvider/index';

const openSansObserver = new FontFaceObserver('Noto Sans', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('app');

const render = (messages: LanguageMessages, Content: typeof App) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ThemeProvider>
          <ConnectedRouter history={history}>
            <Content />
          </ ConnectedRouter>
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
    , MOUNT_NODE
  );
};

if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(System.import('intl'));
  }))
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages, App))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages, App);
}

// 注入 sw
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

if (module.hot) {
  module.hot.accept(['./i18n', './containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(require('./i18n').translationMessages, require('./containers/App').default);
  });
}
