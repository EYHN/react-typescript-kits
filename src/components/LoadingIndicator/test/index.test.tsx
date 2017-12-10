import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '../index';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

describe('<LoadingIndicator />', () => {
  it('should render the `messages.loading`', () => {
    const renderedComponent = shallow(
      <LoadingIndicator />
    );
    expect(renderedComponent.contains(<FormattedMessage {...messages.loading} />));
  });
});
