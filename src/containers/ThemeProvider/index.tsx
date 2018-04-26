import React from 'react';
import { ThemeProvider as WithStyleThemeProvider } from '../../withStyles';
import { createSelector } from 'reselect';
import { makeSelectThemeName } from './selectors';
import { connect } from 'react-redux';
import { $Call } from 'utility-types';

interface IThemeProviderProps {
}

const mapStateToProps = createSelector(
  makeSelectThemeName(),
  (themeName) => ({ themeName })
);

type stateProps = $Call<typeof mapStateToProps>;

type Props = stateProps & IThemeProviderProps;

export class ThemeProvider extends React.PureComponent<Props, undefined> {
  public render() {
    return (
      <WithStyleThemeProvider name={this.props.themeName}>
        {React.Children.only(this.props.children)}
      </ WithStyleThemeProvider>
    );
  }
}

export default connect<stateProps, {}, IThemeProviderProps>(mapStateToProps, {})(ThemeProvider);
