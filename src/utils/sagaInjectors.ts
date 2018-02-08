import {isEmpty, isFunction, isString, conformsTo} from 'lodash';
import invariant from 'invariant';

import checkStore from './checkStore';
import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from './constants';
import { IStore } from '../Interfaces/store';
import { SagaIterator } from 'redux-saga';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key: string) => invariant(
  isString(key) && !isEmpty(key),
  '(app/utils...) injectSaga: Expected `key` to be a non empty string'
);

interface Descriptor {
  saga?: SagaIterator;
  mode?: string;
}

const checkDescriptor = (descriptor: Descriptor) => {
  const shape = {
    saga: isFunction,
    mode: (mode: string) => isString(mode) && allowedModes.includes(mode)
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor'
  );
};

export function injectSagaFactory(store: IStore, isValid: boolean = false) {
  return (key: string, descriptor: any = {}, args?: any) => {
    if (!isValid) { checkStore(store); }

    const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      store.injectedSagas[key] = { ...newDescriptor, task: store.runSaga(saga, args) };
    }
  };
}

export function ejectSagaFactory(store: IStore, isValid: boolean = false) {
  return (key: string) => {
    if (!isValid) { checkStore(store); }

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        if (process.env.NODE_ENV === 'production') {
          store.injectedSagas[key] = 'done';
        }
      }
    }
  };
}

export default function getInjectors(store: IStore) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}
