import { fromJS } from 'immutable';

import languageProviderReducer from '../reducer';
import {
  CHANGE_LOCALE,
} from '../constants';
import { DEFAULT_LOCALE } from '../../App/constants';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {} as any)).toEqual(fromJS({
      locale: DEFAULT_LOCALE,
    }));
  });

  it('changes the locale', () => {
    expect(languageProviderReducer(undefined, { type: CHANGE_LOCALE, locale: 'zh' }).toJS()).toEqual({
      locale: 'zh',
    });
  });
});
