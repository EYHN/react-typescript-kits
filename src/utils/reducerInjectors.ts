import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';

import checkStore from './checkStore';
import createReducer from '../reducers';
import { Reducer } from 'redux';
import { IStore } from 'Interfaces/store';

export function injectReducerFactory(store: IStore, isValid: boolean = false) {
  return function injectReducer(key: string, reducer: Reducer<any>) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    );

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: IStore) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
