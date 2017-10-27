import { LOAD_HITOKOTO, LOAD_HITOKOTO_SUCCESS, LOAD_HITOKOTO_ERROR } from 'containers/HomePage/constants';

export interface ILoadHitokotoAction {
  type: typeof LOAD_HITOKOTO;
}

export interface IHitokotoLoaded {
  type: typeof LOAD_HITOKOTO_SUCCESS;
  hitokoto: string;
}

export interface IHitokotoLoadingError {
  type: typeof LOAD_HITOKOTO_ERROR;
  error: any;
}

export function loadHitokoto(): ILoadHitokotoAction {
  return {
    type: LOAD_HITOKOTO,
  };
}

export function hitokotoLoaded(hitokoto: string): IHitokotoLoaded {
  return {
    type: LOAD_HITOKOTO_SUCCESS,
    hitokoto
  };
}

export function hitokotoLoadingError(error: any): IHitokotoLoadingError {
  return {
    type: LOAD_HITOKOTO_ERROR,
    error
  };
}
