import {
  CHANGE_THEMENAME,
} from './constants';
import { createStandardAction } from 'typesafe-actions';

export const changeTheme = createStandardAction(CHANGE_THEMENAME)<string>();
