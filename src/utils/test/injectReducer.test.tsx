import { shallow } from 'enzyme';
import React from 'react';
import identity from 'lodash/identity';
import { createMemoryHistory } from 'history';

import configureStore from 'store';
import injectReducer from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors';
import { IStore } from 'Interfaces/store';
import { Reducer } from 'redux';

const Component: React.SFC = () => null;

const reducer = identity;

describe('injectReducer decorator', () => {
  let store: IStore;
  let injectors: { injectReducer: Reducer<any> };
  let ComponentWithReducer: React.ComponentClass;

  beforeAll(() => {
    (reducerInjectors as any).default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, createMemoryHistory());
    injectors = {
      injectReducer: jest.fn()
    };
    ComponentWithReducer = injectReducer({ key: 'test', reducer })(Component) as React.ComponentClass;
    (reducerInjectors.default as jest.Mock).mockClear();
  });

  it('should inject a given reducer', () => {
    shallow(<ComponentWithReducer />, { context: { store } });

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });

  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(injectReducer({ key: 'test', reducer })(() => null).displayName).toBe('withReducer(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = shallow(<ComponentWithReducer {...props} />, { context: { store } });

    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});
