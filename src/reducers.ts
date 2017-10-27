import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { Action } from 'redux';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import themeProviderReducer from 'containers/ThemeProvider/reducer';

const routeInitialState = fromJS({
  location: null,
});

function routeReducer(state = routeInitialState, action: Action & {payload: any}) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

export default function createReducer(asyncReducers?: {[key: string]: Function}) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    theme: themeProviderReducer,
    ...asyncReducers
  });
}
