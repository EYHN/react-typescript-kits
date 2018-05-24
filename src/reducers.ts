import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { Action, Reducer } from 'redux';

import themeProviderReducer from 'containers/ThemeProvider/reducer';

const routeInitialState = fromJS({
  location: null
});

function routeReducer(state = routeInitialState, action: Action & {payload: any}) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload
      });
    default:
      return state;
  }
}

export default function createReducer(asyncReducers?: {[key: string]: Reducer<any>}) {
  return combineReducers({
    route: routeReducer,
    theme: themeProviderReducer,
    ...asyncReducers
  });
}
