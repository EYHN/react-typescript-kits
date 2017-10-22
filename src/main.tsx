import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import LanguageProvider from './containers/LanguageProvider';
import configureStore from './store';
import 'sanitize.css/sanitize.css';
import { translationMessages } from './i18n';
import * as FontFaceObserver from 'fontfaceobserver';
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import { makeSelectLocationState } from './containers/App/selectors';
import App from './containers/App';
import createRoutes from './router';
import ThemeProvider from './containers/ThemeProvider/index';
const useScroll = require('react-router-scroll').useScroll;

const openSansObserver = new FontFaceObserver('Noto Sans', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

const MOUNT_NODE = document.getElementById('app');

const render = (messages: LanguageMessages, createRoutesFun: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ThemeProvider>
          <Router
            history={history}
            routes={{
              component: App,
              childRoutes: createRoutesFun(store),
            }}
            render={
              applyRouterMiddleware(useScroll())
            }
          />
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
    .then(() => render(translationMessages, createRoutes))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages, createRoutes);
}

// 注入 sw
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

if (module.hot) {
  module.hot.accept(['./i18n', './router'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(require('./i18n').translationMessages, require('./router').default);
  });
}
