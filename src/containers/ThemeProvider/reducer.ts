import { fromJS } from 'immutable';
import { $call } from 'utility-types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
import { DEFAULT_THEMENAME } from '../App/constants';
const returnsOfActions = Object.values(actions).map($call);
export type ThemeAction = typeof returnsOfActions[number];

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
