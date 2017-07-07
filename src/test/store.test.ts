/**
 * Test store addons
 */

import { browserHistory } from 'react-router';
import configureStore from '../store';
import { Store } from 'redux';

describe('configureStore', () => {
  let store: any;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  describe('runSaga', () => {
    it('should contain a hook for `sagaMiddleware.run`', () => {
      expect(typeof store.runSaga).toBe('function');
    });
  });
});
