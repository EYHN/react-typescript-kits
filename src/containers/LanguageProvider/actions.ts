import {
  CHANGE_LOCALE, LOAD_LOCALE_SUCCESS, LOAD_LOCALE_ERROR,
} from './constants';
import { createAction } from 'typesafe-actions';

export const changeLocale = createAction(CHANGE_LOCALE, (languageLocale: string) => ({
  type: CHANGE_LOCALE,
  locale: languageLocale
}));

export const localeLoaded = createAction(LOAD_LOCALE_SUCCESS, (language: {
  languageLocale: string;
  translationMessages: Messages;
}) => ({
  type: LOAD_LOCALE_SUCCESS,
  locale: language.languageLocale,
  payload: language.translationMessages
}));

export const localeError = createAction(LOAD_LOCALE_ERROR, (error: any) => ({
  type: LOAD_LOCALE_ERROR,
  payload: error,
  error: true
}));
