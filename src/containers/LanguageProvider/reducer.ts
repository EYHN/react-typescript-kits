import { fromJS } from 'immutable';
import { $call } from 'utility-types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
import { DEFAULT_LOCALE } from 'containers/App/constants';
const returnsOfActions = Object.values(actions).map($call);
export type LanguageAction = typeof returnsOfActions[number];

const initialState = fromJS({
  locale: DEFAULT_LOCALE
});

export default function languageProviderReducer(state = initialState, action: LanguageAction) {
  switch (action.type) {
    case getType(actions.changeLocale):
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}
