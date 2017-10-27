import React from 'react';
import { createSelector } from 'reselect';
import { returntypeof } from 'react-redux-typescript';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { makeSelectLocale } from './selectors';

interface ILanguageProviderProps {
  messages: LanguageMessages;
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
);

const stateProps = returntypeof(mapStateToProps);

type Props = typeof stateProps & ILanguageProviderProps;

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

export default connect<typeof stateProps, {}, ILanguageProviderProps>(mapStateToProps, {})(LanguageProvider);
