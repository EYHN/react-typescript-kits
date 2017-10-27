/**
 * Test store addons
 */

import createHistory from 'history/createBrowserHistory';
import configureStore from '../store';
import { IStore } from 'Interfaces/store';

describe('configureStore', () => {
  let store: IStore;

  beforeAll(() => {
    store = configureStore({}, createHistory());
  });

  describe('injectedReducers', () => {
    it('should contain an object for reducers', () => {
      expect(typeof store.injectedReducers).toBe('object');
    });
  });

  describe('injectedSagas', () => {
    it('should contain an object for sagas', () => {
      expect(typeof store.injectedSagas).toBe('object');
    });
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});

describe('configureStore params', () => {
  it('should call window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', () => {
    const compose = jest.fn();
    compose.mockReturnValueOnce({});
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = () => () => compose;
    configureStore(undefined, createHistory());
    expect(compose).toHaveBeenCalled();
  });
});
