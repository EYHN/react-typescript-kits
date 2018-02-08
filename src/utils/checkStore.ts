import { conformsTo, isObject, isFunction } from 'lodash';
import invariant from 'invariant';
import { IStore } from 'Interfaces/store';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store: IStore) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store'
  );
}
