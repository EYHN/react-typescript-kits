import { fromJS } from 'immutable';

import {
  LOAD_HITOKOTO,
  LOAD_HITOKOTO_SUCCESS,
  LOAD_HITOKOTO_ERROR
} from './constants';
import { ILoadHitokotoAction, IHitokotoLoaded, IHitokotoLoadingError } from 'containers/HomePage/actions';

const initialState = fromJS({
  loading: false,
  error: false,
  hitokoto: undefined
});

type IAction = ILoadHitokotoAction | IHitokotoLoaded | IHitokotoLoadingError;

export default function homeReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case LOAD_HITOKOTO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('hitokoto', undefined);
    case LOAD_HITOKOTO_SUCCESS:
      return state
        .set('loading', false)
        .set('hitokoto', action.hitokoto);
    case LOAD_HITOKOTO_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}
