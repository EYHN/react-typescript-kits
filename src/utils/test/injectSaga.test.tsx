import { createMemoryHistory } from 'history';
import { put } from 'redux-saga/effects';
import { shallow } from 'enzyme';
import React from 'react';

import configureStore from 'store';
import injectSaga from '../injectSaga';
import * as sagaInjectors from '../sagaInjectors';
import { IStore } from 'Interfaces/store';

const Component: React.SFC = () => null;

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectSaga decorator', () => {
  let store: IStore;
  let injectors: { injectSaga: Function, ejectSaga: Function };
  let ComponentWithSaga: React.ComponentClass;

  beforeAll(() => {
    (sagaInjectors as any).default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, createMemoryHistory());
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga =
      injectSaga({ key: 'test', saga: testSaga, mode: 'testMode' })(Component) as React.ComponentClass;
    (sagaInjectors.default as jest.Mock).mockClear();
  });

  it('should inject given saga, mode, and props', () => {
    const props = { test: 'test' };
    shallow(<ComponentWithSaga {...props} />, { context: { store } });

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith('test', { saga: testSaga, mode: 'testMode' }, props);
  });

  it('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, { context: { store } });
    renderedComponent.unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });

  it('should set a correct display name', () => {
    expect(ComponentWithSaga.displayName).toBe('withSaga(Component)');
    expect(injectSaga({ key: 'test', saga: testSaga })(() => null).displayName).toBe('withSaga(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    const renderedComponent = shallow(<ComponentWithSaga {...props} />, { context: { store } });

    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});
