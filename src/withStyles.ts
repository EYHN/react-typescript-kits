import DefaultTheme from './themes/defaultTheme';
import LightTheme from './themes/lightTheme';
import DarkTheme from './themes/darkTheme';

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
ThemedStyleSheet.registerTheme('dark', DarkTheme);

const $withStyles: typeof withStyles = (s, option) => (
  withStyles(s, {
    pureComponent: false,
    ...option
  })
);

export const appThemes = [
  'light',
  'dark'
];

export { css, $withStyles as withStyles, ThemeProvider, ThemedStyleSheet };
