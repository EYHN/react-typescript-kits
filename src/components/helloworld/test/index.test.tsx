import React from 'react';
import { shallow } from 'enzyme';

import Helloworld from '../index';

describe('<Helloworld />', () => {
  it('should render the `messages.startProjectHeader`', () => {
    const renderedComponent = shallow(
      <Helloworld />
    );
    expect(renderedComponent.contains('Hello World'));
  });
});
