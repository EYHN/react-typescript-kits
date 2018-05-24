import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
import {
  CHANGE_LOCALE, LOAD_LOCALE_SUCCESS,
} from '../constants';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {} as any)).toEqual(fromJS({
      locale: null,
      translationMessages: {}
    }));
  });

  it('changes the locale', () => {
    expect(languageProviderReducer(undefined, { type: CHANGE_LOCALE, locale: 'zh' }).toJS()).toEqual({
      locale: null,
      translationMessages: {}
    });
  });

  it('locale loaded', () => {
    expect(languageProviderReducer(undefined,
      {
        type: LOAD_LOCALE_SUCCESS,
        locale: 'zh',
        payload: { a: 'b' }
      }
    ).toJS()).toEqual({
      locale: 'zh',
      translationMessages: {a: 'b'}
    });
  });
});
