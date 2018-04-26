import { fromJS } from 'immutable';
import { $Call, $Values } from 'utility-types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
import { DEFAULT_THEMENAME } from '../App/constants';
export type ThemeAction = $Call<$Values<typeof actions>>;

const initialState = fromJS({
  themeName: DEFAULT_THEMENAME
});

export default function themeProviderReducer(state = initialState, action: ThemeAction) {
  switch (action.type) {
    case getType(actions.changeTheme):
      return state
        .set('themeName', action.payload);
    default:
      return state;
  }
}
