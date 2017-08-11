import {
  changeTheme
} from '../actions';

import {
  CHANGE_THEMENAME
} from '../constants';

describe('ThemeProvider actions', () => {
  describe('Change theme name action', () => {
    it('has a type of CHANGE_THEMENAME', () => {
      const expected = {
        type: CHANGE_THEMENAME,
        themeName: 'newThemeName'
      };
      expect(changeTheme('newThemeName')).toEqual(expected);
    });
  });
});
