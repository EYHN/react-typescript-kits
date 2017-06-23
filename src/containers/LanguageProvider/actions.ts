import {
  CHANGE_LOCALE,
} from './constants';

export interface IAction {
  type: typeof CHANGE_LOCALE;
  locale: string;
}

export function changeLocale(languageLocale: string) {
  return { type: CHANGE_LOCALE as typeof CHANGE_LOCALE, locale: languageLocale };
}
