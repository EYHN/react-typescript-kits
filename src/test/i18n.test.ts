import { DEFAULT_LOCALE } from 'containers/App/constants';
import { formatTranslationMessages } from '../i18n';

const defaultTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: 'default message 2'
};

const esTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: ''
};

describe('formatTranslationMessages', () => {
  it('should build only current locale', () => {
    const result = formatTranslationMessages(DEFAULT_LOCALE, { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });

  it('should combine default locale and current locale', () => {
    const result = formatTranslationMessages('', esTranslationMessages, defaultTranslationMessages);

    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'default message 2'
    });
  });
});
