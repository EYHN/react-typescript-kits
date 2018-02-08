import { fromJS } from 'immutable';
import { $call } from 'utility-types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
const returnsOfActions = Object.values(actions).map($call);
export type HomeAction = typeof returnsOfActions[number];

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
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}
