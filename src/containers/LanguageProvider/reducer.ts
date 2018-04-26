import { fromJS } from 'immutable';
import { $Call, $Values } from 'utility-types';
import * as actions from './actions';
import { getType } from 'typesafe-actions';
import { DEFAULT_LOCALE } from 'containers/App/constants';
export type LanguageAction = $Call<$Values<typeof actions>>;

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
