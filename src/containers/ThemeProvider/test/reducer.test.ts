import { fromJS } from 'immutable';

import themeProviderReducer from '../reducer';
import {
  CHANGE_THEMENAME,
} from '../constants';
import { DEFAULT_THEMENAME } from '../../App/constants';

describe('themeProviderReducer', () => {
  it('returns the initial state', () => {
    expect(themeProviderReducer(undefined, {} as any)).toEqual(fromJS({
      themeName: DEFAULT_THEMENAME,
    }));
  });

  it('changes the locale', () => {
    expect(themeProviderReducer(undefined, { type: CHANGE_THEMENAME, themeName: 'themeName' }).toJS()).toEqual({
      themeName: 'themeName',
    });
  });
});
