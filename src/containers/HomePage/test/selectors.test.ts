import { fromJS } from 'immutable';

import {
  selectHome,
  makeSelectHitokoto,
} from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      hitokoto: '123',
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectHitokoto', () => {
  const hitokotoSelector = makeSelectHitokoto();
  it('should select the hitokoto', () => {
    const hitokoto = '123';
    const mockedState = fromJS({
      home: {
        hitokoto,
      },
    });
    expect(hitokotoSelector(mockedState)).toEqual(hitokoto);
  });
});
