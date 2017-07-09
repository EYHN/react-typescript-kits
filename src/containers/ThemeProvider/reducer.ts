import { fromJS } from 'immutable';
import { CHANGE_THEMENAME } from './constants';
import { IAction } from './actions';
import { DEFAULT_THEMENAME } from '../App/constants';

const initialState = fromJS({
  themeName: DEFAULT_THEMENAME,
});

export default function themeProviderReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case CHANGE_THEMENAME:
      return state
        .set('themeName', action.themeName);
    default:
      return state;
  }
}
