import { Store } from 'redux';
import { SagaMiddleware } from 'redux-saga';

export interface IStore extends Store<any> {
  injectedReducers: any;
  runSaga: Function;
  injectedSagas: any;
}
