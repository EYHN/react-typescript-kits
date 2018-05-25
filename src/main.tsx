import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store';
// tslint:disable-next-line:no-import-side-effect
import 'sanitize.css/sanitize.css';
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

const render = (Content: typeof App) => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider>
        <ConnectedRouter history={history}>
          <Content />
        </ ConnectedRouter>
      </ThemeProvider>
    </Provider>
    , MOUNT_NODE
  );
};

render(App);

// 注入 sw
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

if (module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(require('./containers/App').default);
  });
}
