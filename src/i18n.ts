import { DEFAULT_LOCALE } from './containers/App/constants';
import { LocaleData } from 'react-intl';

export const appLocales = [
  'en',
  'ja',
  'zh',
  'zh-Hant'
];

export const localeDataLoaders: Record<string, () => Promise<{localeData?: LocaleData; messages: Messages}>> = {
  'en': async () => ({
    // 'en' locale data is react-intl Built-in
    messages: await import(/* webpackChunkName: "lang-en" */ 'translations/en.json')
  }),
  'ja': async () => ({
    localeData: (await import(/* webpackChunkName: "lang-ja" */ 'react-intl/locale-data/ja')).default,
    messages: await import(/* webpackChunkName: "lang-ja" */ 'translations/ja.json')
  }),
  'zh': async () => ({
    localeData: (await import(/* webpackChunkName: "lang-zh" */ 'react-intl/locale-data/zh')).default,
    messages: await import(/* webpackChunkName: "lang-zh" */ 'translations/zh.json')
  }),
  'zh-Hant': async () => ({
    localeData: (await import(/* webpackChunkName: "lang-zh-Hant" */ 'react-intl/locale-data/zh')).default,
    messages: await import(/* webpackChunkName: "lang-zh-Hant" */ 'translations/zh-Hant.json')
  })
};

export function formatTranslationMessages(locale: string, messages: Messages, defaultTranslationMessages?: Messages) {
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultTranslationMessages[key]
      : messages[key];
    return {
      ...formattedMessages,
      [key]: formattedMessage
    };
  }, {}) as Messages;
}
