import { returntypeof } from 'react-redux-typescript';
import { createSelector } from 'reselect';
import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Helloworld from '../../../components/helloworld/index';
import { changeLocale } from '../../LanguageProvider/actions';
import { makeSelectLocale } from '../../LanguageProvider/selectors';
import { appLocales } from '../../../i18n';
import { changeTheme } from '../../ThemeProvider/actions';
import { makeSelectThemeName } from '../../ThemeProvider/selectors';
import { appThemes } from '../../../withStyles';

interface IHomePageProps extends RouteComponentProps<{}, {}> {
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  makeSelectThemeName(),
  (locale, theme) => ({ locale, theme })
);

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  changeLocale: (locale: string) => { dispatch(changeLocale(locale)); },
  changeTheme: (theme: string) => {dispatch(changeTheme(theme)); }
});

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type Props = typeof stateProps & IHomePageProps & typeof dispatchProps;

export class HomePage extends React.PureComponent<Props, undefined> {

  public render() {
    return (
      <div>
        <Helloworld />
        <select
          name='Locale'
          value={this.props.locale}
          onChange={(e) => {
            this.props.changeLocale(e.currentTarget.value);
          }}
        >
          {
            appLocales.map((locale) => {
              return <option key={locale} value={locale}>{locale}</option>;
            })
          }
        </select>
        <select
          name='Theme'
          value={this.props.theme}
          onChange={(e) => {
            this.props.changeTheme(e.currentTarget.value);
          }}
        >
          {
            appThemes.map((theme) => {
              return <option key={theme} value={theme}>{theme}</option>;
            })
          }
        </select>
      </div>
    );
  }
}

// tslint:disable-next-line:max-line-length
export default connect<typeof stateProps, typeof dispatchProps, IHomePageProps>(mapStateToProps, mapDispatchToProps)(HomePage);
