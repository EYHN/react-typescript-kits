import * as React from 'react';
import { Route } from 'react-router';
import HomePage from './containers/Pages/HomePage';

export const Routers: React.SFC<React.HTMLProps<HTMLDivElement>> = ({ children, ...other }) =>
  <div>
      <Route
        exact
        path = '/'
        component = {HomePage}
      />
  </div>;
