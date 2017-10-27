import { IState } from 'Interfaces/state';
import { createSelector } from 'reselect';

export const selectHome = (state: IState) => state.get('home');

export const makeSelectHitokoto = () => createSelector(
  selectHome,
  (homeState) => homeState.get('hitokoto')
);
