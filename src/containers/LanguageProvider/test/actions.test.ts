import {
  changeLocale, localeLoaded, localeError,
} from '../actions';

import {
  CHANGE_LOCALE, LOAD_LOCALE_SUCCESS, LOAD_LOCALE_ERROR,
} from '../constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: CHANGE_LOCALE,
        locale: 'zh'
      };
      expect(changeLocale('zh')).toEqual(expected);
    });
  });

  describe('Local loaded Action', () => {
    it('has a type of LOAD_LOCALE_SUCCESS', () => {
      const expected = {
        type: LOAD_LOCALE_SUCCESS,
        locale: 'zh',
        payload: {}
      };
      expect(localeLoaded({languageLocale: 'zh', translationMessages: {}})).toEqual(expected);
    });
  });

  describe('Local load error Action', () => {
    it('has a type of LOAD_LOCALE_ERROR', () => {
      const expected = {
        type: LOAD_LOCALE_ERROR,
        payload: '123',
        error: true
      };
      expect(localeError('123')).toEqual(expected);
    });
  });
});
