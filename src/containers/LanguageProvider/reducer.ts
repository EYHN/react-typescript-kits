import { fromJS } from 'immutable';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from 'containers/App/constants';
import { IAction } from './actions';

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

export default function languageProviderReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}
