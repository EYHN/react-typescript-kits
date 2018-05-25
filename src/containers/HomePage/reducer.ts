import { fromJS } from 'immutable';
import { $Call, $Values } from 'utility-types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
export type HomeAction = $Call<$Values<typeof actions>>;

const initialState = fromJS({
  loading: false,
  error: false,
  hitokoto: undefined
});

export default function homeReducer(state = initialState, action: HomeAction) {
  switch (action.type) {
    case getType(actions.loadHitokoto):
      return state
        .set('loading', true)
        .set('error', false)
        .set('hitokoto', undefined);
    case getType(actions.hitokotoLoaded):
      return state
        .set('loading', false)
        .set('hitokoto', action.payload);
    case getType(actions.hitokotoLoadingError):
      return state
        .set('error', true)
        .set('loading', false);
    default:
      return state;
  }
}
