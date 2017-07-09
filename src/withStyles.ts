import DefaultTheme from './themes/defaultTheme';
import LightTheme from './themes/lightTheme';

const ThemedStyleSheet = require('react-with-styles/lib/ThemedStyleSheet').default;
const aphroditeInterface = require('react-with-styles-interface-aphrodite').default;
const { css, withStyles, ThemeProvider }:
  {
    css: any,
    withStyles: (s: (theme: IThemeProps) => {}, option?: IwithStylesOption) => <T>(component: T) => T,
    ThemeProvider: any
  }
  = require('react-with-styles');

interface IwithStylesOption {
  pureComponent: boolean;
}

type IThemeProps = typeof DefaultTheme;

ThemedStyleSheet.registerDefaultTheme(DefaultTheme);
ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme('light', LightTheme);

const $withStyles: typeof withStyles = (s, option) => (
  withStyles(s, {
    pureComponent: true,
    ...option
  })
);

export { css, $withStyles as withStyles, ThemeProvider, ThemedStyleSheet };
