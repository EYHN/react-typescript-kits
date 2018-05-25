import invariant from 'invariant';
import { IStore } from 'Interfaces/store';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store: IStore) {
  invariant(
    typeof store.dispatch === 'function' &&
    typeof store.subscribe === 'function' &&
    typeof store.getState === 'function' &&
    typeof store.replaceReducer === 'function' &&
    typeof store.runSaga === 'function' &&
    typeof store.injectedReducers === 'object' && store.injectedReducers != null &&
    typeof store.injectedSagas === 'object' && store.injectedSagas != null,
    '(app/utils...) injectors: Expected a valid redux store'
  );
}
