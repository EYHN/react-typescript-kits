import {fromJS} from 'immutable';

import homeReducer from '../reducer';
import {
  LOAD_HITOKOTO,
  LOAD_HITOKOTO_SUCCESS,
  LOAD_HITOKOTO_ERROR
} from '../constants';
import {DEFAULT_LOCALE} from '../../App/constants';
import {loadHitokoto, hitokotoLoaded, hitokotoLoadingError} from 'containers/HomePage/actions';

describe('homeReducer', () => {
  let state: any;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      hitokoto: undefined
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the loadHitokoto action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .set('hitokoto', undefined);

    expect(homeReducer(state, loadHitokoto())).toEqual(expectedResult);
  });

  it('should handle the hitokotoLoaded action correctly', () => {
    const expectedResult = state
      .set('loading', false)
      .set('error', false)
      .set('hitokoto', '123');

    expect(homeReducer(state, hitokotoLoaded('123'))).toEqual(expectedResult);
  });

  it('should handle the hitokotoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false)
      .set('hitokoto', undefined);

    expect(homeReducer(state, hitokotoLoadingError(fixture))).toEqual(expectedResult);
  });
});
