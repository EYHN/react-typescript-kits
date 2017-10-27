import checkStore from '../checkStore';
import { IStore } from 'Interfaces/store';

describe('checkStore', () => {
  let store: any;

  const Void = {};

  beforeEach(() => {
    store = {
      dispatch: () => Void,
      subscribe: () => Void,
      getState: () => Void,
      replaceReducer: () => Void,
      runSaga: () => Void,
      injectedReducers: {},
      injectedSagas: {},
    };
  });

  it('should not throw if passed valid store shape', () => {
    expect(() => checkStore(store)).not.toThrow();
  });

  it('should throw if passed invalid store shape', () => {
    expect(() => checkStore(Void as any)).toThrow();
    expect(() => checkStore({ ...store, injectedSagas: null })).toThrow();
    expect(() => checkStore({ ...store, injectedReducers: null })).toThrow();
    expect(() => checkStore({ ...store, runSaga: null })).toThrow();
    expect(() => checkStore({ ...store, replaceReducer: null })).toThrow();
  });
});
