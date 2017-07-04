import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from './containers/LanguageProvider/reducer';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

export default function createReducer() {
  return combineReducers({
    language: languageProviderReducer
  });
}
