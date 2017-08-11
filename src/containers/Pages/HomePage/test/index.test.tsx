import * as React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '../';
import Helloworld from '../../../../components/helloworld/index';

describe('<HomePage />', () => {

  it('should render the Helloworld', () => {
    const renderedComponent = shallow(
      <HomePage
        {...{
          locale: 'en',
          theme: 'light'
        } as any}
      />
    );
    expect(renderedComponent.contains(<Helloworld />)).toEqual(true);
  });
});
