import { fromJS } from 'immutable';

import {
  selectTheme,
} from '../selectors';

describe('selectTheme', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      theme: globalState,
    });
    expect(selectTheme(mockedState)).toEqual(globalState);
  });
});
