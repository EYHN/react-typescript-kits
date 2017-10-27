import { DEFAULT_LOCALE } from './containers/App/constants';

import { addLocaleData } from 'react-intl';
const enLocaleData = require('react-intl/locale-data/en');
const zhLocaleData = require('react-intl/locale-data/zh');
const enTranslationMessages = require('./translations/en.json') as Messages;
const zhTranslationMessages = require('./translations/zh.json') as Messages;

export const appLocales = [
  'en',
  'zh',
];

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

export const formatTranslationMessages = (locale: string, messages: Messages) => {
  const defaultFormattedMessages: Messages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return {
      ...formattedMessages,
      [key]: formattedMessage
    };
  }, {}) as Messages;
};

export const translationMessages: LanguageMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};
