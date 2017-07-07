import * as React from 'react';
import { Route, PlainRoute } from 'react-router';
import { getAsyncInjectors } from './utils/asyncInjectors';
import { Istore } from './Interfaces/store';

const HomePage = require('bundle-loader?lazy&name=homePage!./containers/Pages/HomePage');

const errorLoading = (err: any) => {
  // tslint:disable-next-line:no-console
  console.error('Dynamic page loading failed', err);
};

const loadModule = (cb: Function) => (componentModule: any) => {
  cb(null, componentModule.default);
};

interface PlainRouteWithName extends PlainRoute {
  name?: string;
}

export default function createRoutes(store: Istore): PlainRouteWithName[] {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent: (nextState, cb) => {
        const importModules = Promise.all([
          System.import('./containers/Pages/HomePage')
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    }
  ];
}
