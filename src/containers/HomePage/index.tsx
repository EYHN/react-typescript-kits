import { returntypeof } from 'react-redux-typescript';
import { createSelector } from 'reselect';
import React from 'react';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import Helloworld from 'components/helloworld/index';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { appLocales } from 'i18n';
import { changeTheme } from 'containers/ThemeProvider/actions';
import { makeSelectThemeName } from 'containers/ThemeProvider/selectors';
import { appThemes } from 'withStyles';
import { loadHitokoto } from 'containers/HomePage/actions';
import reducer from './reducer';
import saga from './saga';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectHitokoto } from 'containers/HomePage/selectors';

interface IHomePageProps {
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  makeSelectThemeName(),
  makeSelectHitokoto(),
  (locale, theme, hitokoto) => ({ locale, theme, hitokoto })
);

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  changeLocale: (locale: string) => { dispatch(changeLocale(locale)); },
  changeTheme: (theme: string) => {dispatch(changeTheme(theme)); },
  onGetHitokoto: () => (dispatch(loadHitokoto()))
});

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type Props = typeof stateProps & IHomePageProps & typeof dispatchProps;

export class HomePage extends React.PureComponent<Props, undefined> {

  handleLocaleSelectChange: React.ReactEventHandler<HTMLSelectElement> = (e) => {
    this.props.changeLocale(e.currentTarget.value);
  }

  handleThemeSelectChange: React.ReactEventHandler<HTMLSelectElement> = (e) => {
    this.props.changeTheme(e.currentTarget.value);
  }

  public render() {
    const appLocalesItems = appLocales.map((locale) => {
      return <option key={locale} value={locale}>{locale}</option>;
    });
    const appThemesItems = Object.keys(appThemes).map((theme) => {
      return <option key={theme} value={theme}>{theme}</option>;
    });
    return (
      <div>
        <Helloworld />
        <select
          name='Locale'
          value={this.props.locale}
          onChange={this.handleLocaleSelectChange}
        >
          {appLocalesItems}
        </select>
        <select
          name='Theme'
          value={this.props.theme}
          onChange={this.handleThemeSelectChange}
        >
          {appThemesItems}
        </select>
        <p>{this.props.hitokoto}</p>
      </div>
    );
  }
}

// tslint:disable-next-line:max-line-length
const withConnect = connect<typeof stateProps, typeof dispatchProps, IHomePageProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
