import React from 'react';
import { shallow } from 'enzyme';

import Helloworld from '../index';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

describe('<Helloworld />', () => {
  it('should render the `messages.startProjectHeader`', () => {
    const renderedComponent = shallow(
      <Helloworld />
    );
    expect(renderedComponent.contains(<FormattedMessage {...messages.startProjectHeader} />));
  });
});
