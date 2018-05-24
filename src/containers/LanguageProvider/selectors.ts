import { createSelector } from 'reselect';

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

const makeSelectTranslationMessages = () => createSelector(
  selectLanguage,
  (languageState) => languageState.get('translationMessages') as Messages
);

export {
  selectLanguage,
  makeSelectLocale,
  makeSelectTranslationMessages
};
