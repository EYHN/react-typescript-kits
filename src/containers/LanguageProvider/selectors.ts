import { createSelector } from 'reselect';
import * as Reselect from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state: any) => state.get('language');

/**
 * Select the language locale
 */

const makeSelectLocale = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('locale') as string
);

export {
  selectLanguage,
  makeSelectLocale,
};
