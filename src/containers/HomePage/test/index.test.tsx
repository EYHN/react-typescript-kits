import React from 'react';
import { shallow } from 'enzyme';

import { HomePage, mapDispatchToProps } from '../';
import Helloworld from 'components/helloworld/index';
import { loadHitokoto } from 'containers/HomePage/actions';

describe('<HomePage />', () => {

  it('should render the Helloworld', () => {
    const renderedComponent = shallow(
      <HomePage
        {...{
          hitokoto: null
        } as any}
      />
    );
    expect(renderedComponent.contains(<Helloworld />)).toEqual(true);
  });

  describe('mapDispatchToProps', () => {
    describe('changeTheme', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onGetHitokoto).toBeDefined();
      });

      it('should dispatch changeTheme when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onGetHitokoto();
        expect(dispatch).toHaveBeenCalledWith(loadHitokoto());
      });
    });
  });
});
