import { fromJS } from 'immutable';
import { $Call, $Values } from 'utility-types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
export type LanguageAction = $Call<$Values<typeof actions>>;

const initialState = fromJS({
  locale: null,
  translationMessages: {}
});

export default function languageProviderReducer(state = initialState, action: LanguageAction) {
  switch (action.type) {
    case getType(actions.localeLoaded):
      return state
        .set('locale', action.locale)
        .set('translationMessages', action.payload);
    default:
      return state;
  }
}
