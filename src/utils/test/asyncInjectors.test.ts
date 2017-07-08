import { createMemoryHistory } from 'react-router';
import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import configureStore from '../../store';

import { Action } from 'redux';

import {
  injectAsyncReducer,
  injectAsyncSagas,
  getAsyncInjectors,
} from '../asyncInjectors';
import { Istore } from '../../Interfaces/store';

const initialState = fromJS({ reduced: 'soon' });

const reducer = (state = initialState, action: Action & { payload: any }) => {
  switch (action.type) {
    case 'TEST':
      return state.set('reduced', action.payload);
    default:
      return state;
  }
};

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

const sagas = [
  testSaga,
];

describe('asyncInjectors', () => {
  let store: Istore;

  describe('getAsyncInjectors', () => {
    beforeAll(() => {
      store = configureStore({}, createMemoryHistory());
    });

    it('given a store, should return all async injectors', () => {
      const { injectReducer, injectSagas } = getAsyncInjectors(store);

      injectReducer('test', reducer);
      injectSagas(sagas);

      const actual = store.getState().get('test');
      const expected = initialState.merge({ reduced: 'yup' });

      expect(actual.toJS()).toEqual(expected.toJS());
    });

    it('should throw if passed invalid store shape', () => {
      let result = false;

      Reflect.deleteProperty(store, 'dispatch');

      try {
        getAsyncInjectors(store);
      } catch (err) {
        result = err.name === 'Invariant Violation';
      }

      expect(result).toBe(true);
    });
  });

  describe('helpers', () => {
    beforeAll(() => {
      store = configureStore({}, createMemoryHistory());
    });

    describe('injectAsyncReducer', () => {
      it('given a store, it should provide a function to inject a reducer', () => {
        const injectReducer = injectAsyncReducer(store);

        injectReducer('test', reducer);

        const actual = store.getState().get('test');
        const expected = initialState;

        expect(actual.toJS()).toEqual(expected.toJS());
      });

      it('should not assign reducer if already existing', () => {
        const injectReducer = injectAsyncReducer(store);

        injectReducer('test', reducer);
        // tslint:disable-next-line:no-empty
        injectReducer('test', () => {});

        expect(store.asyncReducers.test.toString()).toEqual(reducer.toString());
      });

      it('should throw if passed invalid name', () => {
        let result = false;

        const injectReducer = injectAsyncReducer(store);

        try {
          injectReducer('', reducer);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectReducer(999 as any, reducer);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toBe(true);
      });

      it('should throw if passed invalid reducer', () => {
        let result = false;

        const injectReducer = injectAsyncReducer(store);

        try {
          injectReducer('bad', 'nope' as any);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectReducer('coolio', 12345 as any);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toBe(true);
      });
    });

    describe('injectAsyncSagas', () => {
      it('given a store, it should provide a function to inject a saga', () => {
        const injectSagas = injectAsyncSagas(store);

        injectSagas(sagas);

        const actual = store.getState().get('test');
        const expected = initialState.merge({ reduced: 'yup' });

        expect(actual.toJS()).toEqual(expected.toJS());
      });

      it('should throw if passed invalid saga', () => {
        let result = false;

        const injectSagas = injectAsyncSagas(store);

        try {
          injectSagas({ testSaga } as any);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectSagas(testSaga as any);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toBe(true);
      });
    });
  });
});
