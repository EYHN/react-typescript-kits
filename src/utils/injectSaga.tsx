import React from 'react';
import PropTypes from 'prop-types';
const hoistNonReactStatics = require('hoist-non-react-statics');

import getInjectors from './sagaInjectors';

export default ({ key, saga, mode }: {key: string, saga: Function, mode?: any}) =>
    (WrappedComponent: React.ComponentClass | React.StatelessComponent) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;
    injectors = getInjectors(this.context.store);

    componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
