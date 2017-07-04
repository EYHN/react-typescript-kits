import 'redux';

declare module 'redux' {
  interface Store<S> {
    runSaga: Function;
  }
}
