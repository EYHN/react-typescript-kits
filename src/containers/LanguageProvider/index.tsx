import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createSelector } from 'reselect';
import { $Call } from 'utility-types';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLocale, makeSelectTranslationMessages } from './selectors';
import reducer from './reducer';
import saga from './saga';

interface ILanguageProviderProps {
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  makeSelectTranslationMessages(),
  (locale, translationMessages) => ({ locale, messages: translationMessages })
);

type stateProps = $Call<typeof mapStateToProps>;

type Props = stateProps & ILanguageProviderProps;

export class LanguageProvider extends React.PureComponent<Props> {
  public render() {
    if (this.props.locale === null) {return <div />; }
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

const withConnect = connect<stateProps, {}, ILanguageProviderProps>(mapStateToProps, {});

const withReducer = injectReducer({ key: 'language', reducer });
const withSaga = injectSaga({ key: 'language', saga, mode: RESTART_ON_REMOUNT });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(LanguageProvider);
