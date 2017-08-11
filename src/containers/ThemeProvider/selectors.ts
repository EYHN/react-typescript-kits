import { createSelector } from 'reselect';

const selectTheme = (state: any) => state.get('theme');

const makeSelectThemeName = () => createSelector(
  selectTheme,
  (themeState) => themeState.get('themeName') as string
);

export {
  selectTheme,
  makeSelectThemeName,
};
