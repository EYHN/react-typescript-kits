import React from 'react';
import { ThemeProvider as WithStyleThemeProvider } from '../../withStyles';
import { createSelector } from 'reselect';
import { makeSelectThemeName } from './selectors';
import { returntypeof } from 'react-redux-typescript';
import { connect } from 'react-redux';

interface IThemeProviderProps {
}

const mapStateToProps = createSelector(
  makeSelectThemeName(),
  (themeName) => ({ themeName })
);

const stateProps = returntypeof(mapStateToProps);

type Props = typeof stateProps & IThemeProviderProps;

export class ThemeProvider extends React.PureComponent<Props, undefined> {
  public render() {
    return (
      <WithStyleThemeProvider name={this.props.themeName}>
        {React.Children.only(this.props.children)}
      </ WithStyleThemeProvider>
    );
  }
}

export default connect<typeof stateProps, {}, IThemeProviderProps>(mapStateToProps, {})(ThemeProvider);
