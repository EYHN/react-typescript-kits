import {
  CHANGE_LOCALE,
} from './constants';
import { createAction } from 'typesafe-actions';

export const changeLocale = createAction(CHANGE_LOCALE, (languageLocale: string) => ({
  type: CHANGE_LOCALE,
  locale: languageLocale
}));
