import { LOAD_HITOKOTO, LOAD_HITOKOTO_SUCCESS, LOAD_HITOKOTO_ERROR } from 'containers/HomePage/constants';
import { createAction } from 'typesafe-actions';

export const loadHitokoto = createAction(LOAD_HITOKOTO);

export const hitokotoLoaded = createAction(LOAD_HITOKOTO_SUCCESS, (hitokoto: string) => ({
  type: LOAD_HITOKOTO_SUCCESS,
  payload: hitokoto
}));

export const hitokotoLoadingError = createAction(LOAD_HITOKOTO_ERROR, (error: any) => ({
  type: LOAD_HITOKOTO_ERROR,
  payload: error,
  error: true
}));
