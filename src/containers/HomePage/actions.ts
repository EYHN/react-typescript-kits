import { LOAD_HITOKOTO, LOAD_HITOKOTO_SUCCESS, LOAD_HITOKOTO_ERROR } from 'containers/HomePage/constants';
import { createAction, createStandardAction } from 'typesafe-actions';

export const loadHitokoto = createAction(LOAD_HITOKOTO);

export const hitokotoLoaded = createStandardAction(LOAD_HITOKOTO_SUCCESS)<string>();

export const hitokotoLoadingError = createStandardAction(LOAD_HITOKOTO_ERROR)<object>();
