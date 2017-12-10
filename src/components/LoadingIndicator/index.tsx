import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const LoadingIndicator = () => (
  <div>
    <FormattedMessage {...messages.loading} />
  </div>
);

export default LoadingIndicator;
