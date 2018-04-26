import React from 'react';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { makeSelectLocale } from './selectors';
import { $Call } from 'utility-types';

interface ILanguageProviderProps {
  messages: LanguageMessages;
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

type stateProps = $Call<typeof mapStateToProps>;

type Props = stateProps & ILanguageProviderProps;

export class LanguageProvider extends React.PureComponent<Props, undefined> {
  public render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

export default connect<stateProps, {}, ILanguageProviderProps>(mapStateToProps, {})(LanguageProvider);
