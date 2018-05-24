import { takeLatest, call, put } from 'redux-saga/effects';
import { CHANGE_LOCALE } from './constants';
import { $Call } from 'utility-types';
import { changeLocale as changeLocaleAction, localeLoaded, localeError } from './actions';
import { DEFAULT_LOCALE } from '../App/constants';
import { formatTranslationMessages, localeDataLoaders } from 'i18n';
import { addLocaleData } from 'react-intl';

export async function fetchLocaleData(locale: string) {
  return await localeDataLoaders[locale]();
}

export async function fetchTranslationMessages(locale: string) {
  const defaultLocale = DEFAULT_LOCALE;
  const [lang, defaultLang = {messages: undefined, localeData: undefined}] = await Promise.all([
    fetchLocaleData(locale),
    defaultLocale !== locale ?
      fetchLocaleData(locale) : undefined
  ]);
  return [
    formatTranslationMessages(locale, lang.messages, defaultLang.messages),
    [].concat(lang.localeData).concat(defaultLang.localeData)
  ];
}

export function* changeLocale(action: $Call<typeof changeLocaleAction>) {
  try {
    const [translationMessage, localeData] = yield call(fetchTranslationMessages, action.locale);
    addLocaleData(localeData);
    yield put(localeLoaded({languageLocale: action.locale, translationMessages: translationMessage}));
  } catch (err) {
    yield put(localeError(err));
  }
}

export default function* language() {
  yield takeLatest(CHANGE_LOCALE, changeLocale);
  yield put(changeLocaleAction(navigator.language));
}
