import React from 'react';
import PropTypes from 'prop-types';
const hoistNonReactStatics = require('hoist-non-react-statics');

import getInjectors from './reducerInjectors';
import { Reducer } from 'redux';

export default ({ key , reducer }: {key: string; reducer: Reducer<any>}) =>
    (WrappedComponent: React.ComponentClass | React.StatelessComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;
    injectors = getInjectors(this.context.store);

    componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent) as typeof WrappedComponent;
};
