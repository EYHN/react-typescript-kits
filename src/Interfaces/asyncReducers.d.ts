import 'redux';

declare module 'redux' {
  interface Store<S> {
    asyncReducers: {[key: string]: Function};
  }
}
