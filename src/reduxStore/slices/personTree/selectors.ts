import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const detailedPersonTree = createSelector(
  (state: RootState) => state.person_tree.person_tree,
  (person_tree) => {
    return person_tree;
  }
);