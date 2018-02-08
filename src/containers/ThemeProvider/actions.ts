import {
  CHANGE_THEMENAME,
} from './constants';
import { createAction } from 'typesafe-actions';

export const changeTheme = createAction(CHANGE_THEMENAME, (themeName: string) => ({
  type: CHANGE_THEMENAME,
  payload: themeName
}));
